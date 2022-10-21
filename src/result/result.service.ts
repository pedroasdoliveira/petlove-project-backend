import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/user/entities/user.entity";
import { handleError } from "src/utils/handleError.utils";
import { isAdmin } from "src/utils/isAdmin.utils";
import { CreateResultDto } from "./dto/create-result.dto";
import { UpdateResultDto } from "./dto/update-result.dto";
import * as nodemailer from "nodemailer";
import {
  emailTestResult,
  emailTestValidation,
  emailTestValidationAdm,
} from "src/utils/emailsTemplates.utils";

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: User, dto: CreateResultDto) {
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

          const mailData = {
            from: `Pet Love <${process.env.USER_EMAIL}>`,
            to: user.email,
            subject: "Resultado do teste",
            html: emailTestResult(
              user.name.split(" ")[0],
              result.nextRole,
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
        },
      })
      .then(async (result) => {
        // enviar email para o usuário

        const user = await this.prisma.user.findUnique({
          where: { id: result.userId },
          select: {
            email: true,
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

        const mailData = {
          from: `Pet Love <${process.env.USER_EMAIL}>`,
          to: user.email,
          subject: "Resultado do teste (modificado pelo administrador)",
          html: "<div><h1>oi1</h1> <p>oi2</p></div>",
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

  remove(id: string) {
    return `This action removes a #${id} result`;
  }
}
