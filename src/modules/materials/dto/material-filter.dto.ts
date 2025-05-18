import { MaterialType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class MaterialFilterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  @IsEnum(MaterialType)
  type?: MaterialType;

  @IsOptional()
  @IsString()
  url?: string;
}
