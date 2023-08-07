import { Module } from '@nestjs/common';
import { BarangLogActivityService } from './barang-log-activity.service';
import { TipeBarangLogActivityService } from './tipe-barang-log-activity.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [BarangLogActivityService, TipeBarangLogActivityService],
  providers: [BarangLogActivityService, TipeBarangLogActivityService],
})
export class LogActivityModule {}
