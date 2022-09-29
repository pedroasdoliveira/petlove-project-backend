import { BadRequestException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { handleError } from 'src/utils/handleError.utils';
import { Prisma } from '@prisma/client';
import { isAdmin } from 'src/utils/isAdmin.utils';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: Prisma.UserCreateInput = {
      name: dto.name,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 5),
      isAdmin:false
    };

    return this.prisma.user
    .create({
      data,
      select: {
        password: false,
        id: true,
        name: true,
        email: true,
        isAdmin:true,
        createdAt: true,
        updatedAt: true,
      },
    }).catch(handleError);
  }

  async createADM(dto: CreateUserDto) {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: Prisma.UserCreateInput = {
      name: dto.name,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 5),
      isAdmin:true
    };

    return this.prisma.user
    .create({
      data,
      select: {
        password: false,
        id: true,
        name: true,
        email: true,
        isAdmin:true,
        createdAt: true,
      },
    }).catch(handleError);
  }

  async findAll(user:User) {
    isAdmin(user);
    const allUsers = await this.prisma.user.findMany({
      select: {
       id:true,
       name:true,
       team:true,
       role:true,
       chapter:true,
       results:true
      },
    });

    if (allUsers.length === 0) {
      throw new NotFoundException('Não existem usuários cadastrados.');
    }

    return allUsers;
  }

  async findOne(id: string,user:User) {

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

    if (user.id == id || user.isAdmin == true) {
      return record;
    }else{
      throw new UnauthorizedException('Você não tem permissão para acessar essa área!');
    }
  }


  async update(id: string, updateUserDto: UpdateUserDto,user:User) {
    isAdmin(user);

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

    if (user.id == id || user.isAdmin == true) {

      return this.prisma.user
      .update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          password: false,
          updatedAt: true,
        },
      }).catch(handleError);
    }
    else{
      throw new UnauthorizedException('Você não tem permissão para acessar essa área!');
    }
  }

  }

  async remove(id:string,user:User) {
    isAdmin(user);
    if(!id){

      throw new NotFoundException(`id:${id} não encontrado`);

    }
    else {

      await this.prisma.user.findUnique({where:{id:id}});
      throw new HttpException('Usuário deletado com sucesso!', 200);

      return { message: 'Usuário deletado com sucesso!' };
    }
  }
}
