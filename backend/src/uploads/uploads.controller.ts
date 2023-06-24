import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}
  @Post()
  async upload(@Req() req, @Res() res) {
    const uploadUrl = await this.uploadsService.upload(req);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Location');
    res.setHeader('Location', uploadUrl);

    return res.status(HttpStatus.OK).json();
  }
}
