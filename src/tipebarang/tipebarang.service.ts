import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TipeDto } from './dto/tipe.dto';

@Injectable()
export class TipebarangService {
  constructor(private prisma: PrismaService) {}

  async findAllTipe() {
    const types = await this.prisma.tipe.findMany({});
    return {
      msg: 'success',
      data: types,
    };
  }

  async createTipeBarang(dto: TipeDto) {
    try {
      const tipe = await this.prisma.tipe.create({
        data: {
          name: dto.name,
          total: 0,
        },
      });

      return {
        msg: 'success',
        data: tipe,
      };
    } catch (error) {
      this.prisma.checkPrismaInvalidIUniqueError(error);
    }
  }

  async updateTipe(id: number, dto: TipeDto) {
    try {
      const updatedTipe = await this.prisma.tipe.update({
        where: {
          id,
        },
        data: dto,
      });

      return {
        msg: 'success',
        data: updatedTipe,
      };
    } catch (error) {
      this.prisma.checkPrismaNotFoundError(error);
    }
  }

  async deleteTipe(id: number) {
    try {
      await this.prisma.$transaction([
        this.prisma.barang.deleteMany({
          where: {
            tipeId: id,
          },
        }),
        this.prisma.tipe.delete({
          where: {
            id: id,
          },
        }),
      ]);

      return {
        msg: 'success',
      };
    } catch (error) {
      this.prisma.checkPrismaNotFoundError(error);
    }
  }
}
