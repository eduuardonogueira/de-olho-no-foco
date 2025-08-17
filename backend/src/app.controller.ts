import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TasksService } from './tasks/tasks.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly taskService: TasksService,
  ) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/task')
  async initTask() {
    return await this.taskService.handleCron();
  }
}
