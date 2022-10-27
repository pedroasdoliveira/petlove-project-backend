import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../server/prisma/prisma.service";
import { User } from "../../server/user/entities/user.entity";
import { handleError } from "../../server/utils/handleError.utils";
import { isAdmin } from "../../server/utils/isAdmin.utils";
import { CreateSpecialtyDto } from "./dto/create-specialty.dto";
import { UpdateSpecialtyDto } from "./dto/update-specialty.dto";
import { Specialty } from "./entities/specialty.entity";

@Injectable()
export class SpecialtiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSpecialtyDto, user: User) {
    isAdmin(user);
    const data: Prisma.SpecialtieCreateInput = { ...dto };
    return await this.prisma.specialtie.create({ data }).catch(handleError);
  }

  async findAll(user: User) {
    if (!user) {
      throw new UnprocessableEntityException("Usuário não está logado");
    }

    return await this.prisma.specialtie.findMany().catch(handleError);
  }

  async findOne(id: string, user: User) {
    if (!user) {
      throw new UnprocessableEntityException("Usuário não está logado");
    }

    return await this.prisma.specialtie
      .findUnique({ where: { id } })
      .catch(handleError);
  }

  async update(id: string, dto: UpdateSpecialtyDto, user: User) {
    isAdmin(user);
    const data: Partial<Specialty> = { ...dto };
    return await this.prisma.specialtie
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    isAdmin(user);
    await this.prisma.specialtie.delete({ where: { id } }).catch(handleError);
    return { message: "specialty deleted successfully" };
  }
}
