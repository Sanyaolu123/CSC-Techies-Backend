import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AddMaterialDto } from './add-material.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateMaterialDto extends PartialType(AddMaterialDto) {
  @ApiProperty({
    example: 'true',
    description: 'Set the material availability to true or false',
  })
  @IsOptional()
  @IsBoolean()
  available: boolean;
}
