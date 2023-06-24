import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UploadsService {
  constructor(private configService: ConfigService) {}
  async upload(req: Request) {
    const accountId = this.configService.get<string>('CLOUDFLARE_ACCOUNT_ID');
    const apiToken = this.configService.get<string>('CLOUDFLARE_API_TOKEN');

    const headers = {
      Authorization: `Bearer ${apiToken}`,
      'Tus-Resumable': '1.0.0',
      'Upload-Length': req.headers['upload-length'],
    };

    try {
      const response = await axios.post(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream?direct_user=true`,
        {},
        {
          headers,
        },
      );

      const uploadUrl = response.headers['location'];

      if (!uploadUrl) {
        throw new HttpException(
          '비디오 업로드에 실패했습니다.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return uploadUrl;

      // if (response.data.errors) {
      //   response.data.errors.forEach((error) => {
      //     if (error.code === 7011) {
      //       throw new HttpException(
      //         '서버의 용량이 부족합니다.',
      //         HttpStatus.PAYLOAD_TOO_LARGE,
      //       );
      //     }
      //   });
      // }
    } catch (err) {
      throw new HttpException(
        '비디오 업로드 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
