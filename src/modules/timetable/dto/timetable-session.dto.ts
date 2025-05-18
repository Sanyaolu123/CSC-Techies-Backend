import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum WeekDay {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

export class TimetableSessionDto {
  @ApiProperty({ example: 'MONDAY', description: 'Day of the week' })
  @IsEnum(WeekDay)
  dayOfWeek: WeekDay;

  @ApiProperty({
    example: '10:00',
    description: 'Class end time on this day',
  })
  @IsString()
  startTime: string;

  @ApiProperty({
    example: '12:00',
    description: 'Class end time on this day',
  })
  @IsString()
  endTime: string;
}
