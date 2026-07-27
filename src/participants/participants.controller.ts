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
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post('trips/:tripId/participants')
  create(
    @Param('tripId') tripId: string,
    @Body() dto: CreateParticipantDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.participantsService.create(tripId, dto, req.user.userId);
  }

  @Patch('participants/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateParticipantDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.participantsService.update(id, dto, req.user.userId);
  }

  @Delete('participants/:id')
  @HttpCode(204)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { userId: string } },
  ) {
    return this.participantsService.remove(id, req.user.userId);
  }
}
