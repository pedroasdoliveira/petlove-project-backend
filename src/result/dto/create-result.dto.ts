import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class CreateResultDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty({
    description: "System test result",
    example: 5,
  })
  system: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty({
    description: "Person test result",
    example: 5,
  })
  person: number;

  @IsNumber()
  @Min(0)
  @Max(3)
  @ApiProperty({
    description: "result for the test category",
    example: 3,
  })
  test: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty({
    description: "Process test result",
    example: 5,
  })
  process: number;

  @IsNumber()
  @Min(0)
  @Max(3)
  @ApiProperty({
    description: "result for the design category",
    example: 3,
  })
  design: number;

  @IsNumber()
  @Min(0)
  @Max(3)
  @ApiProperty({
    description: "result for the tooling category",
    example: 3,
  })
  toolshop: number;

  @IsNumber()
  @Min(0)
  @Max(3)
  @ApiProperty({
    description: "Result for the category Computational Fundamentals",
    example: 3,
  })
  computationalFundamentals: number;
}
