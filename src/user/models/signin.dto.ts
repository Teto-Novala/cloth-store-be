import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignIn {
  @IsNotEmpty({ message: 'Email belum di isi' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password belum di isi' })
  password: string;
}
