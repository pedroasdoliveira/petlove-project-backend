import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MinLength, IsString, Matches, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @MinLength(6)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'senha muito fraca',
  })
  @IsNotEmpty()
  @ApiProperty({
    description:
      'Senha do usuário. Requer letras maiúsculas e minúsculas, números ou caracteres especiais',
    example: 'Petlove@123',
  })
  newPassword: string;
}
