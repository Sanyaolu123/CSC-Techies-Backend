export interface Events {
  id: string;
  title?: string | null;
  description: string;
  venue: string;
  directions?: string | null;
  recurring?: boolean | null;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}
