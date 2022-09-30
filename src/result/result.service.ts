import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handleError.utils';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  create(createResultDto: CreateResultDto) {
    return 'This action adds a new result';
  }

  async findAll(user:User) {
    isAdmin(user);
    const allResults = await this.prisma.result.findMany();

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
