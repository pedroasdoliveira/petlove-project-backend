import { Injectable } from '@nestjs/common';
import { handleError } from 'src/utils/handleError.utils';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultService {
  create(createResultDto: CreateResultDto) {
    return 'This action adds a new result';
  }

  findAll() {
    return `This action returns all result`;
  }

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  async delete(id: number) {
    await this.prisma.result.delete({ where: {id} }).catch(handleError)
    return { message: 'Results deleted successfully'};
  }
}
