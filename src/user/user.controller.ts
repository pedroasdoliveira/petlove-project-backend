import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @ApiOperation({ summary: 'create user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'List all users' })
  findAll(@LoggedUser() user:User) {
    return this.userService.findAll(user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'View a user by id.' })
  findOne(@Param('id') id: string,@LoggedUser() user:User) {
    return this.userService.findOne(id,user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Edit User Information!' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@LoggedUser() user:User) {
    return this.userService.update(id, updateUserDto,user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user (Adm)' })
  remove(@Param('id') id: string,@LoggedUser() user:User) {
    return this.userService.remove(id,user);
  }
}
