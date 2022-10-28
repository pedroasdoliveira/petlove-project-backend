import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
  MinLength,
  IsString,
  Matches,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @MinLength(6)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "senha muito fraca",
  })
  @IsOptional()
  @ApiProperty({
    description:
      "Senha do usuário. Requer letras maiúsculas e minúsculas, números ou caracteres especiais",
    example: "Petlove@123",
  })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description:
      "define qual notificação de email o usuário receberá (somente para usuários com papel de administrador)",
    example: "team",
  })
  emailNotification: "none" | "team" | "all";

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: "URL da foto do usuário",
    example:
      "https://i.imgur.com/DL9HxNB.jpeg",
  })
  profilePicture: string;
}

export class ChangePasswordDto {
  @MinLength(6)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "senha muito fraca",
  })
  @IsNotEmpty()
  @ApiProperty({
    description:
      "Senha do usuário. Requer letras maiúsculas e minúsculas, números ou caracteres especiais",
    example: "Petlove@123",
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Petlove@123",
  })
  confirmPassword: string;
}
