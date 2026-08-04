import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { Trip } from '../trips/trip.entity';
import { Participant } from '../participants/participant.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expensesRepository: Repository<Expense>,
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
    @InjectRepository(Participant)
    private readonly participantsRepository: Repository<Participant>,
  ) {}

  private async resolveTripParticipants(
    tripId: string,
    participantIds: number[],
  ): Promise<Participant[]> {
    if (participantIds.length === 0) return [];
    const participants = await this.participantsRepository.findBy({
      id: In(participantIds),
      tripId,
    });
    if (participants.length !== new Set(participantIds).size) {
      throw new BadRequestException(
        'この旅行に属さない参加者が指定されています',
      );
    }
    return participants;
  }

  async create(
    tripId: string,
    dto: CreateExpenseDto,
    userId: string,
  ): Promise<Expense> {
    const trip = await this.tripsRepository.findOne({
      where: { id: tripId, userId },
    });
    if (!trip) throw new NotFoundException(`Trip #${tripId} not found`);

    const { splitParticipantIds, paidByParticipantId, ...rest } = dto;
    const splitParticipants = await this.resolveTripParticipants(
      tripId,
      splitParticipantIds,
    );
    if (paidByParticipantId !== undefined) {
      await this.resolveTripParticipants(tripId, [paidByParticipantId]);
    }

    const expense = this.expensesRepository.create({
      ...rest,
      tripId,
      paidByParticipantId: paidByParticipantId ?? null,
      splitParticipants,
    });
    return this.expensesRepository.save(expense);
  }

  async update(
    id: number,
    dto: UpdateExpenseDto,
    userId: string,
  ): Promise<Expense> {
    const expense = await this.expensesRepository.findOne({
      where: { id },
      relations: ['trip'],
    });
    if (!expense || expense.trip.userId !== userId) {
      throw new NotFoundException(`Expense #${id} not found`);
    }

    const { splitParticipantIds, paidByParticipantId, ...rest } = dto;
    if (splitParticipantIds !== undefined) {
      expense.splitParticipants = await this.resolveTripParticipants(
        expense.tripId,
        splitParticipantIds,
      );
    }
    if (paidByParticipantId !== undefined) {
      await this.resolveTripParticipants(expense.tripId, [
        paidByParticipantId,
      ]);
      expense.paidByParticipantId = paidByParticipantId;
    }
    Object.assign(expense, rest);

    return this.expensesRepository.save(expense);
  }

  async remove(id: number, userId: string): Promise<void> {
    const expense = await this.expensesRepository.findOne({
      where: { id },
      relations: ['trip'],
    });
    if (!expense || expense.trip.userId !== userId) {
      throw new NotFoundException(`Expense #${id} not found`);
    }
    await this.expensesRepository.delete(id);
  }
}
