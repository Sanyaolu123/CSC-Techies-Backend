import { AppResponse, JwtAuthGuard } from '@/core';
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
import { AddExamDto, updateExamDto } from './dto/exam.dto';
import { ExamsService } from './exams.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Public } from '@/core/decorators';

@ApiTags('Exams')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exams')
export class ExamsController {
  constructor(private readonly examService: ExamsService) {}

  @Public()
  @Get('')
  @ApiOperation({ summary: 'Fetch Exams' })
  @ApiOkResponse({ description: 'Exams fetched successfully' })
  async getCurrentSemesterTimeTable() {
    const exams = await this.examService.getExams();
    return AppResponse.success('Exams fetched successfully.', exams);
  }

  @Post('')
  @ApiOperation({ summary: 'Add Exam Item' })
  @ApiOkResponse({ description: 'Item added to exams successfully' })
  async addItemToTimetable(@Body() data: AddExamDto) {
    const exam = await this.examService.addToExams(data);
    return AppResponse.success('Item added to exams successfully.', exam);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Exam Item' })
  @ApiOkResponse({ description: 'Exam updated successfully' })
  async updateTimetable(@Param('id') id: string, @Body() data: updateExamDto) {
    const exam = await this.examService.updateExams(id, data);
    return AppResponse.success('Exam updated successfully.', exam);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove Exam Item' })
  @ApiOkResponse({ description: 'Item removed from exams successfully' })
  async removeTimetable(@Param('id') id: string) {
    const exam = await this.examService.removeExam(id);
    return AppResponse.success('Item removed from exams successfully.', exam);
  }
}
