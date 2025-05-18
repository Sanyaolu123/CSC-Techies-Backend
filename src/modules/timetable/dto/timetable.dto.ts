import {
  IsString,
  IsOptional,
  Matches,
  IsDateString,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { TimetableSessionDto } from './timetable-session.dto';

export enum RecurrenceType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export class AddToTimeTableDto {
  @ApiProperty({
    example: 'ckl8z0z1a0000qzrmn831i7b9',
    description: 'The unique course ID (CUID format).',
  })
  @IsString()
  @Matches(/^c[a-z0-9]{24}$/i, {
    message: 'courseId must be a valid CUID',
  })
  courseId: string;

  @ApiProperty({
    example: 'History of Computing',
    description: 'Custom title for this class.',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'We will be looking at the history of computing.',
    description: 'Description of the session.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'DLI',
    description: 'Class venue.',
  })
  @IsString()
  venue: string;

  @ApiProperty({
    example: 'Floor 3, left wing',
    description: 'Additional directions to locate the venue.',
    required: false,
  })
  @IsOptional()
  @IsString()
  directions?: string;

  @ApiProperty({ enum: RecurrenceType, example: RecurrenceType.WEEKLY })
  @IsString()
  @IsEnum(RecurrenceType)
  recurringType: RecurrenceType;

  @ApiProperty({ example: true, description: 'Is the class recurring weekly?' })
  @IsBoolean()
  recurring: boolean;

  @ApiProperty({
    example: '2025-09-06T00:00:00Z',
    description: 'Start date of the class schedule',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2025-12-15T00:00:00Z',
    description: 'End date of the class schedule',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    type: [TimetableSessionDto],
    description: 'Session days and times during the week',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TimetableSessionDto)
  sessions: TimetableSessionDto[];
}

export class updateTimeTableDto extends PartialType(AddToTimeTableDto) {}
