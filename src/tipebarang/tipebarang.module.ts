import { Module } from '@nestjs/common';
import { TipebarangController } from './tipebarang.controller';
import { TipebarangService } from './tipebarang.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogActivityModule } from 'src/log-activity/log-activity.module';

@Module({
  imports: [PrismaModule, LogActivityModule],
  controllers: [TipebarangController],
  providers: [TipebarangService],
})
export class TipebarangModule {}
