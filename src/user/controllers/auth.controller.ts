import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignIn } from '../models/signin.dto';
import { map, Observable, pipe } from 'rxjs';
import { User } from '../models/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(
    @Body(new ValidationPipe()) data: SignIn,
  ): Observable<{ user: User; token: string }> {
    return this.authService.signIn(data);
  }
}
