import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateSpecialtyDto {

  @IsString()
  @ApiProperty({
    description: 'Professional level',
    example: 'Junior',
  })
  performance: string;

  @IsNumber()
  @ApiProperty({
    description: 'Systems score',
  })
  system: number;

  @IsNumber()
  @ApiProperty({
    description: 'Persons score',
  })
  person: number;

  @IsNumber()

  @ApiProperty({
    description: 'Tecnology score',
  })
  technology: number;

  @IsNumber()
  @ApiProperty({
    description: 'Process score',
  })
  process: number;

  @IsNumber()
  @ApiProperty({
    description: 'Influence score',
  })
  influence: number;

  createdAt: Date;
  updatedAt: Date;
}
