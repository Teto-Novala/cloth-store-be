import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('signin-page')
export class SignInEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  imagePath: string;
}
