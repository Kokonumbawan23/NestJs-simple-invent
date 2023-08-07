import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BarangDto } from './dto/barang.dto';

@Injectable()
export class BarangService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const inventories = await this.prisma.barang.findMany();
    return {
      msg: 'success',
      data: inventories,
    };
  }

  async findById(id: number) {
    try {
      const inventory = await this.prisma.barang.findFirstOrThrow({
        where: {
          id,
        },
      });

      return {
        msg: 'success',
        data: inventory,
      };
    } catch (error) {
      this.prisma.checkPrismaNotFoundError(error);
    }
  }

  async findByName(name: string) {
    try {
      const inventories = await this.prisma.barang.findMany({
        where: {
          name,
        },
      });

      return {
        msg: 'success',
        data: inventories,
      };
    } catch (error) {
      this.prisma.checkPrismaNotFoundError(error);
    }
  }

  async createBarang(dto: BarangDto) {
    try {
      const createdBarang = await this.prisma.barang.create({
        data: {
          name: dto.name,
          tipeId: dto.tipeId,
        },
      });

      return {
        msg: 'sucess',
        data: createdBarang,
      };
    } catch (error) {
      this.prisma.checkPrismaInvalidIUniqueError(error);
    }
  }

  async updateBarang(dto: BarangDto, id: number) {
    try {
      const updatedBarang = await this.prisma.barang.update({
        where: {
          id,
        },
        data: dto,
      });

      return {
        msg: 'success',
        data: updatedBarang,
      };
    } catch (error) {
      this.prisma.checkPrismaNotFoundError(error);
    }
  }

  async deleteBarang(id: number) {
    try {
      await this.prisma.barang.delete({
        where: {
          id,
        },
      });

      return {
        msg: 'success',
      };
    } catch (error) {
      this.prisma.checkPrismaNotFoundError(error);
    }
  }
}
