import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateResultDto {
  @IsNumber()
  @ApiProperty({
    description: 'System test result',
    example: 2,
  })
  system: number;

  @IsNumber()
  @ApiProperty({
    description: 'Person test result',
    example: 3,
  })
  person: number;

  @IsNumber()
  @ApiProperty({
    description: 'result for the test category',
    example: 4,
  })
  test: number;

  @IsNumber()
  @ApiProperty({
    description: 'Process test result',
    example: 5,
  })
  process: number;

  @IsNumber()
  @ApiProperty({
    description: 'result for the design category',
    example: 2,
  })
  design: number;

  @IsNumber()
  @ApiProperty({
    description: 'result for the tooling category',
    example: 3,
  })
  toolshop: number;

  @IsNumber()
  @ApiProperty({
    description: 'Result for the category Computational Fundamentals',
    example: 4,
  })
  computationalFundamentals: number;
}
