import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { SpecialtiesModule } from "./specialties/specialties.module";
import { TestModule } from "./Test-crud/test.module";
import { ResultModule } from "./result/result.module";
import { RenderModule } from "nest-next";
import Next from "next";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    TestModule,
    SpecialtiesModule,
    ResultModule,
    RenderModule.forRootAsync(
      Next({
        dev: true,
        conf: {
          images: {
            formats: ["image/webp", "image/avif"],
            domains: ["i.imgur.com"],
          },
          redirects: async () => {
            return [
              {
                source: "/",
                destination: "/Homepage",
                permanent: true,
              },
            ];
          },
          async rewrites() {
            return [
              {
                source: "/:path*",
                destination: "/:path*",
              },
            ];
          },
          reactStrictMode: true,
          swcMinify: true,
          compiler: {
            styledComponents: true,
          },
        },
      }),
      { viewsDir: null },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
