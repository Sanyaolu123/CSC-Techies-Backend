import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, Matches } from 'class-validator';

export class EventsDto {
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
    description: 'Change event title.',
    required: true,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'We will be looking at the history of computing.',
    description: 'Additional event details.',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'DLI',
    description: 'Event venue.',
    required: true,
  })
  @IsString()
  venue: string;

  @ApiProperty({
    example: '2025-09-06T09:00:00Z',
    description: 'Event start date and time in ISO 8601 format.',
    required: true,
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2025-09-06T09:00:00Z',
    description: 'Event start date and time in ISO 8601 format.',
    required: true,
  })
  @IsDateString()
  endDate: string;
}

export class updateEventDto extends PartialType(EventsDto) {}
