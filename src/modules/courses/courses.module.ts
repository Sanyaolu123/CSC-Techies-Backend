import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { SharedModule } from '@/shared/shared.module';
import { PrismaService } from '@/shared';
import { SettingsService } from '../settings/settings.service';

@Module({
  imports: [SharedModule],
  providers: [CoursesService, PrismaService, SettingsService],
  controllers: [CoursesController],
})
export class CoursesModule {}
