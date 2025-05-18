import { MaterialType } from '@/enum';

export interface Material {
  id: string;
  semesterId: string;
  courseId: string;
  title: string;
  type: MaterialType | keyof typeof MaterialType;
  url: string;
  available?: boolean | null;
  createdAt: Date;
}
