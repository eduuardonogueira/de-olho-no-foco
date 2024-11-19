import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PointsService } from './points.service';
import { CreatePointDto } from './dtos/create-points.dto';
import { GetPointsNearbyDto } from './dtos/get-points-nearby.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEntity } from 'src/users/entities/user.entity';

interface Request {
  user: UserEntity;
}

@UseGuards(JwtAuthGuard)
@Controller('points')
export class PointsController {
  constructor(private pointsService: PointsService) {}

  @Post('/create')
  async createPoints(
    @Body()
    pointPayload: CreatePointDto,
    @Req() req: Request,
  ) {
    const points = await this.pointsService.create(pointPayload, req.user);
    return points;
  }

  @Get()
  async getAllPoints() {
    return await this.pointsService.findMany();
  }

  @Get('/nearby')
  getPointsNearby(
    @Query()
    getPointsNearbyDto: GetPointsNearbyDto,
  ) {
    const { maxDistance, lat, lng } = getPointsNearbyDto;
    return this.pointsService.findPointsNearby(lat, lng, maxDistance);
  }

  @Get('/:id')
  findPoint(@Param('id') id: string) {
    return this.pointsService.findOne(id);
  }

  // @Patch('/:id')
  // updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
  //   return this.pointsService.update(parseInt(id), body);
  // }

  @Delete('/delete/:id')
  async removeProduct(@Param('id') id: string) {
    return await this.pointsService.remove(id);
  }
}
