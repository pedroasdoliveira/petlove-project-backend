import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../server/prisma/prisma.service";
import { User } from "../../server/user/entities/user.entity";
import { handleError } from "../../server/utils/handleError.utils";
import { isAdmin } from "../../server/utils/isAdmin.utils";
import { CreateResultDto } from "./dto/create-result.dto";
import { UpdateResultDto } from "./dto/update-result.dto";
import * as nodemailer from "nodemailer";
import { DateTime } from "luxon";
import {
  emailTestResult,
  emailTestValidation,
  emailTestValidationAdm,
} from "../../server/utils/emailsTemplates.utils";

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, dto: CreateResultDto) {
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
      const lastTestUser2 = DateTime.fromJSDate(lastTestUser.createdAt);

      if (lastTestUser2.diff(now, "months").months < 3) {
        throw new UnauthorizedException("Insufficient completion time!");
      }

      if (lastTestUser.isValided === null) {
        throw new UnauthorizedException("Last test not validated!");
      }
    }

    const technology =
      (dto.toolshop + dto.design + dto.test + dto.computationalFundamentals) *
      (5 / 12);
    const influence = (dto.system + dto.process + 2 * dto.person) / 4;

    let nextRoleValue = undefined;

    const specialtys = await this.prisma.specialtie.findMany();

    if (specialtys.length === 0) {
      throw new NotFoundException("Não existem especialidades cadastradas.");
    }

    const result = specialtys.map((specialy) => {
      const { performance, system, person, technology, process, influence } =
        specialy;
      const systemDiff = system - dto.system;
      const personDiff = person - dto.person;
      const technologyDiff = technology - technology;
      const processDiff = process - dto.process;
      const influenceDiff = influence - influence;

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
      person: dto.person,
      process: dto.process,
      system: dto.system,
      technology: Math.round(technology),
      influence: Math.round(influence),
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
      .then(async (result) => {
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

        console.log(emails);

        // verificar se todos do map retornaram null

        const allNull = emails.every((email) => email === null);

        if (allNull) {
          return result;
        }

        console.log(allNull);

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

        return result;
      })
      .catch(handleError);
  }

  async findAll(user: User) {
    isAdmin(user);
    const allResults = await this.prisma.result.findMany({
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
    });

    if (allResults.length === 0) {
      throw new NotFoundException("Não existem resultados cadastrados.");
    }

    return allResults;
  }

  async findOne(id: string) {
    try {
      return await this.prisma.result.findUnique({
        where: { id: id },
        select: {
          id: true,
          nextRole: true,
          person: true,
          process: true,
          system: true,
          technology: true,
          influence: true,
        },
      });
    } catch (error) {
      return handleError(error);
    }
  }

  async update(id: string, dto: UpdateResultDto) {
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
        .then(async (result) => {
          // enviar email para o usuário

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

          return result;
        })
        .catch(handleError);
    }

    const data: Prisma.ResultUpdateInput = {
      isValided: dto.isValided,
      nextRole: dto.nextRole,
      person: dto.person,
      process: dto.process,
      system: dto.system,
      technology: dto.technology,
      influence: dto.influence,
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
      .then(async (result) => {
        // enviar email para o usuário

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

        return result;
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    isAdmin(user);
    await this.prisma.result.delete({ where: { id } }).catch(handleError);
    return { message: "Institute successfully deleted" };
  }
}
