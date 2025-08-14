import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import configuration from 'src/config/configuration';

@Injectable()
export class ImgurService {
  private readonly logger = new Logger(ImgurService.name);

  async sendImage(image: string) {
    const formData = new FormData();
    formData.append('image', image);

    const HttpConfig = {
      method: 'POST',
      headers: {
        Authorization: configuration().imgurSecret,
      },
      body: formData,
    };

    const response = await fetch('https://api.imgur.com/3/image/', HttpConfig)
      .then((res) => res.json())
      .catch(() => null);

    if (response?.success && response.data?.link) {
      this.logger.log(response);
      return response.data.link;
    }

    this.logger.error('Imgur upload failed:', response);
    throw new HttpException(
      'Error sending image to Imgur',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async sendImages(images: string[]) {
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        return await this.sendImage(image);
      }),
    );

    return imageUrls;
  }
}
