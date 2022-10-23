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
import { ResultService } from "./result.service";
import { CreateResultDto } from "./dto/create-result.dto";
import { UpdateResultDto } from "./dto/update-result.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoggedUser } from "src/server/auth/logged-user.decorator";
import { User } from "src/server/user/entities/user.entity";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Result")
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller("Result")
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @ApiOperation({ summary: "Create test result" })
  create(@LoggedUser() user: User, @Body() dto: CreateResultDto) {
    return this.resultService.create(user, dto);
  }

  @Get()
  @ApiOperation({ summary: "List all results" })
  findAll(@LoggedUser() user: User) {
    return this.resultService.findAll(user);
  }

  @Get(":id")
  @ApiOperation({ summary: "To find a test result by id" })
  findOne(@Param("id") id: string) {
    return this.resultService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "To change data from a test performed" })
  update(@Param("id") id: string, @Body() dto: UpdateResultDto) {
    return this.resultService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.resultService.remove(id);
  }
}
