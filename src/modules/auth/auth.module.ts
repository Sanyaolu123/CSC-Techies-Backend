import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from '@/shared/shared.module';
import { PrismaService, TokenService } from '@/shared';

@Module({
  imports: [SharedModule],
  providers: [AuthService, PrismaService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
