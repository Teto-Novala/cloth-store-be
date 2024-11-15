import {
  Controller,
  NotFoundException,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SigninService } from '../services/signin.service';
import { JwtGuard } from 'src/user/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImgToStorage } from '../helper/image-storage';

@Controller('signin')
export class SigninController {
  constructor(private signInService: SigninService) {}

  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', saveImgToStorage))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Request() req): any {
    const fileName = file?.filename;

    if (!fileName) {
      throw new NotFoundException('file tidak ada');
    }

    return this.signInService.uploadImage(fileName);
  }
}
