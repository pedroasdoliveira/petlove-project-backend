import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { SpecialtiesService } from "./specialties.service";
import { CreateSpecialtyDto } from "./dto/create-specialty.dto";
import { UpdateSpecialtyDto } from "./dto/update-specialty.dto";
import { User } from "src/server/user/entities/user.entity";
import { LoggedUser } from "src/server/auth/logged-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags("Specialtie")
@Controller("Specialty")
export class SpecialtiesController {
  constructor(private readonly specialty: SpecialtiesService) {}

  @Post()
  @ApiOperation({ summary: "create a specialty" })
  create(@Body() dto: CreateSpecialtyDto, @LoggedUser() user: User) {
    return this.specialty.create(dto, user);
  }

  @Get()
  @ApiOperation({ summary: "List all specialties" })
  findAll(@LoggedUser() user: User) {
    return this.specialty.findAll(user);
  }

  @Get(":id")
  @ApiOperation({ summary: "Find a specific specialty through the id" })
  findOne(@Param("id") id: string, @LoggedUser() user: User) {
    return this.specialty.findOne(id, user);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Change or update information about a specialty" })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateSpecialtyDto,
    @LoggedUser() user: User,
  ) {
    return this.specialty.update(id, dto, user);
  }

  @Delete(":id")
  @ApiOperation({ summary: "delete a specialty" })
  remove(@Param("id") id: string, @LoggedUser() user: User) {
    return this.specialty.remove(id, user);
  }
}
