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
import { TimetableService } from './timetable.service';
import { AddToTimeTableDto, updateTimeTableDto } from './dto/timetable.dto';
import { AppResponse, JwtAuthGuard } from '@/core';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Public } from '@/core/decorators';

@ApiTags('Timetable')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('timetable')
export class TimetableController {
  constructor(private readonly timeTableService: TimetableService) {}

  @Public()
  @Get('')
  @ApiOperation({ summary: 'Fetch Timetable' })
  @ApiOkResponse({ description: 'Timetable fetched successfully' })
  async getCurrentSemesterTimeTable() {
    const timetable = await this.timeTableService.getTimeTable();
    return AppResponse.success('Timetable fetched successfully.', timetable);
  }

  @Post('')
  @ApiOperation({ summary: 'Add Item to Timetable' })
  @ApiOkResponse({ description: 'Item added to timetable successfully' })
  async addItemToTimetable(@Body() data: AddToTimeTableDto) {
    const timetable = await this.timeTableService.addToTimeTable(data);
    return AppResponse.success(
      'Item added to timetable successfully.',
      timetable,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Timetable Item' })
  @ApiOkResponse({ description: 'Timetable updated successfully' })
  async updateTimetable(
    @Param('id') id: string,
    @Body() data: updateTimeTableDto,
  ) {
    const timetable = await this.timeTableService.updateTimeTable(id, data);
    return AppResponse.success('Timetable updated successfully.', timetable);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove Timetable Item' })
  @ApiOkResponse({ description: 'Item removed from Timetable successfully' })
  async removeTimetable(@Param('id') id: string) {
    const timetable = await this.timeTableService.removeFromTimeTable(id);
    return AppResponse.success(
      'Item removed from Timetable successfully.',
      timetable,
    );
  }
}
