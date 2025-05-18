import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { AppResponse, JwtAuthGuard } from '@/core';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AddCourseDto } from './dto/add-course.dto';
import { Public } from '@/core/decorators';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Courses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Public()
  @Get('')
  @ApiOperation({ summary: 'Get all current semester courses' })
  @ApiOkResponse({ description: 'Courses fetched successfully' })
  async fetchAllCourses() {
    const courses = await this.coursesService.fetchAllCourses();
    return AppResponse.success('Courses fetched successfully.', courses);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get current semester course with [ID]' })
  @ApiOkResponse({ description: 'Course fetched successfully' })
  async fetchCourse(@Param('id') id: string) {
    const course = await this.coursesService.fetchCourse(id);
    return AppResponse.success('Course fetched successfully.', course);
  }

  @Post('')
  @ApiOperation({ summary: 'Add course to current semester courses' })
  @ApiOkResponse({ description: 'Course added successfully' })
  async addCourses(@Body() dto: AddCourseDto) {
    const course = await this.coursesService.addCourse(dto);
    return AppResponse.success('Course added successfully', course);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update current semester course with [ID]' })
  @ApiOkResponse({ description: 'Course updated successfully' })
  async updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    const course = await this.coursesService.updateCourse(id, dto);
    return AppResponse.success('Course updated successfully', course);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove current semester course with [ID]' })
  @ApiOkResponse({ description: 'Course removed successfully' })
  async removeCourse(@Param('id') id: string) {
    const course = await this.coursesService.removeCourse(id);
    return AppResponse.success('Course removed successfully.', course);
  }
}
