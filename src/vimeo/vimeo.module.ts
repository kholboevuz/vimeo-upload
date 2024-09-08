// src/vimeo/vimeo.module.ts
import { Module } from '@nestjs/common';
import { VimeoController } from './vimeo.controller';
import { VimeoService } from './vimeo.service';

@Module({
  controllers: [VimeoController],
  providers: [VimeoService],
})
export class VimeoModule {}
