import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings() {
    let settings = await this.prisma.siteSettings.findUnique({
      where: { id: 'main' },
    });
    if (!settings) {
      settings = await this.prisma.siteSettings.create({
        data: { id: 'main' },
      });
    }
    return settings;
  }

  async updateHeroVideo(url: string) {
    return this.prisma.siteSettings.upsert({
      where: { id: 'main' },
      update: { heroVideoUrl: url },
      create: { id: 'main', heroVideoUrl: url },
    });
  }
}