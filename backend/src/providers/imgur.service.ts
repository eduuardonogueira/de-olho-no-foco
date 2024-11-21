import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

Injectable();
export class ImgurService {
  async sendImage(image: string) {
    const formData = new FormData();
    formData.append('image', image);

    const HttpConfig = {
      method: 'POST',
      headers: {
        Authorization: process.env.IMGUR_SECRET,
      },
      body: formData,
    };

    const response = await fetch(
      'https://api.imgur.com/3/image/',
      HttpConfig,
    ).then((data) => data.json());

    if (response.status) {
      const imageUrl = response.data.link;
      return imageUrl;
    } else {
      throw new HttpException(
        'Error seding Imgur request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
