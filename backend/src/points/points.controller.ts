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
import { ImgurService } from '../providers/imgur.service';
import { SetRequestTimeout } from 'src/decorators/timeout.decorator';

interface Request {
  user: UserEntity;
}

@UseGuards(JwtAuthGuard)
@Controller('points')
export class PointsController {
  constructor(
    private readonly pointsService: PointsService,
    private readonly imgurService: ImgurService,
  ) {}

  @Post('/create')
  @SetRequestTimeout(30000)
  async createPoints(
    @Body()
    payload: CreatePointDto,
    @Req() req: Request,
  ) {
    const { images } = payload;
    const imageUrls = await this.imgurService.sendImages(images);

    const pointPayload = { ...payload, images: imageUrls };

    return this.pointsService.create(pointPayload, req.user);
  }

  @Get()
  getAllPoints() {
    return this.pointsService.findMany();
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
  removePoint(@Param('id') id: string) {
    return this.pointsService.remove(id);
  }
}
