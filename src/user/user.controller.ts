import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
@Controller('users')
export class UserController {
  constructor(private user: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return {
      msg: 'user info',
      user,
    };
  }

  @Post()
  findUser() {
    return 'this is findUser';
  }
}
