import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entitity';
import { Repository } from 'typeorm';
import { SignIn } from '../models/signin.dto';
import { from, map, Observable, switchMap } from 'rxjs';
import { User } from '../models/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  validateUser(email: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: { email },
        select: [
          'id',
          'firstname',
          'lastname',
          'email',
          'password',
          'phone',
          'role',
        ],
      }),
    ).pipe(
      switchMap((user: User) => {
        if (user) {
          return from(bcrypt.compare(password, user.password)).pipe(
            map((isValidPassword: boolean) => {
              if (isValidPassword) {
                delete user.password;
                return user;
              } else {
                throw new UnauthorizedException('Invalid Credentials', {
                  cause: new Error(),
                  description: 'Password salah',
                });
              }
            }),
          );
        } else {
          throw new NotFoundException('Not Found', {
            cause: new Error(),
            description: 'User tidak ditemukan',
          });
        }
      }),
    );
  }

  signIn(data: SignIn): Observable<{ user: User; token: string }> {
    const { email, password } = data;
    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        if (user) {
          return from(this.jwtService.signAsync({ user })).pipe(
            map((token: string) => ({ user, token })),
          );
        }
      }),
    );
  }
}
