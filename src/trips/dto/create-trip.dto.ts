import { IsDateString, IsIn, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import type { TripStatus } from '../trip.entity';

export class CreateTripDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  area?: string;

  @IsOptional()
  @IsIn(['want', 'done'])
  status?: TripStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  budget?: number;
}
