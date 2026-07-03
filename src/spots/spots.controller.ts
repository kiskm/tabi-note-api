import { Body, Controller, Delete, HttpCode, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post('trips/:tripId/spots')
  create(
    @Param('tripId') tripId: string,
    @Body() dto: CreateSpotDto,
  ) {
    return this.spotsService.create(tripId, dto);
  }

  @Patch('spots/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSpotDto,
  ) {
    return this.spotsService.update(id, dto);
  }

  @Patch('spots/:id/check')
  toggleChecked(@Param('id', ParseIntPipe) id: number) {
    return this.spotsService.toggleChecked(id);
  }

  @Delete('spots/:id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.spotsService.remove(id);
  }
}
