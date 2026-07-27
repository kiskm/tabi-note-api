import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateParticipantDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;
}
