import { Body, Controller, Delete, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { CreateSpotDto } from './dto/create-spot.dto';

@Controller()
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post('trips/:tripId/spots')
  create(
    @Param('tripId', ParseIntPipe) tripId: number,
    @Body() dto: CreateSpotDto,
  ) {
    return this.spotsService.create(tripId, dto);
  }

  @Delete('spots/:id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.spotsService.remove(id);
  }
}
