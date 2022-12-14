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
import { LoggedUser } from "src/auth/logged-user.decorator";
import { User } from "src/user/entities/user.entity";
import { AuthGuard } from "@nestjs/passport";
import { Result } from "./entities/result.entity";

@ApiTags("Result")
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller("Result")
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  /**
   * @param req
   * @returns  Result
   */
  @Post("create")
  @ApiOperation({ summary: "Create test result" })
  create(
    @LoggedUser() user: User,
    @Body() dto: CreateResultDto,
  ): Promise<Result> {
    return this.resultService.create(user, dto);
  }

  /**
   * @param req
   * @returns  Results
   */
  @Get()
  @ApiOperation({ summary: "List all results" })
  findAll(@LoggedUser() user: User): Promise<Result[]> {
    return this.resultService.findAll(user);
  }

  /**
   * @param req
   * @returns Result
   */
  @Get(":id")
  @ApiOperation({ summary: "To find a test result by id" })
  findOne(@Param("id") id: string, @LoggedUser() user: User): Promise<Result> {
    return this.resultService.findOne(id, user);
  }

  /**
   * @param req
   * @returns  Result
   */
  @Patch(":id")
  @ApiOperation({ summary: "To change data from a test performed" })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateResultDto,
    @LoggedUser() user: User,
  ): Promise<Result> {
    return this.resultService.update(id, dto, user);
  }

  /**
   * @param req
   * @returns message: 'Result deleted successfully'
   */
  @Delete(":id")
  remove(@Param("id") id: string, @LoggedUser() user: User): Promise<{message: string}> {
    return this.resultService.remove(id, user);
  }
}
