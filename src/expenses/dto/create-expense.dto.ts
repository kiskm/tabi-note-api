import { IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import type { ExpenseCategory } from '../expense.entity';

export class CreateExpenseDto {
  @IsIn(['transport', 'hotel', 'food', 'other'])
  category: ExpenseCategory;

  @IsInt()
  @Min(0)
  @Max(9999999)
  amount: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  memo?: string;
}
