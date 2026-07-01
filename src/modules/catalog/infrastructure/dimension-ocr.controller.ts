import {
  Controller, Post, UseInterceptors,
  UploadedFile, UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DimensionOcrService } from '../application/use-cases/dimension-ocr.service';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Catalog')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class DimensionOcrController {
  constructor(private readonly ocrService: DimensionOcrService) {}

  @Post('extract-dimensions')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async extractDimensions(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { error: 'Aucune image fournie' };
    }
    return this.ocrService.extractDimensions(file.buffer);
  }
}