import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('trips/:tripId/expenses')
  create(
    @Param('tripId') tripId: string,
    @Body() dto: CreateExpenseDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.expensesService.create(tripId, dto, req.user.userId);
  }

  @Patch('expenses/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExpenseDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.expensesService.update(id, dto, req.user.userId);
  }

  @Delete('expenses/:id')
  @HttpCode(204)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { userId: string } },
  ) {
    return this.expensesService.remove(id, req.user.userId);
  }
}
