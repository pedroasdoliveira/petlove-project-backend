import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Specialtie')
@Controller('specialty')
export class SpecialtiesController {
  constructor(private readonly specialty: SpecialtiesService) {}

  @Post()
  create(@Body() dto: CreateSpecialtyDto, @LoggedUser() user: User) {
    return this.specialty.create(dto, user);
  }

  @Get()
  findAll(@LoggedUser() user: User) {
    return this.specialty.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @LoggedUser() user: User) {
    return this.specialty.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSpecialtyDto,
    @LoggedUser() user: User,
  ) {
    return this.specialty.update(id, dto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @LoggedUser() user: User) {
    return this.specialty.remove(id, user);
  }
}
