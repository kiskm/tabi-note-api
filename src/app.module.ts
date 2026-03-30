import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tabi_user',
      password: 'password',
      database: 'tabi_note',
      entities: [],
      synchronize: true, // 開発環境のみOK
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
