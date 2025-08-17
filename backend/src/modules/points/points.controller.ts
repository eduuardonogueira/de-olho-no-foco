import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PointsService } from './points.service';
import { CreatePointDto } from './dtos/create-point.dto';
import { GetPointsNearbyDto } from './dtos/get-points-nearby.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ImgurService } from '../../providers/imgur.service';
import { SetRequestTimeout } from 'src/decorators/timeout.decorator';
import { UpdatePointDto } from './dtos/update-point.dto';

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

  @Patch('/:id')
  updatePoint(@Param('id') id: string, @Body() body: UpdatePointDto) {
    return this.pointsService.update(id, body);
  }

  @Delete('/delete/:id')
  removePoint(@Param('id') id: string) {
    return this.pointsService.remove(id);
  }
}
