import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('User')
  @Post('create')
  @ApiOperation({ summary: 'Criar usuário' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiTags('User')
  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários.' }) // Pendente autenticação
  findAll() {
    return this.userService.findAll();
  }

  @ApiTags('User')
  @Get(':id')
  @ApiOperation({ summary: 'Visualizar um usuário pelo id.' }) // Pendente autenticação
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiTags('User')
  @Patch(':id')
  @ApiOperation({ summary: 'Editar informações de usuário!' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) { // Pendente autenticação
    return this.userService.update(id, updateUserDto);
  }

  @ApiTags('User')
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um usuário (Adm)' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id); // Pendente isAdmin e autenticação
  }
}
