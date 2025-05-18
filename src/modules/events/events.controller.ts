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
import { EventsService } from './events.service';
import { AppResponse, JwtAuthGuard } from '@/core';
import { EventsDto, updateEventDto } from './dto/events.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('')
  @ApiOperation({ summary: 'Fetch Events' })
  @ApiOkResponse({ description: 'Events fetched successfully' })
  async getEvents() {
    const timetable = await this.eventsService.getEvents();
    return AppResponse.success('Events fetched successfully.', timetable);
  }

  @Post('')
  @ApiOperation({ summary: 'Add Event' })
  @ApiOkResponse({ description: 'Item added to events successfully' })
  async addItemToTimetable(@Body() data: EventsDto) {
    const events = await this.eventsService.addToEvents(data);
    return AppResponse.success('Item added to events successfully.', events);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Event' })
  @ApiOkResponse({ description: 'Events updated successfully' })
  async updateEvents(@Param('id') id: string, @Body() data: updateEventDto) {
    const event = await this.eventsService.updateEvent(id, data);
    return AppResponse.success('Events updated successfully.', event);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove Event' })
  @ApiOkResponse({ description: 'Item removed from Events successfully' })
  async removeEvent(@Param('id') id: string) {
    const event = await this.eventsService.removeFromEvents(id);
    return AppResponse.success('Item removed from Events successfully.', event);
  }
}
