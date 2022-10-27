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
import { User } from "src/user/entities/user.entity";
import { LoggedUser } from "src/auth/logged-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags("Specialties")
@Controller("Specialty")
export class SpecialtiesController {
  constructor(private readonly specialty: SpecialtiesService) {}

  /**
   * @param req
   * @returns Specialtie
   */
  @Post()
  @ApiOperation({ summary: "create a specialty" })
  create(@Body() dto: CreateSpecialtyDto, @LoggedUser() user: User) {
    return this.specialty.create(dto, user);
  }

  /**
   * @param req
   * @returns Specialties
   */
  @Get()
  @ApiOperation({ summary: "List all specialties" })
  findAll(@LoggedUser() user: User) {
    return this.specialty.findAll(user);
  }

  /**
   * @param req
   * @returns Specialtie
   */
  @Get(":id")
  @ApiOperation({ summary: "Find a specific specialty through the id" })
  findOne(@Param("id") id: string, @LoggedUser() user: User) {
    return this.specialty.findOne(id, user);
  }

  /**
   * @param req
   * @returns Specialtie
   */
  @Patch(":id")
  @ApiOperation({ summary: "Change or update information about a specialty" })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateSpecialtyDto,
    @LoggedUser() user: User,
  ) {
    return this.specialty.update(id, dto, user);
  }

  /**
   * @param req
   * @returns  message: 'specialty deleted successfully'
   */
  @Delete(":id")
  @ApiOperation({ summary: "delete a specialty" })
  remove(@Param("id") id: string, @LoggedUser() user: User) {
    return this.specialty.remove(id, user);
  }
}
