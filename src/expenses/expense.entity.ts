import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Trip } from '../trips/trip.entity';
import { Participant } from '../participants/participant.entity';

export type ExpenseCategory = 'transport' | 'hotel' | 'food' | 'other';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  category!: ExpenseCategory;

  @Column({ type: 'int' })
  amount!: number;

  @Column({ type: 'varchar', nullable: true })
  memo!: string | null;

  @ManyToOne(() => Trip, (trip) => trip.expenses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trip_id' })
  trip!: Trip;

  @Column({ name: 'trip_id', type: 'uuid' })
  tripId!: string;

  @ManyToOne(() => Participant, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'paid_by_participant_id' })
  paidBy!: Participant | null;

  @Column({ name: 'paid_by_participant_id', type: 'int', nullable: true })
  paidByParticipantId!: number | null;

  @ManyToMany(() => Participant)
  @JoinTable({
    name: 'expense_participants',
    joinColumn: { name: 'expense_id' },
    inverseJoinColumn: { name: 'participant_id' },
  })
  splitParticipants!: Participant[];
}
