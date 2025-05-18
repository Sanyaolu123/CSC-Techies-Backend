import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, Matches } from 'class-validator';

export class SettingsDto {
  @ApiProperty({
    example: 'ckl8z0z1a0000qzrmn831i7b9',
    description:
      'The unique identifier for the current semester (CUID format).',
  })
  @IsString()
  @Matches(/^c[a-z0-9]{24}$/i, {
    message: 'currentSemesterId must be a valid CUID',
  })
  currentSemesterId: string;

  @ApiProperty({
    example: '2025-06-30',
    description: 'The expected graduation date in ISO 8601 format.',
  })
  @IsDateString()
  expectedGraduationDate: string;
}
