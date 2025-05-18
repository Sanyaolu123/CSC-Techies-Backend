import { PrismaService } from '@/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SettingsDto } from './dto/settings.dto';
import { AppSettings } from '@prisma/client';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchSettings() {
    const settings = await this.prisma.appSettings.findFirst();
    if (!settings) throw new BadRequestException('Settings not initialized.');
    return settings;
  }

  async updateSettings(data: SettingsDto): Promise<AppSettings> {
    const settings = await this.prisma.appSettings.findFirst({});
    if (!settings) {
      // data.expectedGraduationDate = new Date(data.expectedGraduationDate);
      const new_settings = await this.prisma.appSettings.create({
        data: {
          ...data,
          expectedGraduationDate: new Date(data.expectedGraduationDate),
        },
      });
      return new_settings;
    } else {
      const updated_settings = await this.prisma.appSettings.update({
        where: {
          id: settings.id,
        },
        data: {
          ...data,
          expectedGraduationDate: new Date(data.expectedGraduationDate),
        },
      });
      return updated_settings;
    }
  }
}
