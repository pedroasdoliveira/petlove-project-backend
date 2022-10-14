import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateResultDto } from './create-result.dto';

export class UpdateResultDto extends PartialType(CreateResultDto) {
  @IsString()
  @ApiProperty({
    description: 'Para escolher a categoria do usuário',
    example: 'Junior',
  })
  nextRole: string;

  @IsString()
  @ApiProperty({
    description: 'Para escolher se o usuário é passou ou não',
    example: 'Sim',
  })
  isValided: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsOptional()
  @ApiProperty({
    description: 'Person test result',
    example: 3,
  })
  influence: number;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsOptional()
  @ApiProperty({
    description: 'Person test result',
    example: 3,
  })
  technology: number;
}
