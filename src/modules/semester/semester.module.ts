import { Module } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { SemesterController } from './semester.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaService } from 'src/shared/database/prisma.service';
import { SettingsService } from '../settings/settings.service';

@Module({
  imports: [SharedModule],
  providers: [SemesterService, PrismaService, SettingsService],
  controllers: [SemesterController],
})
export class SemesterModule {}
