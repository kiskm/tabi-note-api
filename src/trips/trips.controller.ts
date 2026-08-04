import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

type AuthedRequest = {
  user: { userId: string; username: string; email: string };
};

@UseGuards(JwtAuthGuard)
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  findAll(@Request() req: { user: { userId: string } }) {
    return this.tripsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: AuthedRequest) {
    return this.tripsService.findOne(
      id,
      req.user.userId,
      req.user.username,
      req.user.email,
    );
  }

  @Post()
  create(@Body() dto: CreateTripDto, @Request() req: AuthedRequest) {
    return this.tripsService.create(
      dto,
      req.user.userId,
      req.user.username,
      req.user.email,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTripDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.tripsService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id') id: string,
    @Request() req: { user: { userId: string } },
  ) {
    return this.tripsService.remove(id, req.user.userId);
  }
}
