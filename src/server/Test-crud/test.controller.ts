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
import { TestService } from "./test.service";
import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoggedUser } from "src/server/auth/logged-user.decorator";
import { User } from "src/server/user/entities/user.entity";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Test")
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller("Test")
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post("/create")
  @ApiOperation({ summary: "Create a complete test" })
  create(@Body() dto: CreateTestDto, @LoggedUser() user: User) {
    return this.testService.create(dto, user);
  }

  @Get("/allTests")
  @ApiOperation({ summary: `To list all tests` })
  findAll(@LoggedUser() user: User) {
    return this.testService.findAll(user);
  }

  @Patch(":id")
  @ApiOperation({ summary: `To make changes to a test` })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateTestDto,
    @LoggedUser() user: User,
  ) {
    return this.testService.update(id, dto, user);
  }

  @Delete(":id")
  @ApiOperation({ summary: `To delete a test` })
  remove(@Param("id") id: string, @LoggedUser() user: User) {
    return this.testService.remove(id, user);
  }
}
