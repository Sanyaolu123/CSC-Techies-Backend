import { PrismaService } from '@/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AppSettings, Exam } from '@prisma/client';
import { SettingsService } from '../settings/settings.service';
import { AddExamDto, updateExamDto } from './dto/exam.dto';

@Injectable()
export class ExamsService {
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

  async getExams(): Promise<Exam[]> {
    const settings = await this.fetchSettings();
    const exams = await this.prisma.exam.findMany({
      where: {
        semesterId: settings.currentSemesterId,
      },
      include: {
        course: true,
      },
    });
    return exams;
  }

  async addToExams(data: AddExamDto): Promise<Exam> {
    const settings = await this.fetchSettings();

    const exam = await this.prisma.exam.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        semesterId: settings.currentSemesterId,
      },
    });

    return exam;
  }

  async updateExams(id: string, data: updateExamDto): Promise<Exam> {
    await this.checkExistingExamItem(id);
    const settings = await this.fetchSettings();
    const exam = await this.prisma.exam.update({
      where: {
        id,
        semesterId: settings.currentSemesterId,
      },
      data,
    });
    return exam;
  }

  async removeExam(id: string): Promise<Exam> {
    const settings = await this.fetchSettings();
    const exam = await this.prisma.exam.delete({
      where: {
        id,
        semesterId: settings.currentSemesterId,
      },
    });

    return exam;
  }

  private async checkExistingExamItem(id: string): Promise<Exam> {
    const settings = await this.fetchSettings();
    const exam = await this.prisma.exam.findFirst({
      where: {
        id,
        semesterId: settings.currentSemesterId,
      },
    });

    if (!exam) throw new BadRequestException(`Exam not found.`);

    return exam;
  }
}
