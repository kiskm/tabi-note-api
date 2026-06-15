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

  findAll(userId: string): Promise<Trip[]> {
    return this.tripsRepository.find({
      where: { userId },
      relations: ['spots'],
    });
  }

  async findOne(id: number, userId: string): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({
      where: { id, userId },
      relations: ['spots', 'expenses'],
    });
    if (!trip) throw new NotFoundException(`Trip #${id} not found`);
    return trip;
  }

  create(dto: CreateTripDto, userId: string): Promise<Trip> {
    const trip = this.tripsRepository.create({ ...dto, userId });
    return this.tripsRepository.save(trip);
  }

  async update(id: number, dto: UpdateTripDto, userId: string): Promise<Trip> {
    await this.findOne(id, userId);
    await this.tripsRepository.update(id, dto);
    return this.findOne(id, userId);
  }

  async remove(id: number, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.tripsRepository.delete(id);
  }
}
