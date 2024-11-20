import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entitity';

@Entity('forgot-password')
export class ForgotEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  userId: UserEntity;

  @Column()
  confirmationCode: string;

  @CreateDateColumn()
  createdAt: Date;
}
