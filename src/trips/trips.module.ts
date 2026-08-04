import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { Trip } from './trip.entity';
import { Participant } from '../participants/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Participant])],
  providers: [TripsService],
  controllers: [TripsController],
})
export class TripsModule {}
