import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ExamType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class AddExamDto {
  @ApiProperty({
    example: 'ckl8z0z1a0000qzrmn831i7b9',
    description: 'The unique identifier for the course ID (CUID format).',
    required: true,
  })
  @IsString()
  @Matches(/^c[a-z0-9]{24}$/i, {
    message: 'courseId must be a valid CUID',
  })
  courseId: string;

  @ApiProperty({
    example: '',
    description: 'Change exam title.',
    required: true,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'Bring along your student ID Card',
    description: 'Additional exam details.',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'DLI',
    description: 'Exam centre.',
    required: true,
  })
  @IsString()
  venue: string;

  @ApiProperty({
    example: ExamType.EXAM,
    description: 'Exam type.',
  })
  @IsOptional()
  @IsEnum(ExamType)
  @IsString()
  type?: ExamType;

  @ApiProperty({
    example: '2025-09-06T09:00:00Z',
    description: 'Exam start date and time in ISO 8601 format.',
    required: true,
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2025-09-06T09:00:00Z',
    description: 'Exam start date and time in ISO 8601 format.',
    required: true,
  })
  @IsDateString()
  endDate: string;
}

export class updateExamDto extends PartialType(AddExamDto) {}
