import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateResultDto {

  @IsNumber()
  @ApiProperty({
    description: 'Sistem test result',
    example: 2
  })
  system: number;

  @IsNumber()
  @ApiProperty({
    description: 'Person test result',
    example: 3
  })
  person: number;

  @IsNumber()
  @ApiProperty({
    description: 'result for the test category',
    example: 4
  })
  test: number;

  @IsNumber()
  @ApiProperty({
    description: 'Process test result',
    example: 5
  })
  process: number;

  @IsNumber()
  @ApiProperty({
    description: 'result for the design category',
  })
  design: number;

  @IsNumber()
  @ApiProperty({
    description: 'result for the tooling category',
  })
  toolshop:number;

  @IsNumber()
  @ApiProperty({
    description: 'Result for the category Computational Fundamentals',
  })
  computationalFundamentals:number;
}
