import {
  IsEmail,
  IsIn,
  IsMobilePhone,
  IsNotEmpty,
  MinLength,
  Validate,
} from 'class-validator';
import { ROLE } from './role.enum';
import { CustomNotEmpty } from '../decorators/customNotEmpty';

export class User {
  id?: string;
  @MinLength(3, { message: 'Minimal 3 karakter' })
  firstname: string;

  lastname?: string;

  @IsNotEmpty({ message: 'Email tidak boleh kosong!' })
  @IsEmail()
  email: string;

  // @IsNotEmpty({ message: 'Nomor Hp tidak boleh kosong!' })
  @MinLength(11, { message: 'Nomor angka tidak cukup' })
  @IsMobilePhone(
    'id-ID',
    { strictMode: true },
    { message: 'Bukan format nomor Indonesia' },
  )
  @CustomNotEmpty({ message: 'Nomor tidak boleh kosong' })
  phone: string;

  @MinLength(8, { message: 'Minimal 8 karakter' })
  password: string;

  role?: ROLE;
}
