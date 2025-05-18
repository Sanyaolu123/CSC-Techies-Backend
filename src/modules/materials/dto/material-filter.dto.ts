import { MaterialType } from '@/enum';
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
