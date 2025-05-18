import { RecurrenceType, WeekDay } from '@/enum';
import { Semester } from './semester.interface';
import { Course } from './course.interface';

export interface TimeTable {
  id: string;
  courseId: string;
  semesterId: string;
  title?: string | null;
  description: string;
  venue: string;
  directions?: string | null;
  recurring: boolean;
  recurringType: RecurrenceType | keyof typeof RecurrenceType;
  semester?: Semester;
  course?: Course;
  sessions?: TimetableSession[] | null;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

export interface TimetableSession {
  id: string;
  timetable?: TimeTable | null;
  timetableId: string;
  dayOfWeek: WeekDay | keyof typeof WeekDay;
  startTime: string;
  endTime: string;
}
