import { UserEntity } from './user.entitity';

export class ForgotPassword {
  id?: string;
  user: UserEntity;
  confirmationCode: string;
  createdAt?: Date;
}
