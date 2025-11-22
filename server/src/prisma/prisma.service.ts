import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Prisma 5는 ConfigModule이 로드한 DATABASE_URL을 자동으로 인식합니다.
    // 따라서 생성자에 아무것도 전달할 필요가 없습니다.
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }
}
