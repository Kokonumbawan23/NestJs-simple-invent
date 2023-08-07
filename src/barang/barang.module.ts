import { Module } from '@nestjs/common';
import { BarangController } from './barang.controller';
import { BarangService } from './barang.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogActivityModule } from 'src/log-activity/log-activity.module';

@Module({
  imports: [PrismaModule, LogActivityModule],
  controllers: [BarangController],
  providers: [BarangService],
})
export class BarangModule {}
