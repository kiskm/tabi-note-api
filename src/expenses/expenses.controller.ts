import { Body, Controller, Delete, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller()
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('trips/:tripId/expenses')
  create(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Body() dto: CreateExpenseDto,
  ) {
    return this.expensesService.create(tripId, dto);
  }

  @Patch('expenses/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(id, dto);
  }

  @Delete('expenses/:id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.remove(id);
  }
}
