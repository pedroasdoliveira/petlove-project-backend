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
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ChangePasswordDto, UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { LoggedUser } from "src/auth/logged-user.decorator";

@ApiTags("User")
@Controller("User")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @param req
   * @returns user
   */
  @Post("/create")
  @ApiOperation({ summary: "create user" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * @param req
   * @returns user
   */
  @Get("verify/:id")
  @ApiOperation({
    summary: "Verify user email",
  })
  verifyUserEmail(@Param("id") id: string): Promise<string> {
    return this.userService.verifyUserEmail(id);
  }

  /**
   * @param req
   * @returns Message: 'Email sent'!
   */
  @Get("send/:email")
  @ApiOperation({
    summary: "Send email to change password",
  })
  sendEmailForgotPassword(@Param("email") email: string): Promise<string> {
    return this.userService.sendEmailForgotPassword(email);
  }

  /**
   * @param req
   * @returns message: 'Password changed'
   */
  @Patch("change/password/:resetToken/:id")
  @ApiOperation({
    summary: "Recover user password",
  })
  changePassword(
    @Param("id") id: string,
    @Param("resetToken") resetToken: string,
    @Body() dto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    return this.userService.changePassword(id, resetToken, dto);
  }

  /**
   * @param req
   * @returns users
   */
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: "List all users" })
  findAll(@LoggedUser() user: User) {
    return this.userService.findAll(user);
  }

  /**
   * @param req
   * @returns users
   */
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(":email")
  @ApiOperation({ summary: "View a user by id." })
  findOne(@Param("email") email: string, @LoggedUser() user: User) {
    return this.userService.findOne(email, user);
  }

  /**
   * @param req
   * @returns users
   */
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(":email")
  @ApiOperation({ summary: "Edit User Information!" })
  update(
    @Param("email") email: string,
    @Body() updateUserDto: UpdateUserDto,
    @LoggedUser() user: User,
  ) {
    return this.userService.update(email, updateUserDto, user);
  }

  /**
   * @param req
   * @returns Message: Usuário deletado com sucesso!
   */
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(":email")
  @ApiOperation({ summary: "Delete a user (Adm)" })
  remove(@Param("email") email: string, @LoggedUser() user: User) {
    return this.userService.remove(email, user);
  }

    /**
   * @param req
   * @returns user
   */
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch("/Soft-delete/:email")
  @ApiOperation({ summary: "Soft delete a user (Adm)" })
  softDelete(@Param("email") email: string, @LoggedUser() user: User) {
    return this.userService.softDelete(email, user);
  }

    /**
   * @param req
   * @returns users
   */
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get("/Soft-delete/all")
  @ApiOperation({ summary: "List all soft deleted users (Adm)" })
  getRemovedUsers(@LoggedUser() user: User) {
    return this.userService.getRemovedUsers(user);
  }

    /**
   * @param req
   * @returns users
   */
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch("/Soft-delete/recovery/:email")
  @ApiOperation({ summary: "Recovery a soft deleted user (Adm)" })
  recoverSoftDelete(@Param("email") email: string, @LoggedUser() user: User) {
    return this.userService.recoverSoftDelete(email, user);
  }
}
