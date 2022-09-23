import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTestDto {

  @IsString()
  @ApiProperty({
    description: 'Systemic knowledge of the company. The persons ability to learn about and impact technology systems.',
  })
  system:string

  @IsString()
  @ApiProperty({
    description: 'Persons relationship with others inside and outside their squad.',
  })
  person:string

  @IsString()
  @ApiProperty({
    description: 'The influence of the person in front of his squad, tribe and company.',
  })
  influence:string

  @IsString()
  @ApiProperty({
    description: 'Level of engagement of the person with the processes defined by the technology team.',
  })
  process:string

  @IsString()
  @ApiProperty({
    description: 'The importance of tests and the types of tests are the things sought after at these levels.',
  })
  test:string[]

  @IsString()
  @ApiProperty({
    description: 'It will cover the design principles of each chapter.',
  })
  design:string[]

  @IsString()
  @ApiProperty({
    description: 'It will address topics such as CI/CD and Clean Code.',
  })
  toolshop:string[]

}
