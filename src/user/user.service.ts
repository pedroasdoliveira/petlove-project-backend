/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { handleError } from 'src/utils/handleError.utils';
import { Prisma } from '@prisma/client';
import { isAdmin } from 'src/utils/isAdmin.utils';
import { User } from './entities/user.entity';
import * as nodemailer from 'nodemailer';

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
      isAdmin: false,
    };

    return this.prisma.user
      .create({
        data,
        select: {
          password: false,
          id: true,
          name: true,
          email: true,
          isAdmin: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      .catch(handleError);
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
      isAdmin: true,
    };

    return this.prisma.user
      .create({
        data,
        select: {
          password: false,
          id: true,
          name: true,
          email: true,
          isAdmin: true,
          createdAt: true,
        },
      })
      .catch(handleError);
  }

  async findAll(user: User) {
    isAdmin(user);
    const allUsers = await this.prisma.user
      .findMany({
        select: {
          id: true,
          name: true,
          email: true,
          team: true,
          role: true,
          chapter: true,
          results: true,
          createdAt: true,
        },
      })
      .then((users) => {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          service: 'gmail',
          auth: {
            user: 'projetopetlover@gmail.com',
            pass: 'skbfwjaibimleyou',
          },
        });

        const mailData = {
          from: 'sou eu :/ <projetopetlover@gmail.com>',
          to: 'petloveteste75@gmail.com',
          subject: 'tchau',
          html: '<div><h1>oi1</h1> <p>oi2</p></div>',
        };

        transporter.sendMail(mailData, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });

        return users;
      });

    if (allUsers.length === 0) {
      throw new NotFoundException('Não existem usuários cadastrados.');
    }

    return allUsers;
  }

  async findOne(email: string, user: User) {
    const record = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        team: true,
        role: true,
        chapter: true,
        results: true,
        createdAt: true,
        isAdmin: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro: '${email}' não encontrado.`);
    }

    if (user.email == email || user.isAdmin == true) {
      return record;
    } else {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar essa área!',
      );
    }
  }

  async update(email: string, updateUserDto: UpdateUserDto, user: User) {
    if (user.email === email && updateUserDto.newPassword) {
      if (!updateUserDto.password) {
        throw new BadRequestException('A senha atual não pode ser vazia.');
      }

      if (updateUserDto.newPassword !== updateUserDto.confirmPassword) {
        throw new BadRequestException(
          'As novas senhas informadas não são iguais.',
        );
      }

      const newPassword = await bcrypt.hash(updateUserDto.newPassword, 5);
      delete updateUserDto.confirmPassword;
      delete updateUserDto.newPassword;

      const data = { ...updateUserDto };
      data.password = newPassword;

      return this.prisma.user
        .update({
          where: { email: email },
          data,
          select: {
            id: true,
            name: true,
            email: true,
            password: false,
            updatedAt: true,
          },
        })
        .catch(handleError);
    }

    if (user.isAdmin === true) {
      const data = { ...updateUserDto };

      return this.prisma.user
        .update({
          where: { email },
          data,
          select: {
            id: true,
            name: true,
            email: true,
            password: false,
            updatedAt: true,
          },
        })
        .catch(handleError);
    }

    throw new UnauthorizedException(
      'Você não tem permissão para acessar essa área!',
    );
  }

  async remove(email: string, user: User) {
    isAdmin(user);

    if (!email) {
      throw new NotFoundException(`email:${email} não encontrado`);
    } else {
      await this.prisma.user.findUnique({ where: { email: email } });
      throw new HttpException('Usuário deletado com sucesso!', 200);
    }
  }
}
