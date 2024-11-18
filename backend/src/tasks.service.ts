import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    const baseUrl = process.env.BACKEND_URL;
    console.log(baseUrl);
    const response = await fetch(`${baseUrl}/api/hello`).then((res) =>
      res.text(),
    );
    console.log(response);
  }
}
