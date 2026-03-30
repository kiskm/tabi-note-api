import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import type { ExpenseCategory } from '../expense.entity';

export class CreateExpenseDto {
  @IsIn(['transport', 'hotel', 'food', 'other'])
  category: ExpenseCategory;

  @IsInt()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsString()
  memo?: string;
}
