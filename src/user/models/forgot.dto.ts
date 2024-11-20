import { IsEmail, IsMobilePhone, IsNotEmpty, MinLength } from 'class-validator';
import { CustomNotEmpty } from '../decorators/customNotEmpty';

export class Forgot {
  @IsNotEmpty({ message: 'Firstname tidak boleh kosong' })
  firstname: string;

  lastname?: string;

  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsEmail()
  email: string;

  @MinLength(13, { message: 'Nomor angka tidak cukup' })
  @IsMobilePhone(
    'id-ID',
    { strictMode: true },
    { message: 'Bukan format nomor Indonesia' },
  )
  @CustomNotEmpty({ message: 'Nomor tidak boleh kosong' })
  phone: string;
}
