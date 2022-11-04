import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { specialties } from "src/prisma/seed/03-specialties";
import { User } from "src/user/entities/user.entity";
import { handleError } from "src/utils/handleError.utils";
import { isAdmin } from "src/utils/isAdmin.utils";
import { CreateSpecialtyDto } from "./dto/create-specialty.dto";
import { UpdateSpecialtyDto } from "./dto/update-specialty.dto";
import { Specialty } from "./entities/specialty.entity";

@Injectable()
export class SpecialtiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSpecialtyDto, user: User): Promise<Specialty> {
    isAdmin(user);
    const data: Prisma.SpecialtieCreateInput = {
      performance: dto.performance,
      description: dto.description,
      system: Math.round(dto.system * 100),
      person: Math.round(dto.person * 100),
      technology: Math.round(dto.technology * 100),
      process: Math.round(dto.process * 100),
      influence: Math.round(dto.influence * 100),
    };
    return await this.prisma.specialtie
      .create({ data })
      .then((specialty: Specialty) => {
        specialty.system = specialty.system / 100;
        specialty.person = specialty.person / 100;
        specialty.technology = specialty.technology / 100;
        specialty.process = specialty.process / 100;
        specialty.influence = specialty.influence / 100;
        return specialty;
      })
      .catch(handleError);
  }

  async findAll(user: User): Promise<Specialty[]> {
    if (!user) {
      throw new UnprocessableEntityException("Usuário não está logado");
    }

    return await this.prisma.specialtie
      .findMany()
      .then((specialties: Specialty[]) => {
        specialties.forEach((specialty) => {
          specialty.system = specialty.system / 100;
          specialty.person = specialty.person / 100;
          specialty.technology = specialty.technology / 100;
          specialty.process = specialty.process / 100;
          specialty.influence = specialty.influence / 100;
        });
        return specialties;
      })
      .catch(handleError);
  }

  async findOne(id: string, user: User): Promise<Specialty> {
    if (!user) {
      throw new UnprocessableEntityException("Usuário não está logado");
    }

    return await this.prisma.specialtie
      .findUnique({ where: { id } })
      .then((specialty: Specialty) => {
        specialty.system = specialty.system / 100;
        specialty.person = specialty.person / 100;
        specialty.technology = specialty.technology / 100;
        specialty.process = specialty.process / 100;
        specialty.influence = specialty.influence / 100;
        return specialty;
      })
      .catch(handleError);
  }

  async update(
    id: string,
    dto: UpdateSpecialtyDto,
    user: User,
  ): Promise<Specialty> {
    isAdmin(user);

    const data: Partial<Specialty> = {
      performance: dto.performance,
      description: dto.description,
      system: dto.system ? Math.round(dto.system * 100) : undefined,
      person: dto.person ? Math.round(dto.person * 100) : undefined,
      technology: dto.technology ? Math.round(dto.technology * 100) : undefined,
      process: dto.process ? Math.round(dto.process * 100) : undefined,
      influence: dto.influence ? Math.round(dto.influence * 100) : undefined,
    };

    return await this.prisma.specialtie
      .update({
        where: { id },
        data,
      })
      .then((specialty: Specialty) => {
        specialty.system = specialty.system / 100;
        specialty.person = specialty.person / 100;
        specialty.technology = specialty.technology / 100;
        specialty.process = specialty.process / 100;
        specialty.influence = specialty.influence / 100;
        return specialty;
      })
      .catch(handleError);
  }

  async remove(id: string, user: User): Promise<{ message: string }> {
    isAdmin(user);
    await this.prisma.specialtie.delete({ where: { id } }).catch(handleError);
    return { message: "Specialty deleted successfully" };
  }
}
