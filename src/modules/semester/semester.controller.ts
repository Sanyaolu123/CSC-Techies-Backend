import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SemesterService } from './semester.service';
import { Public } from '@/core/decorators';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AppResponse, JwtAuthGuard } from '@/core';
import { PaginationQueryDto } from '@/shared/dto/pagination';
import { AddSemesterDto } from './dto/add-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';

@ApiTags('Semester')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('semester')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Get('')
  @ApiOperation({ summary: 'Fetch all semesters' })
  @ApiOkResponse({ description: 'Fetched all semesters successfully' })
  async getAllSemesters(@Query() query: PaginationQueryDto) {
    const semesters = await this.semesterService.getAllSemesters(query);
    return AppResponse.success(
      'Fetched all semesters successfully.',
      semesters,
    );
  }

  @Public()
  @Get('overview')
  @ApiOperation({ summary: 'Get current semester overview' })
  @ApiOkResponse({ description: 'Current semester fetched successfully' })
  async getCurrentSemesterOverview() {
    const semester = await this.semesterService.getCurrentSemesterOverview();
    return AppResponse.success(
      'Current semester fetched successfully.',
      semester,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a specific semester with [ID]' })
  @ApiOkResponse({ description: 'Fetched semester successfully' })
  async getSemester(@Param('id') id: string) {
    const semester = await this.semesterService.getSemester(id);
    return AppResponse.success('Fetched semester successfully.', semester);
  }

  @Post('')
  @ApiOperation({ summary: 'Fetch a specific semester with [ID]' })
  @ApiOkResponse({ description: 'Fetched semester successfully' })
  async addSemester(@Body() data: AddSemesterDto) {
    const semester = await this.semesterService.addSemester(data);
    return AppResponse.success('Semester Added successfully.', semester);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific semester with [ID]' })
  @ApiOkResponse({ description: 'Semester updated successfully' })
  async updateSemester(
    @Param('id') id: string,
    @Body() data: UpdateSemesterDto,
  ) {
    const semester = await this.semesterService.updateSemester(id, data);
    return AppResponse.success('Semester updated successfully.', semester);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific semester with [ID]' })
  @ApiOkResponse({ description: 'Semester removed successfully' })
  async removeSemester(@Param('id') id: string) {
    const semester = await this.semesterService.removeSemester(id);
    return AppResponse.success('Semester removed successfully.', semester);
  }
}
