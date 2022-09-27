import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handleError.utils';
import { isAdmin } from 'src/utils/isAdmin.utils';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTestDto, user:User) {

    isAdmin(user);

    const data: Prisma.TestCreateInput = {
      person:dto.person,
      process:dto.process,
      system:dto.system,
      test:dto.test,
      toolshop:dto.toolshop,
      design:dto.toolshop,
      computationalFundamentals:dto.computationalFundamentals
    }

    return this.prisma.test.create({
      data,
      select:{
        person:true,
        process:true,
        system:true,
        test:true,
        toolshop:true,
        design:true,
        computationalFundamentals:true,
        createdAt:true,
      }
    }).catch(handleError);
  }

  async findAll(user:User) {

    isAdmin(user);

    return await this.prisma.test.findMany();
  }

  async update(id:string, dto: UpdateTestDto, user:User) {

    isAdmin(user);

    if(!id){

      throw new NotFoundException(`id:${id} não encontrado`);

    }

    const data: Prisma.TestUpdateInput = {
      person:dto.person,
      process:dto.process,
      system:dto.system,
      test:dto.test,
      toolshop:dto.toolshop,
      design:dto.toolshop,
      computationalFundamentals:dto.computationalFundamentals
    }

    return this.prisma.test.update({
      data,
      where:{id:id},
      select:{
        person:true,
        process:true,
        system:true,
        test:true,
        toolshop:true,
        design:true,
        updatedAt:true,
      }
    }).catch(handleError);
  }

  async remove(id:string,user:User) {
    isAdmin(user);

    if(!id){

      throw new NotFoundException(`id:${id} não encontrado`);

    }
    else {

      await this.prisma.test.delete({where:{id:id}});
      throw new HttpException('Test deletado com sucesso!', 200);

      return { message: 'Test deletado com sucesso!' };
    }
  }
}
