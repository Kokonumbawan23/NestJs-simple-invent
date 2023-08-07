import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BarangService } from './barang.service';
import { BarangDto } from './dto/barang.dto';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { BarangLogActivityService } from 'src/log-activity/barang-log-activity.service';

@UseGuards(JwtGuard)
@Controller('barang')
export class BarangController {
  constructor(private inventories: BarangService, private logActivity: BarangLogActivityService) {}

  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll(@GetUser() user: User) {
    const users = this.inventories.findAll();
    this.logActivity.createUserReadLog(user);
    return users;
  }

  @Get('name-:name')
  findByName(@Param('name') name: string, @GetUser() user: User) {
    const barang = this.inventories.findByName(name);
    this.logActivity.createUserReadByNameLog(user, name);
    return barang;
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    const barang = this.inventories.findById(id);
    this.logActivity.createUserReadByIdLog(user, id);
    return barang;
  }

  @Post('create')
  async createBarang(@Body() dto: BarangDto, @GetUser() user: User) {
    const barang = await this.inventories.createBarang(dto);
    this.logActivity.createUserAddLog(user, barang.data);
    return barang;
  }

  @Put(':id')
  async updateBarang(@Body() dto: BarangDto, @Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    const barang = await this.inventories.updateBarang(dto, id);
    this.logActivity.createUserUpdateLog(user, barang.data);
    return barang;
  }

  @Delete(':id')
  deleteBarang(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    const status = this.inventories.deleteBarang(id);
    this.logActivity.createUserDeleteLog(user, id);
    return status;
  }
}
