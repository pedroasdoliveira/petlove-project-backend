import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService)
  {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user){
      throw new UnauthorizedException('Invalid email and/or password')
    }

    const isHashValid = await bcrypt.compare(password, user.password);
    if (!isHashValid) {
      throw new UnauthorizedException('Invalid email and/or password')
    }

    delete user.password;
    return {
      token: this.jwtService.sign({ email }),
      user,
    }
  }
}
