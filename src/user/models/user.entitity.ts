import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE } from './role.enum';
import { ForgotEntity } from './forgot-password.entity';

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

  @Column({ unique: true, name: 'phone' })
  phone: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role: ROLE;
}
