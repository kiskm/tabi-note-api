import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type TripStatus = 'want' | 'done';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date | null;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date | null;

  @Column({ type: 'varchar', nullable: true })
  area: string | null;

  @Column({ type: 'varchar', default: 'want' })
  status: TripStatus;

  @Column({ nullable: true, type: 'int' })
  budget: number | null;
}
