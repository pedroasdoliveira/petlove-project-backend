import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { isAdmin } from 'src/utils/isAdmin.utils';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTestDto,user:User) {

    isAdmin(user);

    const data: Prisma.TestCreateInput = {
      influence:dto.influence,
      person:dto.person,
      process:dto.process,
      system:dto.system,
      technology:dto.technology
    }

    return this.prisma.test.create({
      data,
      select:{
        influence:true,
        person:true,
        process:true,
        system:true,
        technology:true,
        createdAt:true,
      }
    })
  }

  async findAll(user:User) {
    isAdmin(user);
    return await this.prisma.test.findMany();
  }

  async findOne(id:string,user:User) {
    isAdmin(user);

    if(!id){

      throw new NotFoundException(`id:${id} não encontrado`);

    }
    else {

      return await this.prisma.test.findUnique({where:{id:user.id}});
    }

  }

  update(id:string, dto: UpdateTestDto, user:User) {
    isAdmin(user);

    const data: Prisma.TestUpdateInput = {
      influence:dto.influence,
      person:dto.person,
      process:dto.process,
      system:dto.system,
      technology:dto.technology
    }

    return this.prisma.test.update({
      data,
      where:{id:id},
      select:{
        influence:true,
        person:true,
        process:true,
        system:true,
        technology:true,
        updatedAt:true,
      }
    })
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
