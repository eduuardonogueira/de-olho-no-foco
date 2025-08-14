import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import configuration from './config/configuration';

@Injectable()
export class TasksService {
  private readonly logger = new Logger('TaskService');

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    const baseUrl = configuration().backendUrl;
    const response = await fetch(`${baseUrl}/api/hello`).then((res) =>
      res.text(),
    );

    this.logger.log(response);
    return response;
  }
}
