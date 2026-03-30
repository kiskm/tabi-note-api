import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expensesRepository: Repository<Expense>,
  ) {}

  create(tripId: number, dto: CreateExpenseDto): Promise<Expense> {
    const expense = this.expensesRepository.create({ ...dto, tripId });
    return this.expensesRepository.save(expense);
  }

  async remove(id: number): Promise<void> {
    const expense = await this.expensesRepository.findOneBy({ id });
    if (!expense) throw new NotFoundException(`Expense #${id} not found`);
    await this.expensesRepository.delete(id);
  }
}
