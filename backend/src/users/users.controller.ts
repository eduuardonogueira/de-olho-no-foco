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
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserParamsDto } from './dtos/user-params.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dtos/update-user.dto';

@Serialize(UserDto)
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

  @Get()
  findUser(@Query() userParams: UserParamsDto) {
    const { id, email } = userParams;
    return this.usersService.findOne({ id, email });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  getAllUsers(@Req() req: Request) {
    return this.usersService.getAll(req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateUserPayload: UpdateUserDto, @Req() req: Request) {
    return this.usersService.update(updateUserPayload, req);
  }
}
