import { ROLE } from './role.enum';

export class User {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: ROLE;
}
