import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from '../trips/trip.entity';

@Entity('spots')
export class Spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  category: string | null;

  @Column({ type: 'varchar', nullable: true })
  memo: string | null;

  @Column({ type: 'float', nullable: true })
  lat: number | null;

  @Column({ type: 'float', nullable: true })
  lng: number | null;

  @Column({ name: 'image_url', type: 'varchar', nullable: true })
  imageUrl: string | null;

  @ManyToOne(() => Trip, { onDelete: 'CASCADE' })
  trip: Trip;

  @Column({ name: 'trip_id' })
  tripId: number;
}
