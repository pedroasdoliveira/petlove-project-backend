import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateSpecialtyDto {
  @IsString()
  @ApiProperty({
    description:
      "Professional level (Trainee, Junior, Pleno, Senior, Especialista, Tech-lead)",
    example: "Junior",
  })
  performance: string;

  @IsString()
  @ApiProperty({
    description: "Description of the specialty",
    example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  })
  description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({
    description: "Systems score",
    example: 1.8,
  })
  system: number;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({
    description: "Persons score",
    example: 2.3,
  })
  person: number;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({
    description: "technology score",
    example: 2.6,
  })
  technology: number;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({
    description: "Process score",
    example: 1.6,
  })
  process: number;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({
    description: "Influence score",
    example: 2,
  })
  influence: number;

  createdAt: Date;
  updatedAt: Date;
}
