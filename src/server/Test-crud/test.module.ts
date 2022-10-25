import { Module } from "@nestjs/common";
import { TestService } from "./test.service";
import { TestController } from "./test.controller";
import { PrismaModule } from "src/server/prisma/prisma.module";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
