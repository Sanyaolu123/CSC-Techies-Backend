import { PartialType } from '@nestjs/swagger';
import { AddCourseDto } from './add-course.dto';

export class UpdateCourseDto extends PartialType(AddCourseDto) {}
