import {
  BadRequestException,
  HttpException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { handleError } from 'src/utils/handleError.utils';
import { Prisma } from '@prisma/client';
import { isAdmin } from 'src/utils/isAdmin.utils';
import { User } from './entities/user.entity';
import * as nodemailer from 'nodemailer';
import { JwtPayload } from './entities/jwtChangePassword.entity';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto-js';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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
      .then((user) => {
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
          from: 'Pet Love <projetopetlover@gmail.com>',
          to: user.email,
          subject: 'Verify Email',
          html: '<div><h1>oi1</h1> <p>oi2</p></div>',
        };

        transporter.sendMail(mailData, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });

        return user;
      })
      .catch(handleError);
  }

  async verifyUserEmail(id: string) {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
    });

    if (user.isVerified) {
      throw new NotAcceptableException('Email already verified');
    }

    const data: Prisma.UserUpdateInput = {
      isVerified: true,
    };

    return this.prisma.user
      .update({
        where: { id },
        data,
      })
      .then(() => {
        return 'Email verified! You can close this page and login';
      })
      .catch(handleError);
  }

  async sendEmailForgotPassword(email: string): Promise<string> {
    const user = await this.prisma.user
      .findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
        },
      })
      .catch(handleError);

    if (!user) {
      throw new NotFoundException(`Email '${email}' not found`);
    }

    const payload: JwtPayload = {
      id: user.id,
    };

    const token = this.jwtService.sign(payload);

    const tokenCrypt = crypto.AES.encrypt(
      token,
      process.env.JWT_CHANGE_PASSWORD_SECRET,
    ).toString();

    const tokenToUrl = await tokenCrypt
      .replace(/\+/g, 'p1L2u3S')
      .replace(/\//g, 's1L2a3S4h')
      .replace(/=/g, 'e1Q2u3A4l');

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
      from: 'Pet Love <projetopetlover@gmail.com>',
      to: user.email,
      subject: 'Reset your password',
      html: `<div><h1>oi1</h1> <p>token:${tokenToUrl}, id:${user.id}, url: http://localhost:3000/Change/${tokenToUrl}/${user.id}</p></div>`,
    };

    transporter.sendMail(mailData, async function (err, info) {
      if (err) {
        console.log(err);

        throw new BadRequestException('Error sending email');
      } else {
        console.log(info);
      }
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { resetToken: token },
    });

    return 'Email sent';
  }

  async changePassword(
    id: string,
    resetToken: string,
    dto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User '${id}' not found`);
    }

    if (!user.resetToken) {
      throw new BadRequestException('Token not found');
    }
    console.log(resetToken);

    const resetTokenToText = resetToken
      .replace(/p1L2u3S/g, '+')
      .replace(/s1L2a3S4h/g, '/')
      .replace(/e1Q2u3A4l/g, '=');

    const resetTokenDecrypted = crypto.AES.decrypt(
      resetTokenToText,
      process.env.JWT_CHANGE_PASSWORD_SECRET,
    ).toString(crypto.enc.Utf8);

    if (resetTokenDecrypted != user.resetToken) {
      throw new UnauthorizedException('Invalid token');
    }
    let jwtVerify: JwtPayload;
    try {
      jwtVerify = this.jwtService.verify(user.resetToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    if (!jwtVerify.id || jwtVerify.id != id) {
      throw new UnauthorizedException('Invalid token');
    }

    if (!dto.password || !dto.confirmPassword) {
      throw new BadRequestException('Informe a nova senha.');
    }

    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 8);

    const data: Prisma.UserUpdateInput = {
      password: hashedPassword,
      resetToken: null,
    };

    return this.prisma.user
      .update({
        where: { id },
        data,
      })
      .then((user) => {
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
          from: 'Pet Love <projetopetlover@gmail.com>',
          to: user.email,
          subject: 'Password Changed',
          html: '<div><h1>oi1</h1> <p>oi2</p></div>',
        };

        transporter.sendMail(mailData, function (err, info) {
          if (err) {
            console.log(err);

            throw new BadRequestException('Error sending email');
          } else {
            console.log(info);
          }
        });
        return { message: 'Password changed' };
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
    const allUsers = await this.prisma.user.findMany({
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
