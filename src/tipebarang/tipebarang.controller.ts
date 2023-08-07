import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { TipebarangService } from './tipebarang.service';
import { TipeDto } from './dto/tipe.dto';
import { TipeBarangLogActivityService } from 'src/log-activity/tipe-barang-log-activity.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('tipebarang')
export class TipebarangController {
  constructor(private tipe: TipebarangService, private logService: TipeBarangLogActivityService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@GetUser() user: User) {
    const tipes = this.tipe.findAllTipe();
    this.logService.createUserReadLog(user);
    return tipes;
  }

  @Post()
  async createTipe(@Body() dto: TipeDto, @GetUser() user: User) {
    const tipe = await this.tipe.createTipeBarang(dto);
    this.logService.createUserAddLog(user, tipe.data);
    return tipe;
  }

  @Put(':id')
  async updateTipe(@Param('id', ParseIntPipe) id: number, @Body() dto: TipeDto, @GetUser() user: User) {
    const tipe = await this.tipe.updateTipe(id, dto);
    this.logService.createUserUpdateLog(user, tipe.data);
  }
  @Delete(':id')
  deleteTipe(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    const status = this.tipe.deleteTipe(id);
    this.logService.createUserDeleteLog(user, id);
    return status;
  }
}
