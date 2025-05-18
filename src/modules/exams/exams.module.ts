import { Module } from '@nestjs/common';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';
import { SharedModule } from '@/shared/shared.module';
import { PrismaService } from '@/shared';
import { SettingsService } from '../settings/settings.service';

@Module({
  imports: [SharedModule],
  controllers: [ExamsController],
  providers: [ExamsService, PrismaService, SettingsService],
})
export class ExamsModule {}
