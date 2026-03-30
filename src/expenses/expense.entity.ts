import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from '../trips/trip.entity';

export type ExpenseCategory = 'transport' | 'hotel' | 'food' | 'other';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  category: ExpenseCategory;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'varchar', nullable: true })
  memo: string | null;

  @ManyToOne(() => Trip, (trip) => trip.expenses, { onDelete: 'CASCADE' })
  trip: Trip;

  @Column({ name: 'trip_id' })
  tripId: number;
}
