import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from './spot.entity';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';

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

  async update(id: number, dto: UpdateSpotDto): Promise<Spot> {
    const spot = await this.spotsRepository.findOneBy({ id });
    if (!spot) throw new NotFoundException(`Spot #${id} not found`);
    await this.spotsRepository.update(id, dto);
    return this.spotsRepository.findOneBy({ id }) as Promise<Spot>;
  }

  async toggleChecked(id: number): Promise<Spot> {
    const spot = await this.spotsRepository.findOneBy({ id });
    if (!spot) throw new NotFoundException(`Spot #${id} not found`);
    await this.spotsRepository.update(id, { checked: !spot.checked });
    return this.spotsRepository.findOneBy({ id }) as Promise<Spot>;
  }

  async remove(id: number): Promise<void> {
    const spot = await this.spotsRepository.findOneBy({ id });
    if (!spot) throw new NotFoundException(`Spot #${id} not found`);
    await this.spotsRepository.delete(id);
  }
}
