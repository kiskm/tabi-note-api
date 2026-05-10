import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from './trips/trips.module';
import { Trip } from './trips/trip.entity';
import { SpotsModule } from './spots/spots.module';
import { Spot } from './spots/spot.entity';
import { ExpensesModule } from './expenses/expenses.module';
import { Expense } from './expenses/expense.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'tabi_user',
      password: process.env.DB_PASSWORD ?? 'password',
      database: process.env.DB_NAME ?? 'tabi_note',
      entities: [Trip, Spot, Expense],
      synchronize: true,
    }),
    TripsModule,
    SpotsModule,
    ExpensesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
