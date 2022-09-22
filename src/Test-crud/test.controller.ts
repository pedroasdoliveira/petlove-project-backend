import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { domainToASCII } from 'url';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Test')
@Controller('Test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Acrescenta perguntas a lista de testes' })
  create(@Body() dto: CreateTestDto,@LoggedUser() user:User) {
    return this.testService.create(dto,user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/allTests')
  @ApiOperation({summary: `Para listar todos os testes`})
  findAll(@LoggedUser() user:User) {
    return this.testService.findAll(user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string,@LoggedUser() user:User) {
    return this.testService.findOne(id,user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTestDto,@LoggedUser() user:User) {
    return this.testService.update(id,dto,user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id:string,@LoggedUser() user:User) {
    return this.testService.remove(id,user);
  }
}
