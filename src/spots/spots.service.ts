import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from './spot.entity';
import { CreateSpotDto } from './dto/create-spot.dto';

@Injectable()
export class SpotsService {
  constructor(
    @InjectRepository(Spot)
    private readonly spotsRepository: Repository<Spot>,
  ) {}

  create(tripId: number, dto: CreateSpotDto): Promise<Spot> {
    const spot = this.spotsRepository.create({ ...dto, tripId });
    return this.spotsRepository.save(spot);
  }

  async remove(id: number): Promise<void> {
    const spot = await this.spotsRepository.findOneBy({ id });
    if (!spot) throw new NotFoundException(`Spot #${id} not found`);
    await this.spotsRepository.delete(id);
  }
}
