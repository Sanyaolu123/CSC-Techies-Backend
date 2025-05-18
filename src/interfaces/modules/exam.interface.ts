import { ExamType } from '@/enum';

export interface Exam {
  id: string;
  courseId: string;
  semesterId: string;
  title?: string | null;
  description: string;
  venue: string;
  directions?: string | null;
  recurring?: boolean | null;
  type?: ExamType | keyof typeof ExamType | null;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}
