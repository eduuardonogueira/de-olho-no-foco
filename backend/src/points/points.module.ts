import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PointsController],
  providers: [PointsService, PrismaService],
  exports: [PointsService],
  imports: [UsersModule],
})
export class PointsModule {}
