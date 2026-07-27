import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Spot } from '../spots/spot.entity';
import { Expense } from '../expenses/expense.entity';
import { Participant } from '../participants/participant.entity';

export type TripStatus = 'want' | 'done';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate!: Date | null;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate!: Date | null;

  @Column({ type: 'varchar', nullable: true })
  area!: string | null;

  @Column({ type: 'varchar', default: 'want' })
  status!: TripStatus;

  @Column({ nullable: true, type: 'int' })
  budget!: number | null;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @OneToMany(() => Spot, (spot) => spot.trip)
  spots!: Spot[];

  @OneToMany(() => Expense, (expense) => expense.trip)
  expenses!: Expense[];

  @OneToMany(() => Participant, (participant) => participant.trip)
  participants!: Participant[];
}
