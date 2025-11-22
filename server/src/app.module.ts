import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module'; // Prisma 모듈이 있다면 import

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역 모듈로 설정
    }),
    AuthModule,
    // PrismaModule, // Prisma 모듈이 있다면 여기에 추가
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
