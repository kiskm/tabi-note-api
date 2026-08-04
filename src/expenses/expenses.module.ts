import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { Expense } from './expense.entity';
import { Trip } from '../trips/trip.entity';
import { Participant } from '../participants/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Trip, Participant])],
  providers: [ExpensesService],
  controllers: [ExpensesController],
})
export class ExpensesModule {}
