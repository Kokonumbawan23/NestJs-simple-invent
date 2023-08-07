import { Injectable } from '@nestjs/common';
import { Tipe, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogActivityService } from './log-activity.interface.service';

/**
 * Log Untuk Tipe Barang Activity
 * Log ini digunakan untuk melacak aktivitas user ketika berinteraksi dengan tipe tipe barang inventaris
 * */
@Injectable()
export class TipeBarangLogActivityService implements LogActivityService {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<object> {
    const logs = await this.prisma.logActivity.findMany({});
    return {
      msg: 'success',
      data: logs,
    };
  }

  async createUserReadLog(user: User): Promise<object> {
    try {
      const logData = await this.prisma.logActivity.create({
        data: {
          activity: `${user.email} telah membuka data semua tipe barang`,
          userId: user.id,
        },
      });
      return {
        msg: 'success',
        data: logData,
      };
    } catch (error) {
      this.prisma.checkPrismaInvalidIUniqueError(error);
    }
  }

  async createUserAddLog(user: User, tipeBarang: Tipe): Promise<object> {
    try {
      const logData = await this.prisma.logActivity.create({
        data: {
          activity: `${user.email} telah menambahkan tipebarang bernama ${tipeBarang.name} dengan id ${tipeBarang.id}`,
          userId: user.id,
        },
      });
      return {
        msg: 'success',
        data: logData,
      };
    } catch (error) {
      this.prisma.checkPrismaInvalidIUniqueError(error);
    }
  }
  async createUserUpdateLog(user: User, tipeBarang: Tipe): Promise<object> {
    try {
      const logData = await this.prisma.logActivity.create({
        data: {
          activity: `${user.email} telah melakukan perubahan pada tipe barang yang memiliki id ${tipeBarang.id} menjadi ${tipeBarang.name}`,
          userId: user.id,
        },
      });
      return {
        msg: 'success',
        data: logData,
      };
    } catch (error) {
      this.prisma.checkPrismaInvalidIUniqueError(error);
    }
  }

  async createUserDeleteLog(user: User, id: number): Promise<object> {
    try {
      const logData = await this.prisma.logActivity.create({
        data: {
          activity: `${user.email} telah melakukan menghapus tipe barang yang memiliki id ${id}`,
          userId: user.id,
        },
      });
      return {
        msg: 'success',
        data: logData,
      };
    } catch (error) {
      this.prisma.checkPrismaInvalidIUniqueError(error);
    }
  }

  async deleteLog(id: number): Promise<object> {
    try {
      await this.prisma.logActivity.delete({
        where: {
          id,
        },
      });

      return {
        msg: 'sucess',
      };
    } catch (error) {
      this.prisma.checkPrismaNotFoundError(error);
    }
  }
}
