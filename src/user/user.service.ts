import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete createUserDto.confirmPassword;

    const data: Prisma.UserCreateInput = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 5),
    };

    return this.prisma.user
    .create({
      data,
      select: {
        password: false,
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })//.catch(handleError);
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany({
      select: {
       id:true,
       name:true,
       team:true,
       role:true,
       chapter:true
      },
    });

    if (allUsers.length === 0) {
      throw new NotFoundException('Não há usuários cadastrados.');
    }

    return allUsers;
  }

  async findOne(id: string) {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id:true,
       name:true,
       team:true,
       role:true,
       chapter:true
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com id: '${id}' não encontrado.`);
    }
    return record;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
