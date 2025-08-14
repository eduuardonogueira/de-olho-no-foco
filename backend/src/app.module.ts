import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { ImgurService } from './providers/imgur.service';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AppLoggerMiddleware } from './middlewares/logger.middleware';

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
    ImgurService,
    AuthService,
    JwtService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
