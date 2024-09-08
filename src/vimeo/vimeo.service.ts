import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Vimeo } from '@vimeo/vimeo';
import * as fs from 'fs';

@Injectable()
export class VimeoService {
  private readonly vimeoClient: Vimeo;

  constructor() {
    this.vimeoClient = new Vimeo(
      '05367f564ce1d1addcfa5f3d39c60f8ee75241b7', // Vimeo mijoz identifikatori
      '/CT/aphqbGbkmhuznIiepm4t6b9XqLlhtvX0yIHSFr60MAy7ItvNnT3q0fNygbsSdtZIS/xdPEOFKj6v18wk1Ee07DM/z+AKDqodTbxUXvbTsSu1AsPHNyVi9kyCHB+r', // Vimeo mijoz maxfiy kaliti
      '79f22897e2632d6abe1d06b76b112533', // Vimeo access token
    );
  }

  async uploadVideo(filePath: string): Promise<any> {
    try {
      const fileStream = fs.createReadStream(filePath);

      return new Promise((resolve, reject) => {
        this.vimeoClient.upload(
          fileStream.path,
          {
            name: 'Mening Videom', // Videoning nomi
            description: 'Ushbu video Vimeo API orqali yuklandi.', // Videoning tavsifi
          },
          (uri) => {
            console.log('Video yuklandi. URI:', uri);
            resolve(`https://vimeo.com${uri}`);
          },
          (bytesUploaded, bytesTotal) => {
            const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(`Yuklanmoqda... ${percentage}%`);
          },
          (error) => {
            console.error('Video yuklashda xatolik:', error);
            reject(
              new HttpException(
                `Video yuklashda xatolik: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          },
        );
      });
    } catch (error) {
      throw new HttpException(
        `Video yuklashda xatolik: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
