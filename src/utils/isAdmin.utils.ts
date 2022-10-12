import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export function isAdmin(user: User) {
  if (!user.isAdmin) {
    throw new UnauthorizedException('Você não tem permissão de admin');
  }
}
