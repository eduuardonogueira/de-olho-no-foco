import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePointDto } from './dtos/create-points.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PointsService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
  ) {}

  async findOne(id: string) {
    const findPoint = this.prismaService.point.findUnique({ where: { id } });

    if (!findPoint) throw new NotFoundException();

    return findPoint;
  }

  async findMany() {
    const points = await this.prismaService.point.findMany({
      include: { coordinates: true },
    });

    if (!points) throw new NotFoundException();

    return points;
  }

  async findPointsNearby(lat: string, lng: string, maxDistance: string) {
    const [latNumber, lngNumber, maxDistanceNumber] = [
      lat,
      lng,
      maxDistance,
    ].map((string) => parseFloat(string));
    const pointsNearby = await this.prismaService.$queryRaw`
    SELECT 
      p.id, 
      p.type, 
      p.description, 
      p.position, 
      p.created_at AS "createdAt",
      p.updated_at AS "updatedAt",
      jsonb_build_object(
        'id', c.id,
        'lat', c.lat,
        'lng', c.lng,
        'alt', c.alt,
        'rotation', c.rotation
      ) AS coordinates, 
      jsonb_build_object(
        'id', u.id,
        'firstName', u.first_name,
        'lastName', u.last_name
      ) AS user,
      (6371000 * acos(
        cos(radians(${latNumber})) * 
        cos(radians(c.lat)) * 
        cos(radians(c.lng) - radians(${lngNumber})) + 
        sin(radians(${latNumber})) * 
        sin(radians(c.lat))
      )) AS distance
    FROM 
      "Point" p
    INNER JOIN 
      "User" u ON p.user_id = u.id
    INNER JOIN 
      "Coordinates" c ON p.coordinates_id = c.id
    WHERE 
      (6371000 * acos(
        cos(radians(${latNumber})) * 
        cos(radians(c.lat)) * 
        cos(radians(c.lng) - radians(${lngNumber})) + 
        sin(radians(${latNumber})) * 
        sin(radians(c.lat))
      )) < ${maxDistanceNumber}
    ORDER BY 
      distance ASC;
  `;

    if (!pointsNearby) {
      throw new HttpException(
        'Error getting points',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return pointsNearby;
  }

  async create(pointPayload: CreatePointDto, currentUser?: any) {
    const { coordinates, ...pointData } = pointPayload;
    const { id } = currentUser;

    const user = await this.usersService.findOne({ id });
    if (!user) return;

    const point = await this.prismaService.point.create({
      data: {
        ...pointData,
        coordinates: { create: coordinates },
        user: { connect: { id } },
      },
    });

    if (!point) {
      throw new HttpException(
        'Error creating point',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return point;
  }

  // async update(id: string, data) {}

  async remove(id: string) {
    const findPoint = await this.findOne(id);

    if (!findPoint) throw new NotFoundException();

    const point = await this.prismaService.point.delete({ where: { id } });

    return {
      statusCode: HttpStatus.OK,
      message: 'Point sucessfully deleted',
      data: point,
    };
  }
}
