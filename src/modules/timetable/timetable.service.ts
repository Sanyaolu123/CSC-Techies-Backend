import { PrismaService } from '@/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';
import { AddToTimeTableDto, updateTimeTableDto } from './dto/timetable.dto';
import { AppSettings, TimeTable } from '@/interfaces';

@Injectable()
export class TimetableService {
  private settingsCache: AppSettings;
  constructor(
    private readonly prisma: PrismaService,
    private readonly settings: SettingsService,
  ) {}

  private async fetchSettings() {
    if (!this.settingsCache) {
      const settings = await this.settings.fetchSettings();
      this.settingsCache = settings;
    }
    return this.settingsCache;
  }

  async getTimeTable(): Promise<TimeTable[]> {
    const settings = await this.fetchSettings();
    const timetable = await this.prisma.timeTable.findMany({
      where: {
        semesterId: settings.currentSemesterId,
      },
      include: {
        course: true,
        sessions: true,
      },
    });
    return timetable;
  }

  async addToTimeTable(data: AddToTimeTableDto): Promise<TimeTable> {
    const settings = await this.fetchSettings();

    const timeTableItem = await this.prisma.timeTable.create({
      data: {
        courseId: data.courseId,
        title: data.title,
        description: data.description,
        venue: data.venue,
        directions: data.directions,
        recurring: data.recurring,
        recurringType: data.recurringType,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        semesterId: settings.currentSemesterId,
        sessions: {
          create: data.sessions.map((session) => ({
            dayOfWeek: session.dayOfWeek,
            startTime: session.startTime,
            endTime: session.endTime,
          })),
        },
      },
      include: {
        sessions: true,
      },
    });

    return timeTableItem;
  }

  async updateTimeTable(
    id: string,
    data: updateTimeTableDto,
  ): Promise<TimeTable> {
    await this.checkExistingTimetableItem(id);
    const settings = await this.fetchSettings();
    const { sessions, ...timetableData } = data;
    const updatedTimeTable = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.timeTable.update({
        where: {
          id,
          semesterId: settings.currentSemesterId,
        },
        data: {
          ...timetableData,
          startDate: data.startDate ? new Date(data.startDate) : undefined,
          endDate: data.endDate ? new Date(data.endDate) : undefined,
        },
      });

      if (sessions) {
        // Delete existing sessions
        await tx.timetableSession.deleteMany({
          where: { timetableId: id },
        });

        // Recreate sessions
        await tx.timetableSession.createMany({
          data: sessions.map((session) => ({
            timetableId: id,
            dayOfWeek: session.dayOfWeek,
            startTime: session.startTime,
            endTime: session.endTime,
          })),
        });
      }

      return updated;
    });
    return updatedTimeTable;
  }

  async removeFromTimeTable(id: string): Promise<TimeTable> {
    const settings = await this.fetchSettings();
    const timeTableItem = await this.prisma.timeTable.delete({
      where: {
        id,
        semesterId: settings.currentSemesterId,
      },
    });

    return timeTableItem;
  }

  private async checkExistingTimetableItem(id: string): Promise<TimeTable> {
    const settings = await this.fetchSettings();
    const timeTableItem = await this.prisma.timeTable.findFirst({
      where: {
        id,
        semesterId: settings.currentSemesterId,
      },
    });

    if (!timeTableItem)
      throw new BadRequestException(`Time table item not found.`);

    return timeTableItem;
  }
}
