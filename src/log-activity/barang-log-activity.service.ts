import { Injectable } from '@nestjs/common';
import { Barang, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogActivityService } from './log-activity.interface.service';

@Injectable()
export class BarangLogActivityService implements LogActivityService {
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
          activity: `${user.email} telah membuka data semua barang`,
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

  async createUserReadByNameLog(user: User, namaBarang: string): Promise<object> {
    try {
      const logData = await this.prisma.logActivity.create({
        data: {
          activity: `${user.email} telah mencari data barang dengan dengan nama ${namaBarang}`,
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
  async createUserReadByIdLog(user: User, idBarang: number): Promise<object> {
    try {
      const logData = await this.prisma.logActivity.create({
        data: {
          activity: `${user.email} telah mencari data barang dengan dengan id ${idBarang}`,
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

  async createUserAddLog(user: User, barang: Barang): Promise<object> {
    try {
      const logData = await this.prisma.logActivity.create({
        data: {
          activity: `${user.email} telah menambahkan barang bernama ${barang.name} dengan id ${barang.id}`,
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
  async createUserUpdateLog(user: User, barang: Barang): Promise<object> {
    try {
      const logData = await this.prisma.logActivity.create({
        data: {
          activity: `${user.email} telah melakukan perubahan pada barang yang memiliki id ${barang.id} yang bernama ${barang.name}`,
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
          activity: `${user.email} telah melakukan menghapus barang yang memiliki id ${id}`,
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
