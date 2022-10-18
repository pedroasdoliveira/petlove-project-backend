import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handleError.utils';
import { isAdmin } from 'src/utils/isAdmin.utils';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, dto: CreateResultDto) {

    const userTest = await this.prisma.user.findUnique({
      where: { id: user.email  },
      select: {
        id: true,
        name: true,
        email: true,
        team: true,
        role: true,
        chapter: true,
        results: true,
        createdAt: true,
        isAdmin: true,
      }
     });
    let date = new Date();
    const lastTestUser = userTest.results.at(-1);
    const dateLastTest = new Date(lastTestUser.createdAt);
    date.setMonth(date.getMonth() - 3)

    if ( dateLastTest >= date ) {
      throw new UnauthorizedException('Insufficient completion time!')
    }


    const tecnology = (dto.toolshop + dto.design + dto.test + dto.computationalFundamentals)* (5/12);
    const influence = (dto.system + dto.process + (2*dto.person))/4;

    let nextRoleValue = undefined;

    if(
      dto.system  > 3 &&
      dto.person  > 3 &&
      dto.process > 3 &&
      tecnology   > 3 &&
      influence   > 3
    ){
      nextRoleValue = 'Tech Leaders';
    }
    else if(
      tecnology   > 3.9 &&
      dto.system  > 3   &&
      dto.person  < 3   &&
      dto.process < 3   &&
      influence   < 3

      ){
      nextRoleValue = 'Specialist';
    }
    else if(
      tecnology   > 3.4 &&
      dto.system  > 3.4 &&
      dto.person  > 1   &&
      dto.process > 1   &&
      influence   > 1.9
      ){
        nextRoleValue = 'Senior';
    }
    else if(
      tecnology   > 2.9  &&
      dto.system  > 2    &&
      dto.person  > 1    &&
      dto.process > 1    &&
      influence   > 1.9
      ){
        nextRoleValue = 'Pleno';
    }
    else if(
      tecnology   < 3   &&
      dto.system  > 1.9   &&
      dto.person  > 1   &&
      dto.process > 1   &&
      influence   > 1.9
      ){
        nextRoleValue = 'Junior';
    }
    else{
        nextRoleValue = 'Aprendiz';
    }

    const data: Prisma.ResultCreateInput = {
      nextRole:nextRoleValue,
      person:dto.person,
      process:dto.process,
      system:dto.system,
      technology:Math.round(tecnology),
      influence:Math.round(influence)
    }

    return this.prisma.result.create({
      data,
      select:{
        id:true,
        nextRole:true,
        person:true,
        process:true,
        system:true,
        technology:true,
        influence:true
      }
    }).catch(handleError);
  }

  async findAll(user:User) {
    isAdmin(user);
    const allResults = await this.prisma.result.findMany({
      select:{
        id:true,
        nextRole:true,
        person:true,
        process:true,
        system:true,
        technology:true,
        influence:true
      }
    });

    if (allResults.length === 0) {
      throw new NotFoundException('Não existem resultados cadastrados.');
    }

    return allResults;
  }

  findOne(id: string) {
    return this.prisma.result.findUnique({
      where:{id:id},
      select:{
        id:true,
        nextRole:true,
        person:true,
        process:true,
        system:true,
        technology:true,
        influence:true
      }
    }).catch(handleError);
  }

  async update(id: string, dto: UpdateResultDto) {

    const tecnology = (dto.toolshop + dto.design + dto.test + dto.computationalFundamentals)* (5/12);
    const influence = (dto.system + dto.process + (2*dto.person))/4;

    const data: Prisma.ResultUpdateInput = {
      nextRole:dto.nextRole,
      person:dto.person,
      process:dto.process,
      system:dto.system,
      technology:Math.round(tecnology),
      influence:Math.round(influence)
    }

    return this.prisma.result.update({
      data,
      where:{id:id},
      select:{
        id:true,
        nextRole:true,
        person:true,
        process:true,
        system:true,
        technology:true,
        influence:true
      }
    }).catch(handleError);

  }


  async remove(id:string) {
    await this.prisma.result
    .delete({ where: {id} })
    .catch(handleError)
    return { message: 'Institute successfully deleted' }
  }
}
