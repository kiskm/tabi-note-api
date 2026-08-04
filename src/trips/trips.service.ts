import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './trip.entity';
import { Participant } from '../participants/participant.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
    @InjectRepository(Participant)
    private readonly participantsRepository: Repository<Participant>,
  ) {}

  findAll(userId: string): Promise<Trip[]> {
    return this.tripsRepository.find({
      where: { userId },
      relations: ['spots'],
    });
  }

  async findOne(
    id: string,
    userId: string,
    username: string,
    email: string,
  ): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({
      where: { id, userId },
      relations: [
        'spots',
        'expenses',
        'expenses.paidBy',
        'expenses.splitParticipants',
        'participants',
      ],
    });
    if (!trip) throw new NotFoundException(`Trip #${id} not found`);

    const hasSelf = trip.participants.some((p) => p.userId === userId);
    if (!hasSelf) {
      await this.addSelfAsParticipant(id, userId, username, email);
      return this.findOne(id, userId, username, email);
    }
    return trip;
  }

  private async addSelfAsParticipant(
    tripId: string,
    userId: string,
    username: string,
    email: string,
  ): Promise<void> {
    // 既存のTripで、機能追加前に手動登録された同一メールの参加者がいる場合は
    // 新規作成せずuserIdを紐付ける(メール一意制約違反を避ける)
    const existing = await this.participantsRepository.findOne({
      where: { tripId, email },
    });
    if (existing) {
      await this.participantsRepository.update(existing.id, { userId });
      return;
    }
    const participant = this.participantsRepository.create({
      tripId,
      userId,
      name: username,
      email,
    });
    await this.participantsRepository.save(participant);
  }

  async create(
    dto: CreateTripDto,
    userId: string,
    username: string,
    email: string,
  ): Promise<Trip> {
    const trip = this.tripsRepository.create({ ...dto, userId });
    const saved = await this.tripsRepository.save(trip);
    await this.addSelfAsParticipant(saved.id, userId, username, email);
    return saved;
  }

  private async ensureOwnedTrip(id: string, userId: string): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({
      where: { id, userId },
    });
    if (!trip) throw new NotFoundException(`Trip #${id} not found`);
    return trip;
  }

  async update(id: string, dto: UpdateTripDto, userId: string): Promise<Trip> {
    await this.ensureOwnedTrip(id, userId);
    await this.tripsRepository.update(id, dto);
    return this.ensureOwnedTrip(id, userId);
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.ensureOwnedTrip(id, userId);
    await this.tripsRepository.delete(id);
  }
}
