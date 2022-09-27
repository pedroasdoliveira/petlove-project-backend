import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { SpecialtiesModule } from './specialties/specialties.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, SpecialtiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
