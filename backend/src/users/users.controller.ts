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
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserParamsDto } from './dtos/user-params.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  createUser(@Body() userPayload: CreateUserDto) {
    return this.usersService.create(userPayload, null);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/admin/register')
  createPrivilegedUser(
    @Body() userPayload: CreateUserDto,
    @Req() req: Request,
  ) {
    return this.usersService.create(userPayload, req.user);
  }

  @Serialize(UserDto)
  @Get()
  findUser(@Query() userParams: UserParamsDto) {
    const { id, email } = userParams;
    return this.usersService.findOne({ id, email });
  }

  @Delete('/delete/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Get('/status')
  getUserStatus(@Req() req: Request) {
    return this.usersService.getStatus(req);
  }
}
