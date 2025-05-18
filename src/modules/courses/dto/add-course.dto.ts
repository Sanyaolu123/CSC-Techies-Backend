import { ApiProperty } from '@nestjs/swagger';
import { CourseType } from '@prisma/client';
import { IsEnum, IsNumber, IsString, Matches, Min } from 'class-validator';

export class AddCourseDto {
  @ApiProperty({
    example: 'ckl8z0z1a0000qzrmn831i7b9',
    description: 'The unique identifier for the semester (CUID format).',
  })
  @IsString()
  @Matches(/^c[a-z0-9]{24}$/i, {
    message: 'semesterId must be a valid CUID',
  })
  semesterId: string;

  @ApiProperty({
    example: 'PHY101',
    description: 'The course code.',
  })
  @IsString()
  courseCode: string;

  @ApiProperty({
    example: 'Introduction to Physic',
    description: 'The course title.',
  })
  @IsString()
  courseTitle: string;

  @ApiProperty({
    example: '2',
    description: 'The course units',
  })
  @IsNumber()
  @Min(1)
  units: number;

  @ApiProperty({
    example: CourseType.COMPULSORY,
    description: 'The course type.',
  })
  @IsString()
  @IsEnum(CourseType)
  courseType: CourseType;
}
