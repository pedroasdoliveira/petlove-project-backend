import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/user/entities/user.entity";
import { handleError } from "src/utils/handleError.utils";
import { isAdmin } from "src/utils/isAdmin.utils";
import { CreateResultDto } from "./dto/create-result.dto";
import { UpdateResultDto } from "./dto/update-result.dto";
import * as nodemailer from "nodemailer";
import { DateTime } from "luxon";
import {
  emailTestResult,
  emailTestValidation,
  emailTestValidationAdm,
} from "src/utils/emailsTemplates.utils";
import { Specialty } from "src/specialties/entities/specialty.entity";
import { Result } from "./entities/result.entity";

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, dto: CreateResultDto): Promise<Result> {
    const userTest = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        team: true,
        role: true,
        chapter: true,
        results: true,
        createdAt: true,
        isAdmin: true,
      },
    });
    const lastTestUser = userTest.results.at(-1);

    // verificar se a data do ultimo teste é menor do que 3 meses da data atual e se o ultimo teste foi validado

    if (lastTestUser) {
      const now = DateTime.now();
      const lastTestUserVerify = DateTime.fromJSDate(lastTestUser.createdAt);

      if (lastTestUserVerify.diff(now, "months").months < 3) {
        throw new UnauthorizedException("Insufficient completion time!");
      }

      if (lastTestUser.isValided === null) {
        throw new UnauthorizedException("Last test not validated!");
      }
    }

    const dtoToInt: CreateResultDto = {
      person: Math.round(dto.person * 100),
      process: Math.round(dto.process * 100),
      system: Math.round(dto.system * 100),
      computationalFundamentals: Math.round(
        dto.computationalFundamentals * 100,
      ),
      design: Math.round(dto.design * 100),
      test: Math.round(dto.test * 100),
      toolshop: Math.round(dto.toolshop * 100),
    };

    const technologyDto = Math.round(
      (dtoToInt.toolshop +
        dtoToInt.design +
        dtoToInt.test +
        dtoToInt.computationalFundamentals) *
        (5 / 12),
    );
    const influenceDto = Math.round(
      (dtoToInt.system + dtoToInt.process + 2 * dtoToInt.person) / 4,
    );

    let nextRoleValue: string;

    const specialtys = await this.prisma.specialtie.findMany();

    if (specialtys.length === 0) {
      throw new NotFoundException("Não existem especialidades cadastradas.");
    }

    const result = specialtys.map((specialy: Specialty) => {
      const { performance, system, person, technology, process, influence } =
        specialy;
      const systemDiff = system - dtoToInt.system;
      const personDiff = person - dtoToInt.person;
      const technologyDiff = technology - technologyDto;
      const processDiff = process - dtoToInt.process;
      const influenceDiff = influence - influenceDto;

      const totalDiff =
        Math.abs(systemDiff) +
        Math.abs(personDiff) +
        Math.abs(technologyDiff) +
        Math.abs(processDiff) +
        Math.abs(influenceDiff);
      return { performance, totalDiff };
    });

    const near = result.reduce((prev, current) =>
      prev.totalDiff < current.totalDiff ? prev : current,
    );

    nextRoleValue = near.performance;

    const data: Prisma.ResultCreateInput = {
      user: {
        connect: {
          id: user.id,
        },
      },
      nextRole: nextRoleValue,
      person: dtoToInt.person,
      process: dtoToInt.process,
      system: dtoToInt.system,
      technology: technologyDto,
      influence: influenceDto,
    };

    return this.prisma.result
      .create({
        data,
        select: {
          id: true,
          userId: true,
          nextRole: true,
          person: true,
          process: true,
          system: true,
          technology: true,
          influence: true,
        },
      })
      .then(async (result: Result) => {
        // enviar email para todos os administradores

        const adms = await this.prisma.user.findMany({
          where: {
            isAdmin: true,
          },
          select: {
            email: true,
            emailNotification: true,
            team: true,
          },
        });

        const emails = adms.map((adm) => {
          if (adm.emailNotification === "all") {
            return adm.email;
          }

          if (adm.emailNotification === "team" && adm.team === user.team) {
            return adm.email;
          }

          return null;
        });

        // verificar se todos do map retornaram null

        const allNull = emails.every((email) => email === null);

        if (allNull) {
          return result;
        }

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          service: "gmail",
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
          },
        });

        const mailData = {
          from: `Pet Love <${process.env.USER_EMAIL}>`,
          to: emails,
          subject: "Novo teste realizado",
          html: emailTestValidation(user.name.split(" ")[0]),
        };

        transporter.sendMail(mailData, function (err, info) {
          if (err) {
            console.log(err);

            throw new BadRequestException("Error sending email");
          } else {
            console.log(info);
          }
        });

        if (allNull) {
          return result;
        }

        const mailDataAdm = {
          from: `Pet Love <${process.env.USER_EMAIL}>`,
          to: emails,
          subject: "Novos testes para avaliação",
          html: emailTestValidationAdm(user.name.split(" ")[0]),
        };

        transporter.sendMail(mailDataAdm, function (err, info) {
          if (err) {
            console.log(err);

            throw new BadRequestException("Error sending email");
          } else {
            console.log(info);
          }
        });

        result.system = result.system / 100;
        result.person = result.person / 100;
        result.technology = result.technology / 100;
        result.process = result.process / 100;
        result.influence = result.influence / 100;

        return result;
      })
      .catch(handleError);
  }

  async findAll(user: User): Promise<Result[]> {
    isAdmin(user);
    const allResults = await this.prisma.result
      .findMany({
        select: {
          id: true,
          nextRole: true,
          person: true,
          process: true,
          system: true,
          technology: true,
          influence: true,
          createdAt: true,
        },
      })
      .then((results: Result[]) => {
        results.forEach((result) => {
          result.system = result.system / 100;
          result.person = result.person / 100;
          result.technology = result.technology / 100;
          result.process = result.process / 100;
          result.influence = result.influence / 100;
        });

        return results;
      });

    if (allResults.length === 0) {
      throw new NotFoundException("Não existem resultados cadastrados.");
    }

    return allResults;
  }

  async findOne(id: string, user: User): Promise<Result> {
    isAdmin(user);
    const result = await this.prisma.result
      .findUnique({
        where: { id: id },
        select: {
          id: true,
          nextRole: true,
          person: true,
          process: true,
          system: true,
          technology: true,
          influence: true,
          isValided: true,
        },
      })
      .then((result: Result) => {
        result.system = result.system / 100;
        result.person = result.person / 100;
        result.technology = result.technology / 100;
        result.process = result.process / 100;
        result.influence = result.influence / 100;

        return result;
      })
      .catch(handleError);

    if (!result) {
      throw new NotFoundException("Resultado não encontrado.");
    }

    return result;
  }

  async update(id: string, dto: UpdateResultDto, user: User): Promise<Result> {
    isAdmin(user);
    const isValidedResult = await this.prisma.result.findUnique({
      where: { id: id },
      select: {
        id: true,
        isValided: true,
      },
    });

    if (
      dto.isValided &&
      dto.nextRole &&
      (!dto.influence ||
        !dto.technology ||
        !dto.system ||
        !dto.process ||
        !dto.person)
    ) {
      return this.prisma.result
        .update({
          where: { id: id },
          data: {
            isValided: dto.isValided,
            nextRole: dto.nextRole,
          },
          select: {
            id: true,
            userId: true,
            nextRole: true,
            person: true,
            process: true,
            system: true,
            technology: true,
            influence: true,
            isValided: true,
          },
        })
        .then(async (result: Result) => {
          // fazer update de role do user se for aprovado

          if (result.isValided === "Sim") {
            await this.prisma.user.update({
              where: { id: result.userId },
              data: {
                role: result.nextRole,
              },
            });
          }

          // enviar email para o usuário
          if (isValidedResult.isValided === null) {
            const user = await this.prisma.user.findUnique({
              where: { id: result.userId },
              select: {
                email: true,
                name: true,
              },
            });

            const transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              service: "gmail",
              auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD,
              },
            });

            const emote = result.isValided === "Sim" ? "😀" : "😢";
            const message =
              result.isValided === "Sim"
                ? "Parabéns, você foi promovido, continue assim!"
                : "Infelizmente você não foi promovido, continue se esforçando que você vai conseguir.";

            const mailData = {
              from: `Pet Love <${process.env.USER_EMAIL}>`,
              to: user.email,
              subject: "Resultado do teste",
              html: emailTestResult(
                user.name.split(" ")[0],
                result.nextRole,
                emote,
                message,
                result.isValided,
              ),
            };

            transporter.sendMail(mailData, function (err, info) {
              if (err) {
                console.log(err);

                throw new BadRequestException("Error sending email");
              } else {
                console.log(info);
              }
            });
          }

          return result;
        })
        .catch(handleError);
    }

    const data: Prisma.ResultUpdateInput = {
      isValided: dto.isValided,
      nextRole: dto.nextRole,
      person: dto.person ? Math.round(dto.person * 100) : undefined,
      process: dto.process ? Math.round(dto.process * 100) : undefined,
      system: dto.system ? Math.round(dto.system * 100) : undefined,
      technology: dto.technology ? Math.round(dto.technology * 100) : undefined,
      influence: dto.influence ? Math.round(dto.influence * 100) : undefined,
    };

    return this.prisma.result
      .update({
        data,
        where: { id: id },
        select: {
          id: true,
          userId: true,
          nextRole: true,
          person: true,
          process: true,
          system: true,
          technology: true,
          influence: true,
          isValided: true,
        },
      })
      .then(async (result: Result) => {
        // enviar email para o usuário
        if (isValidedResult.isValided === null) {
          const user = await this.prisma.user.findUnique({
            where: { id: result.userId },
            select: {
              email: true,
              name: true,
            },
          });

          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            service: "gmail",
            auth: {
              user: process.env.USER_EMAIL,
              pass: process.env.USER_PASSWORD,
            },
          });

          const emote = result.isValided === "Sim" ? "😀" : "😢";
          const message =
            result.isValided === "Sim"
              ? "Parabéns, você foi promovido, continue assim!"
              : "Infelizmente você não foi promovido, continue se esforçando que você vai conseguir.";

          const mailData = {
            from: `Pet Love <${process.env.USER_EMAIL}>`,
            to: user.email,
            subject: "Resultado do teste (modificado pelo administrador)",
            html: emailTestResult(
              user.name.split(" ")[0],
              result.nextRole,
              emote,
              message,
              result.isValided,
            ),
          };

          transporter.sendMail(mailData, function (err, info) {
            if (err) {
              console.log(err);

              throw new BadRequestException("Error sending email");
            } else {
              console.log(info);
            }
          });
        }
        result.system = result.system / 100;
        result.person = result.person / 100;
        result.technology = result.technology / 100;
        result.process = result.process / 100;
        result.influence = result.influence / 100;

        return result;
      })
      .catch(handleError);
  }

  async remove(id: string, user: User): Promise<{message: string}> {
    isAdmin(user);
    await this.prisma.result.delete({ where: { id } }).catch(handleError);
    return { message: "Result successfully deleted" };
  }
}
