import { Module } from '@nestjs/common';
import { NotizenService } from './notizen.service';
import { NotizenController } from './notizen.controller';
import { Notizen } from './entities/notizen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [NotizenController],
  providers: [NotizenService],
  imports: [TypeOrmModule.forFeature([Notizen])]
})
export class NotizenModule {}
