import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE } from './role.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role: ROLE;
}
