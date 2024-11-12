import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entitity';
import { Repository } from 'typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  registerUser(user: User): Observable<User> {
    try {
      const { firstname, lastname, email, phone, password } = user;
      return this.hashPassword(password).pipe(
        switchMap((hashedPassword: string) => {
          return from(
            this.userRepository.save({
              firstname,
              lastname,
              email,
              phone,
              password: hashedPassword,
            }),
          ).pipe(
            map((user: User) => {
              delete user.password;
              return user;
            }),
          );
        }),
      );
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error.message,
      });
    }
  }
}
