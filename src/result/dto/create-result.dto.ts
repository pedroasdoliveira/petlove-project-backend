import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateResultDto {

  @IsString()
  @ApiProperty({
    description: 'Professional level',
    example: 'Junior'
  })
  nextRole: string;

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
    description: 'Technology test result',
    example: 4
  })
  technology: number;

  @IsNumber()
  @ApiProperty({
    description: 'Process test result',
    example: 5
  })
  process: number;

  @IsNumber()
  @ApiProperty({
    description: 'Influence calculation',
  })
  influence: number;

  @IsString()
  @ApiProperty({
    description: 'Test validation',
  })
  isValided: string;

  @ApiProperty({
    description: 'User`s ID',
    example: ''
  })
  userId: string;
}
