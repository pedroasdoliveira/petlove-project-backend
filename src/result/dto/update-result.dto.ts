import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateResultDto } from './create-result.dto';

export class UpdateResultDto extends PartialType(CreateResultDto) {
  @IsString()
  @ApiProperty({
    description: 'Para escolher a categoria do usuário',
    example: 'Junior'
  })
  nextRole: string;
}
