import { PrismaService } from '@/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Events } from '@prisma/client';
import { EventsDto, updateEventDto } from './dto/events.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async getEvents(): Promise<Events[]> {
    const events = await this.prisma.events.findMany({});
    return events;
  }

  async addToEvents(data: EventsDto): Promise<Events> {
    const event = await this.prisma.events.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });

    return event;
  }

  async updateEvent(id: string, data: updateEventDto): Promise<Events> {
    const existingEvent = await this.checkExistingEvent(id);
    const events = await this.prisma.events.update({
      where: {
        id,
      },
      data: {
        ...data,
        startDate: data.startDate
          ? new Date(data.startDate)
          : new Date(existingEvent.startDate),
        endDate: data.endDate
          ? new Date(data.endDate)
          : new Date(existingEvent.endDate),
      },
    });
    return events;
  }

  async removeFromEvents(id: string): Promise<Events> {
    const events = await this.prisma.events.delete({
      where: {
        id,
      },
    });

    return events;
  }

  private async checkExistingEvent(id: string): Promise<Events> {
    const events = await this.prisma.events.findFirst({
      where: {
        id,
      },
    });

    if (!events) throw new BadRequestException(`Event not found.`);

    return events;
  }
}
