import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PointsController } from './points/points.controller';
import { PointsService } from './points/points.service';
import { PointsModule } from './points/points.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { NotificationsModule } from './notifications/notifications.module';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    PointsModule,
    UsersModule,
    AuthModule,
    NotificationsModule,
  ],
  controllers: [
    AppController,
    PointsController,
    UsersController,
    AuthController,
  ],
  providers: [
    AppService,
    PointsService,
    PrismaService,
    UsersService,
    TasksService,
  ],
})
export class AppModule {}
