import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handleError.utils';
import { isAdmin } from 'src/utils/isAdmin.utils';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

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
      throw new NotFoundException('Não existem especialidades cadastradas.');
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
      throw new NotFoundException('Não existem resultados cadastrados.');
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
    if (dto.isValided && dto.nextRole && !dto.influence) {
      return this.prisma.result
        .update({
          where: { id: id },
          data: {
            isValided: dto.isValided,
            nextRole: dto.nextRole,
          },
          select: {
            id: true,
            nextRole: true,
            person: true,
            process: true,
            system: true,
            technology: true,
            influence: true,
          },
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
          nextRole: true,
          person: true,
          process: true,
          system: true,
          technology: true,
          influence: true,
        },
      })
      .catch(handleError);
  }


  async remove(id:string) {
    await this.prisma.result
    .delete({ where: {id} })
    .catch(handleError)
    return { message: 'Institute successfully deleted' }
  }
}
