import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/infrastructure/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/infrastructure/guards/admin.guard';
import { SettingsService } from './settings.service';

const UPLOAD_DIR = './uploads';
const ALLOWED_VIDEO_MIME = ['video/mp4', 'video/webm', 'video/quicktime'];
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 Mo

@ApiTags('settings')
@Controller()
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get('settings')
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @Post('admin/settings/hero-video')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_DIR,
        filename: (_req, file, cb) => {
          cb(null, `hero-${uuidv4()}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: MAX_VIDEO_SIZE },
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_VIDEO_MIME.includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              'Format vidéo non autorisé (mp4, webm, mov uniquement)',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadHeroVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Aucun fichier reçu');
    const url = `https://boutique-fflda.fr/uploads/${file.filename}`;
    await this.settingsService.updateHeroVideo(url);
    return { url };
  }
}