import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from './participant.entity';
import { Trip } from '../trips/trip.entity';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantsRepository: Repository<Participant>,
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
  ) {}

  async create(
    tripId: string,
    dto: CreateParticipantDto,
    userId: string,
  ): Promise<Participant> {
    const trip = await this.tripsRepository.findOne({
      where: { id: tripId, userId },
    });
    if (!trip) throw new NotFoundException(`Trip #${tripId} not found`);

    if (dto.email) {
      const exists = await this.participantsRepository.findOne({
        where: { tripId, email: dto.email },
      });
      if (exists)
        throw new ConflictException(
          'このメールアドレスの参加者はすでに登録されています',
        );
    }

    const participant = this.participantsRepository.create({
      ...dto,
      tripId,
    });
    return this.participantsRepository.save(participant);
  }

  async update(
    id: number,
    dto: UpdateParticipantDto,
    userId: string,
  ): Promise<Participant> {
    const participant = await this.participantsRepository.findOne({
      where: { id },
      relations: ['trip'],
    });
    if (!participant || participant.trip.userId !== userId) {
      throw new NotFoundException(`Participant #${id} not found`);
    }

    if (dto.email) {
      const exists = await this.participantsRepository.findOne({
        where: { tripId: participant.tripId, email: dto.email },
      });
      if (exists && exists.id !== id)
        throw new ConflictException(
          'このメールアドレスの参加者はすでに登録されています',
        );
    }

    await this.participantsRepository.update(id, dto);
    return this.participantsRepository.findOneBy({ id }) as Promise<Participant>;
  }

  async remove(id: number, userId: string): Promise<void> {
    const participant = await this.participantsRepository.findOne({
      where: { id },
      relations: ['trip'],
    });
    if (!participant || participant.trip.userId !== userId) {
      throw new NotFoundException(`Participant #${id} not found`);
    }
    await this.participantsRepository.delete(id);
  }
}
