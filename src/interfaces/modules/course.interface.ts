import { CourseType } from '@/enum';

export interface Course {
  id: string;
  semesterId: string;
  courseCode: string;
  courseTitle: string;
  courseType: CourseType | keyof typeof CourseType;
  units: number;
  createdAt: Date;
}
