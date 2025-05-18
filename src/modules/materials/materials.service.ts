import { PrismaService } from '@/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';
import { AppSettings, Material } from '@prisma/client';
import { AddMaterialDto } from './dto/add-material.dto';
import { MaterialFilterDto } from './dto/material-filter.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {
  private settingsCache: AppSettings;

  constructor(
    private readonly prisma: PrismaService,
    private readonly settings: SettingsService,
  ) {}

  private async fetchSettings() {
    if (!this.settingsCache) {
      const settings = await this.settings.fetchSettings();
      this.settingsCache = settings;
    }
    return this.settingsCache;
  }

  async addMaterial(data: AddMaterialDto): Promise<Material> {
    const settings = await this.fetchSettings();
    await this.checkExistingMaterialForCurrentSemester(data);

    const course = await this.prisma.material.create({
      data: { ...data, semesterId: settings.currentSemesterId },
    });

    return course;
  }

  async fetchAllMaterials(filter: MaterialFilterDto): Promise<Material[]> {
    const settings = await this.fetchSettings();
    const materials = await this.prisma.material.findMany({
      where: {
        semesterId: settings.currentSemesterId,
        ...filter,
      },
      include: {
        course: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return materials;
  }

  async fetchMaterial(id: string): Promise<Material> {
    const settings = await this.fetchSettings();
    const material = await this.prisma.material.findFirst({
      where: {
        id,
        semesterId: settings.currentSemesterId,
      },
      include: {
        course: true,
      },
    });

    if (!material) throw new BadRequestException('Material not found');

    return material;
  }

  async updateMaterial(id: string, data: UpdateMaterialDto) {
    const settings = await this.fetchSettings();
    await this.fetchMaterial(id);
    const material = await this.prisma.material.update({
      where: {
        id,
        semesterId: settings.currentSemesterId,
      },
      data,
    });

    return material;
  }

  async removeMaterial(id: string): Promise<Material> {
    const settings = await this.fetchSettings();
    await this.fetchMaterial(id);

    const material = await this.prisma.material.delete({
      where: {
        id,
        semesterId: settings.currentSemesterId,
      },
    });

    return material;
  }

  private async checkExistingMaterialForCurrentSemester(data: {
    title: string;
    url: string;
  }): Promise<void> {
    const settings = await this.fetchSettings();
    const [existingUrl, existingTitle] = await Promise.all([
      this.prisma.material.findFirst({
        where: {
          semesterId: settings.currentSemesterId,
          url: data.url,
        },
      }),
      this.prisma.material.findFirst({
        where: {
          semesterId: settings.currentSemesterId,
          title: data.title,
        },
      }),
    ]);

    if (existingUrl)
      throw new BadRequestException('Material with this url already exist.');
    if (existingTitle)
      throw new BadRequestException('Material with this title already exist.');
  }
}
