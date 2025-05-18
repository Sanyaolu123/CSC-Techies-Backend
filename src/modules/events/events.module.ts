import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaService } from '@/shared';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [EventsService, PrismaService],
  controllers: [EventsController],
})
export class EventsModule {}
