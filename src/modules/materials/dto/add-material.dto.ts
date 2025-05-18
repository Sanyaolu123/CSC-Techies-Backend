import { ApiProperty } from '@nestjs/swagger';
import { MaterialType } from '@/enum';
import { IsEnum, IsString, Matches } from 'class-validator';

export class AddMaterialDto {
  @ApiProperty({
    example: 'ckl8z0z1a0000qzrmn831i7b9',
    description: 'The unique identifier for the course ID (CUID format).',
  })
  @IsString()
  @Matches(/^c[a-z0-9]{24}$/i, {
    message: 'courseId must be a valid CUID',
  })
  courseId: string;

  @ApiProperty({
    example: 'Evolutions of Computer',
    description: 'The title of the material',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: MaterialType.DOCUMENT,
    description: 'The title of the material',
  })
  @IsString()
  @IsEnum(MaterialType)
  type: MaterialType;

  @ApiProperty({
    example: 'https://drive.google.com/****',
    description: 'The material link',
  })
  @IsString()
  url: string;
}
