import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from './trips/trips.module';
import { Trip } from './trips/trip.entity';
import { SpotsModule } from './spots/spots.module';
import { Spot } from './spots/spot.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tabi_user',
      password: 'password',
      database: 'tabi_note',
      entities: [Trip, Spot],
      synchronize: true, // 開発環境のみOK
    }),
    TripsModule,
    SpotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
