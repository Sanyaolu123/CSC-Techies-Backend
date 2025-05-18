import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsDto } from './dto/settings.dto';
import { AppResponse, JwtAuthGuard } from '@/core';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Settings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('')
  @ApiOperation({ summary: 'Get settings.' })
  @ApiOkResponse({ description: 'Settings fetched successfully' })
  async fetchSettings() {
    const settings = await this.settingsService.fetchSettings();
    return AppResponse.success('Settings fetched successfully.', settings);
  }

  @Post('')
  @ApiOperation({ summary: 'Initialize or update settings.' })
  @ApiOkResponse({ description: 'Settings updated successfully' })
  async initializeOrUpdateSettings(@Body() dto: SettingsDto) {
    const settings = await this.settingsService.updateSettings(dto);
    return AppResponse.success('Settings updated successfully.', settings);
  }
}
