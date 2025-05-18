import { PrismaService } from '@/shared';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AddCourseDto } from './dto/add-course.dto';
import { AppSettings, Course } from '@prisma/client';
import { UpdateCourseDto } from './dto/update-course.dto';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class CoursesService {
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

  async addCourse(data: AddCourseDto): Promise<Course> {
    const settings = await this.fetchSettings();
    await this.checkExistingCourseForCurrentSemester(data);
    const course = await this.prisma.course.create({
      data: {
        ...data,
        semesterId: settings.currentSemesterId,
      },
    });

    return course;
  }

  async fetchAllCourses(): Promise<Course[]> {
    const settings = await this.fetchSettings();

    const courses = await this.prisma.course.findMany({
      where: {
        semesterId: settings.currentSemesterId,
      },
      include: {
        materials: true,
      },
    });

    return courses;
  }

  async fetchCourse(id: string): Promise<Course> {
    const settings = await this.fetchSettings();
    const course = await this.prisma.course.findFirst({
      where: {
        id,
        semesterId: settings.currentSemesterId,
      },
      include: {
        materials: true,
      },
    });

    if (!course) throw new BadRequestException('Course not found.');

    return course;
  }

  async updateCourse(id: string, data: UpdateCourseDto): Promise<Course> {
    const settings = await this.fetchSettings();
    await this.fetchCourse(id);

    const updatedCourse = await this.prisma.course.update({
      where: {
        id,
        semesterId: settings.currentSemesterId,
      },
      data,
    });

    return updatedCourse;
  }

  async removeCourse(id: string): Promise<Course> {
    await this.fetchCourse(id);

    const course = await this.prisma.course.delete({
      where: {
        id,
      },
    });

    return course;
  }

  private async checkExistingCourseForCurrentSemester(data: {
    courseCode: string;
    courseTitle: string;
  }): Promise<void> {
    const settings = await this.fetchSettings();
    const [existingCourseCode, existingCourseTitle] = await Promise.all([
      this.prisma.course.findFirst({
        where: {
          courseCode: data.courseCode,
          semesterId: settings.currentSemesterId,
        },
      }),
      this.prisma.course.findFirst({
        where: {
          courseTitle: data.courseTitle,
          semesterId: settings.currentSemesterId,
        },
      }),
    ]);

    if (existingCourseCode) {
      throw new BadRequestException(
        'Course code already exists for current semester.',
      );
    }

    if (existingCourseTitle) {
      throw new BadRequestException(
        'Course title already exists for current semester.',
      );
    }
  }
}
