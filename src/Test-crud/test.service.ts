import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
