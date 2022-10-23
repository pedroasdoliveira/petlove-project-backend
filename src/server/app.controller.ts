import { Controller, Get, Render, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("Status")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Recebe uma requisição GET e retorna um objeto de status
   * da aplicação com a URL de documentação
   * @param req Objeto de Request do Express
   * @returns Objeto de status da aplicação
   */
  @Get("/")
  @Render("index")
  Home() {
    return {};
  }

  @Get("/Homepage")
  @Render("/Homepage")
  @UseInterceptors()
  Homepage() {
    return {};
  }

  @Get("/Profile")
  @Render("/Profile")
  @UseInterceptors()
  Profile() {
    return {};
  }

  @Get("/Administration")
  @Render("/Administration")
  @UseInterceptors()
  Administration() {
    return {};
  }

  @Get("/change/:token/:id")
  @Render("/change/[token]/[id]")
  @UseInterceptors()
  Change() {
    return {};
  }

  @Get("/Edit")
  @Render("/Edit")
  @UseInterceptors()
  Edit() {
    return {};
  }

  @Get("/ForgotPassword")
  @Render("/ForgotPassword")
  @UseInterceptors()
  ForgotPassword() {
    return {};
  }

  @Get("/History")
  @Render("/History")
  @UseInterceptors()
  History() {
    return {};
  }

  @Get("/Interview")
  @Render("/Interview")
  @UseInterceptors()
  Interview() {
    return {};
  }

  @Get("/Specialties")
  @Render("/Specialties")
  @UseInterceptors()
  Specialties() {
    return {};
  }
}
