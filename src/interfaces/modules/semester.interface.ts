import { SemesterType } from '@/enum';

export interface Semester {
  id: string;
  session: string;
  semesterType: SemesterType | keyof typeof SemesterType;
  startDate: Date;
  endDate: Date;
  expectedExamStartDate: Date;
  expectedExamEndDate: Date;
  createdAt: Date;
}
