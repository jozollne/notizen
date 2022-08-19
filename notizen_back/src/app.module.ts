import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotizenModule } from './notizen/notizen.module';
import { Notizen } from './notizen/entities/notizen.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'passwort',
      database: 'notizendb',
      entities: [Notizen],
      synchronize: true,
    }),
    NotizenModule,
  ],
})
export class AppModule {}
