import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Unique } from 'typeorm';

@Entity()
@Unique(['userId', 'path'])
export class VideoProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', default: 0 })
  duration: number;

  @Column({ type: 'varchar', length: 255 })
  path: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
