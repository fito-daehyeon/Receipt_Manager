import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module'; // PrismaModule import

@Module({
  imports: [PrismaModule], // PrismaModule을 imports 배열에 추가
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
