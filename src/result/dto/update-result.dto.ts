import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateResultDto {
  @IsString()
  @ApiProperty({
    description: "Para escolher a categoria do usuário",
    example: "Junior",
  })
  nextRole: string;

  @IsString()
  @ApiProperty({
    description: "Para escolher se o usuário passou ou não",
    example: "Sim",
  })
  isValided: "Sim" | "Não";

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsOptional()
  @ApiProperty({
    description: "Influence test result",
    example: 3,
  })
  influence: number;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsOptional()
  @ApiProperty({
    description: "Technology test result",
    example: 1.5,
  })
  technology: number;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsOptional()
  @ApiProperty({
    description: "System test result",
    example: 0.8,
  })
  system: number;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsOptional()
  @ApiProperty({
    description: "Process test result",
    example: 1,
  })
  process: number;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsOptional()
  @ApiProperty({
    description: "Technology test result",
    example: 1.3,
  })
  person: number;
}
