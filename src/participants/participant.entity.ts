import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trip } from '../trips/trip.entity';

@Entity('participants')
@Index(['tripId', 'email'], { unique: true })
export class Participant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  email!: string | null;

  @ManyToOne(() => Trip, (trip) => trip.participants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trip_id' })
  trip!: Trip;

  @Column({ name: 'trip_id', type: 'uuid' })
  tripId!: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId!: string | null;
}
