import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { SharedModule } from '@/shared/shared.module';
import { SettingsService } from '../settings/settings.service';
import { PrismaService } from '@/shared';

@Module({
  imports: [SharedModule],
  controllers: [MaterialsController],
  providers: [MaterialsService, PrismaService, SettingsService],
})
export class MaterialsModule {}
