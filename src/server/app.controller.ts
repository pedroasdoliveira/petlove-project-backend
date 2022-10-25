import { Controller, Get, Render, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("Front-End")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  @Render("index")
  @ApiOperation({ summary: "Retorna a página de login" })
  Home() {
    return {};
  }

  @Get("/Homepage")
  @Render("/Homepage")
  @UseInterceptors()
  @ApiOperation({ summary: "Retorna a Homepage" })
  Homepage() {
    return {};
  }

  @Get("/Profile")
  @Render("/Profile")
  @UseInterceptors()
  @ApiOperation({ summary: "Retorna a página do Perfil do usuário" })
  Profile() {
    return {};
  }

  @Get("/Administration")
  @Render("/Administration")
  @UseInterceptors()
  @ApiOperation({ summary: "Retorna a página de administração" })
  Administration() {
    return {};
  }

  @Get("/ForgotPassword")
  @Render("/ForgotPassword")
  @UseInterceptors()
  @ApiOperation({
    summary: "Retorna a página de enviar email para recuperar a conta",
  })
  ForgotPassword() {
    return {};
  }

  @Get("/change/:token/:id")
  @Render("/change/[token]/[id]")
  @UseInterceptors()
  @ApiOperation({ summary: "Retorna a página de trocar a senha" })
  Change() {
    return {};
  }

  @Get("/Edit")
  @Render("/Edit")
  @UseInterceptors()
  @ApiOperation({ summary: "Retorna a página de editar dados da conta " })
  Edit() {
    return {};
  }

  @Get("/History")
  @Render("/History")
  @UseInterceptors()
  @ApiOperation({ summary: "Retorna a página de histórico do usuário" })
  History() {
    return {};
  }

  @Get("/Interview")
  @Render("/Interview")
  @UseInterceptors()
  @ApiOperation({ summary: "Retorna a página de Testes" })
  Interview() {
    return {};
  }

  @Get("/Specialties")
  @Render("/Specialties")
  @UseInterceptors()
  @ApiOperation({ summary: "Retorna a página de Especialidades" })
  Specialties() {
    return {};
  }
}
