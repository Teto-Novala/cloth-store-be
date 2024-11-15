import { IsNotEmpty } from 'class-validator';

export class SignInPage {
  id?: string;

  @IsNotEmpty({ message: 'Gambar tidak boleh kosong' })
  imagePath: string;
}
