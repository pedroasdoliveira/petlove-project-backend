/* eslint-disable prettier/prettier */
import { UnauthorizedException } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";

export function isAdmin(user: User): void {
  if (!user.isAdmin) {
    throw new UnauthorizedException("Você não tem permissão de admin");
  }
}
