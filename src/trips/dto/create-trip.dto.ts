import { IsDateString, IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import type { TripStatus } from '../trip.entity';

export class CreateTripDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsIn(['want', 'done'])
  status?: TripStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  budget?: number;
}
