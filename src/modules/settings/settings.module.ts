import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { PrismaService } from '@/shared';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [SettingsController],
  providers: [SettingsService, PrismaService],
})
export class SettingsModule {}
