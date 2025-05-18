import { PartialType } from '@nestjs/swagger';
import { AddSemesterDto } from './add-semester.dto';

export class UpdateSemesterDto extends PartialType(AddSemesterDto) {}
