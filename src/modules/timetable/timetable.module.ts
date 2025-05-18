import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { SharedModule } from '@/shared/shared.module';
import { PrismaService } from '@/shared';
import { SettingsService } from '../settings/settings.service';

@Module({
  imports: [SharedModule],
  providers: [TimetableService, PrismaService, SettingsService],
  controllers: [TimetableController],
})
export class TimetableModule {}
