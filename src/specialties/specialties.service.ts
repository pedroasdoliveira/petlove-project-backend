import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handleError.utils';
import { isAdmin } from 'src/utils/isAdmin.utils';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from './entities/specialty.entity';


@Injectable()
export class SpecialtiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSpecialtyDto, user: User) {
    isAdmin(user);
    const data: Prisma.SpecialtieCreateInput = { ...dto };
    return await this.prisma.specialtie.create({ data }).catch(handleError);
  }

  async findAll(user: User) {
    isAdmin(user);
    return await this.prisma.specialtie.findMany();
  }

  async findOne(id: string, user: User) {
    isAdmin(user);
    return await this.prisma.specialtie.findUnique({ where: {id} });
  }

  async update(id: string, dto: UpdateSpecialtyDto, user: User) {
    isAdmin(user);
    const data: Partial<Specialty> = {...dto};
    return await this.prisma.specialtie
    .update({
      where: {id},
      data
    })
    .catch(handleError);
  }

  async remove(id: string, user: User) {
    isAdmin(user);
    await this.prisma.specialtie.delete({ where: {id} }).catch(handleError);
    return { message: 'specialty deleted successfully'};
  }
}
