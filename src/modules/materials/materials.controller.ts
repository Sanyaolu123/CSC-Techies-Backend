import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialFilterDto } from './dto/material-filter.dto';
import { AddMaterialDto } from './dto/add-material.dto';
import { AppResponse, JwtAuthGuard } from '@/core';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Public } from '@/core/decorators';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Materials')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialService: MaterialsService) {}

  @Post('')
  @ApiOperation({ summary: 'Add materials to a specific course.' })
  @ApiOkResponse({ description: 'Material added successfully' })
  async addMaterial(@Body() dto: AddMaterialDto) {
    const material = await this.materialService.addMaterial(dto);
    return AppResponse.success('Material added successfully.', material);
  }

  @Public()
  @Get('')
  @ApiOperation({ summary: 'Fetch all materials.' })
  @ApiOkResponse({ description: 'Materials fetched successfully' })
  async fetchCurrentSemesterMaterials(@Query() filter: MaterialFilterDto) {
    const materials = await this.materialService.fetchAllMaterials(filter);
    return AppResponse.success('Materials fetched successfully.', materials);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Fetch specific material with [ID]' })
  @ApiOkResponse({ description: 'Material fetched successfully' })
  async fetchMaterial(@Param('id') id: string) {
    const material = await this.materialService.fetchMaterial(id);
    return AppResponse.success('Material fetched successfully.', material);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update specific material with [ID]' })
  @ApiOkResponse({ description: 'Material updated successfully' })
  async updateMaterial(
    @Body() dto: UpdateMaterialDto,
    @Param('id') id: string,
  ) {
    const material = await this.materialService.updateMaterial(id, dto);
    return AppResponse.success('Material updated successfully.', material);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove  specific material with [ID]' })
  @ApiOkResponse({ description: 'Material removed successfully' })
  async removeMaterial(@Param('id') id: string) {
    const material = await this.materialService.removeMaterial(id);
    return AppResponse.success('Material removed successfully.', material);
  }
}
