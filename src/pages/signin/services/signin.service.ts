import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInEntity } from '../models/signin.entity';
import { Repository } from 'typeorm';
import { from, map, Observable } from 'rxjs';
import { SignInPage } from '../models/create-signin.dto';

@Injectable()
export class SigninService {
  constructor(
    @InjectRepository(SignInEntity)
    private readonly signInRepository: Repository<SignInEntity>,
  ) {}

  uploadImage(fileName: string): Observable<SignInPage> {
    const payload: SignInPage = {
      imagePath: fileName,
    };
    return from(this.signInRepository.save(payload)).pipe(
      map((payload: SignInPage) => {
        return payload;
      }),
    );
  }
}
