import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignIn } from '../models/signin.dto';
import { map, Observable, pipe } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(
    @Body(new ValidationPipe()) data: SignIn,
  ): Observable<{ token: string }> {
    return this.authService
      .signIn(data)
      .pipe(map((jwt: string) => ({ token: jwt })));
  }
}
