import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BarangModule } from './barang/barang.module';
import { TipebarangModule } from './tipebarang/tipebarang.module';
import { LogActivityModule } from './log-activity/log-activity.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BarangModule,
    TipebarangModule,
    LogActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
