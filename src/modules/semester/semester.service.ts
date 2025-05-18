import { PaginationQueryDto } from '@/shared/dto/pagination';
import {
  createPaginatedResponse,
  getPaginationParams,
  PaginatedResult,
} from '@/utilities/pagination.util';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Course,
  Exam,
  Semester,
  SemesterType,
  TimeTable,
} from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
import { AddSemesterDto } from './dto/add-semester.dto';
import { session } from 'passport';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class SemesterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appSettings: SettingsService,
  ) {}

  async addSemester(data: AddSemesterDto): Promise<Semester> {
    await this.checkExistingSemester(data);

    const semester = await this.prisma.semester.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        expectedExamStartDate: new Date(data.expectedExamStartDate),
        expectedExamEndDate: new Date(data.expectedExamEndDate),
      },
    });
    return semester;
  }

  async getAllSemesters(
    query: PaginationQueryDto,
  ): Promise<PaginatedResult<Semester>> {
    const { take, skip, orderBy, page } = getPaginationParams(query);

    const [semesters, total] = await Promise.all([
      this.prisma.semester.findMany({
        take,
        skip,
        orderBy,
      }),
      this.prisma.semester.count({
        take,
        skip,
        orderBy,
      }),
    ]);

    return createPaginatedResponse(semesters, total, page, take);
  }

  async getSemester(id: string): Promise<Semester> {
    const semester = await this.prisma.semester.findFirst({
      where: {
        id,
      },
    });

    if (!semester) throw new BadRequestException('Semester not found.');

    return semester;
  }

  async getCurrentSemesterOverview(): Promise<
    (Semester & { courses: Course[]; timetable: TimeTable[]; exam: Exam[] }) & {
      expectedGraduationDate: Date;
    }
  > {
    const settings = await this.appSettings.fetchSettings();
    const semester = await this.prisma.semester.findFirst({
      where: {
        id: settings.currentSemesterId,
      },
      include: {
        courses: true,
        timetable: true,
        exam: true,
      },
    });
    if (!semester) {
      throw new BadRequestException('Current semester not found.');
    }
    return {
      ...semester,
      expectedGraduationDate: settings.expectedGraduationDate,
    };
  }

  async updateSemester(id: string, data: UpdateSemesterDto) {
    await this.getSemester(id);
    await this.prisma.semester.update({
      where: { id },
      data,
    });
  }

  async removeSemester(id: string): Promise<Semester> {
    await this.getSemester(id);
    await this.prisma.material.deleteMany({
      where: {
        semesterId: id,
      },
    });
    await this.prisma.course.deleteMany({
      where: {
        semesterId: id,
      },
    });
    await this.prisma.exam.deleteMany({
      where: {
        semesterId: id,
      },
    });
    await this.prisma.timeTable.deleteMany({
      where: {
        semesterId: id,
      },
    });

    const semester = await this.prisma.semester.delete({
      where: {
        id,
      },
    });

    return semester;
  }

  private async checkExistingSemester(data: {
    session: string;
    semesterType: SemesterType;
  }) {
    const semester = await this.prisma.semester.findFirst({
      where: {
        session: data.session,
        semesterType: data.semesterType,
      },
    });

    if (semester)
      throw new BadRequestException(
        `Semester with this session: ${session} and semester type: ${SemesterType} already exist.`,
      );
  }
}
