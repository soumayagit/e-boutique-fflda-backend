import { Module } from '@nestjs/common';
import { UploadController } from './infrastructure/upload.controller';

@Module({
  controllers: [UploadController],
})
export class UploadModule {}