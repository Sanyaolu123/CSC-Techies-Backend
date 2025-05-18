import { ApiProperty } from '@nestjs/swagger';
import { SemesterType } from '@prisma/client';
import { IsDateString, IsEnum, IsString } from 'class-validator';

export class AddSemesterDto {
  @ApiProperty({ example: '2023/2024', description: 'Academic session' })
  @IsString()
  session: string;

  @ApiProperty({
    enum: SemesterType,
    example: SemesterType.FIRST_SEMESTER,
    description: 'Type of semester',
  })
  @IsString()
  @IsEnum(SemesterType)
  semesterType: SemesterType;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '01/01/2024',
    description: 'Semester start date (dd/mm/yyyy)',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '01/05/24',
    description: 'Semester end date (dd/mm/yy)',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '15/04/24',
    description: 'Expected exam start date (dd/mm/yy)',
  })
  @IsDateString()
  expectedExamStartDate: string;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '30/04/24',
    description: 'Expected exam end date (dd/mm/yy)',
  })
  @IsDateString()
  expectedExamEndDate: string;
}
