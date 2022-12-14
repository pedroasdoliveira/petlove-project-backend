import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { SpecialtiesModule } from "./specialties/specialties.module";
import { TestModule } from "./Test-crud/test.module";
import { ResultModule } from "./result/result.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    TestModule,
    SpecialtiesModule,
    ResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
