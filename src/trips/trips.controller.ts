import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  findAll(@Request() req: { user: { userId: string } }) {
    return this.tripsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: { user: { userId: string } }) {
    return this.tripsService.findOne(id, req.user.userId);
  }

  @Post()
  create(@Body() dto: CreateTripDto, @Request() req: { user: { userId: string } }) {
    return this.tripsService.create(dto, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTripDto, @Request() req: { user: { userId: string } }) {
    return this.tripsService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: { user: { userId: string } }) {
    return this.tripsService.remove(id, req.user.userId);
  }
}
