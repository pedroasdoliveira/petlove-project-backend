import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handleError.utils';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user:User,dto: CreateResultDto) {

    const tecnology = (dto.toolshop + dto.design + dto.test + dto.computationalFundamentals)* (5/12);
    const influence = (dto.system + dto.process + (2*dto.person))/4;

    const data: Prisma.ResultCreateInput = {
      person:dto.person,
      process:dto.process,
      system:dto.system,
      technology:Math.round(tecnology),
      influence:Math.round(influence)
    }

    return this.prisma.result.create({
      data,
      select:{
        id:true,
        nextRole:true,
        person:true,
        process:true,
        system:true,
        technology:true,
        influence:true
      }
    })
  }

  async findAll(user:User) {
    isAdmin(user);
    const allResults = await this.prisma.result.findMany({
      select:{
        id:true,
        nextRole:true,
        person:true,
        process:true,
        system:true,
        technology:true,
        influence:true
      }
    });

    if (allResults.length === 0) {
      throw new NotFoundException('Não existem resultados cadastrados.');
    }

    return allResults;
  }

  findOne(id: string) {
    return `This action returns a #${id} result`;
  }

  update(id: string, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  async delete(id: string) {
    await this.prisma.result.delete({ where: {id} }).catch(handleError)
    return { message: 'Results deleted successfully'};
  }
}
