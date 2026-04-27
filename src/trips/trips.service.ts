import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
  ) {}

  findAll(): Promise<Trip[]> {
    return this.tripsRepository.find({ relations: ['spots'] });
  }

  async findOne(id: number): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({
      where: { id },
      relations: ['spots', 'expenses'],
    });
    if (!trip) throw new NotFoundException(`Trip #${id} not found`);
    return trip;
  }

  create(dto: CreateTripDto): Promise<Trip> {
    const trip = this.tripsRepository.create(dto);
    return this.tripsRepository.save(trip);
  }

  async update(id: number, dto: UpdateTripDto): Promise<Trip> {
    await this.findOne(id);
    await this.tripsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.tripsRepository.delete(id);
  }
}
