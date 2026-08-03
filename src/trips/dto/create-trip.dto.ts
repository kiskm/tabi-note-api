import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import type { TripStatus } from '../trip.entity';
import { AREAS } from '../constants/areas';

export class CreateTripDto {
  @IsString()
  @MaxLength(100)
  title!: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsIn(AREAS, { each: true })
  area!: string[];

  @IsOptional()
  @IsIn(['want', 'done'])
  status?: TripStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  budget?: number;
}
