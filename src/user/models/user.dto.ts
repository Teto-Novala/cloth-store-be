import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ROLE } from './role.enum';

export class User {
  id?: string;
  @MinLength(3, { message: 'Minimal 3 karakter' })
  firstname: string;

  lastname?: string;

  @IsNotEmpty({ message: 'Email tidak boleh kosong!' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Nomor Hp tidak boleh kosong!' })
  @MinLength(11, { message: 'Nomor angka tidak cukup' })
  phone: string;

  @MinLength(8, { message: 'Minimal 8 karakter' })
  password: string;

  role?: ROLE;
}
