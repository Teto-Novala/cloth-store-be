import { IsNotEmpty } from 'class-validator';

export class Confirm {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  confirmationCode: string;
}
