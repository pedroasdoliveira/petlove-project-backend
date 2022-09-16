import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      if (updateUserDto.password != updateUserDto.confirmPassword) {
        throw new BadRequestException('As senhas informadas não são iguais.');
      }
    }

    delete updateUserDto.confirmPassword;

    const data = { ...updateUserDto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 5);
    }

    return this.prisma.user
      .update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          password: false,
          createdAt: true,
          updatedAt: true,
        },
      })
      //.catch(handleError);
  }

  async remove(id:string) {
    if(!id){

      throw new NotFoundException(`id:${id} não encontrado`);

    }else{

      await this.prisma.user.findUnique({where:{id:id}});
      throw new HttpException('Usuário deletado com sucesso!', 200);

      return { message: 'Usuário deletado com sucesso!' };
    }
  }
}
