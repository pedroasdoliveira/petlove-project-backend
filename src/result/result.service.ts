import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { isAdmin } from 'src/utils/isAdmin.utils';
import { domainToASCII } from 'url';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  create(user:User,dto: CreateResultDto) {


    const data: Prisma.ResultCreateInput = {

    }
  }

  async findAll(user:User) {
    isAdmin(user);
    const allResults = await this.prisma.result.findMany();

    if (allResults.length === 0) {
      throw new NotFoundException('Não existem resultados cadastrados.');
    }

    return allResults;
  }

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
