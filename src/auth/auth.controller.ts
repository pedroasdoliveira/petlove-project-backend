import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login.response.dto";
import { LoggedUser } from "./logged-user.decorator";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @param req
   * @returns Token
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Login receiving a token for authentication",
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  /**
   * @param req
   * @returns message: Usuário autenticado com sucesso!
   */
  @Get()
  @ApiOperation({
    summary: "Returns the currently authenticated user",
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  profile(@LoggedUser() user: User) {
    return { message: `${user.name} successfully logged in!` };
  }
}
