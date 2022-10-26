import { Module } from "@nestjs/common";
import { ResultService } from "./result.service";
import { ResultController } from "./result.controller";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "../../server/prisma/prisma.module";

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
