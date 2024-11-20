import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entitity';
import { Repository } from 'typeorm';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Forgot } from '../models/forgot.dto';
import { ForgotEntity } from '../models/forgot-password.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ForgotEntity)
    private readonly forgotRepository: Repository<ForgotEntity>,
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
            catchError((error) => {
              if (error.code === '23505') {
                const { detail } = error;
                if (detail.includes('phone')) {
                  throw new BadRequestException('Nomor sudah ada');
                }
                if (detail.includes('email')) {
                  throw new BadRequestException('Email sudah ada');
                }
              }

              throw error;
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

  findByEmail(email: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: { email },
      }),
    ).pipe(
      map((user: User) => {
        if (user) {
          return user;
        } else {
          throw new NotFoundException('User Tidak ditemukan');
        }
      }),
    );
  }

  setConfirmationCode(length: number = 6): string {
    if (length <= 0) {
      throw new BadRequestException('Something bad happened');
    }

    const numbers = '0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return result;
  }

  forgotPassword(
    data: Forgot,
  ): Observable<{ user: User; confirmationCode: string }> {
    try {
      const { email, firstname, lastname, phone } = data;
      return this.findByEmail(email).pipe(
        switchMap((user: User) => {
          if (phone !== user.phone) {
            throw new NotFoundException('Nomor tidak ditemukan');
          }
          if (firstname !== user.firstname) {
            throw new NotFoundException('Firstname tidak ditemukan');
          }
          if (lastname !== user.lastname) {
            throw new NotFoundException('Lastname tidak ditemukan');
          }

          return of(this.setConfirmationCode(6)).pipe(
            switchMap((code: string) => {
              return from(
                this.forgotRepository.save({
                  user: user,
                  confirmationCode: code,
                }),
              ).pipe(
                map(() => {
                  return {
                    user,
                    confirmationCode: code,
                  };
                }),
                catchError((error) => {
                  if (error.code === '23505') {
                    const { detail } = error;
                    if (detail.includes('userId')) {
                      throw new BadRequestException(
                        'Konfirmasi Kode sudah dibuat',
                      );
                    }
                  }
                  throw error;
                }),
              );
            }),
          );
        }),
      );
    } catch (error) {
      throw new BadRequestException('Something bad happen');
    }
  }
}
