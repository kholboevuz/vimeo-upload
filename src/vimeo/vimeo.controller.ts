import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { VimeoService } from './vimeo.service';

@Controller('vimeo')
export class VimeoController {
  constructor(private readonly vimeoService: VimeoService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new Error('Fayl yuklanmadi!');
      }

      const filePath = file.path;

      const videoUrl = await this.vimeoService.uploadVideo(filePath);

      return {
        message: 'Video muvaffaqiyatli yuklandi!',
        videoUrl: videoUrl,
      };
    } catch (error) {
      return { message: `Video yuklashda xatolik: ${error.message}` };
    }
  }
}
