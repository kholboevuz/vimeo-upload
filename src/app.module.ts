import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VimeoModule } from './vimeo/vimeo.module';

@Module({
  imports: [VimeoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
