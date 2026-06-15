import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('t_users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  @Index({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;
}
