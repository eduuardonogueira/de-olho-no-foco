import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import configuration from './config/configuration';
import * as bodyParser from 'body-parser';

const logger = new Logger('NestApplication');

async function bootstrap() {
  const port = configuration().port;
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '10mb' }));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors();

  await app.listen(port);

  logger.log('Backend is running on:', await app.getUrl());
}
bootstrap();
