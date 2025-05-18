import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [PrismaModule, TokenModule],
  exports: [PrismaModule, TokenModule],
})
export class SharedModule {}
