import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login.response.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException("Invalid email and/or password");
    }

    if (!user.isVerified) {
      throw new UnauthorizedException("User not verified");
    }

    if (user.isDeleted === true) {
      throw new UnauthorizedException("User deleted");
    }

    const isHashValid = await bcrypt.compare(password, user.password);
    if (!isHashValid) {
      throw new UnauthorizedException("Invalid email and/or password");
    }

    delete user.password;

    await this.prisma.user.update({
      where: { id: user.id },
      data: { resetToken: null },
    });

    return {
      token: this.jwtService.sign({ email }),
      user: undefined,
    };
  }
}
