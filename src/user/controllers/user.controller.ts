import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.dto';
import { Observable } from 'rxjs';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Forgot } from '../models/forgot.dto';
import { Confirm } from '../models/confirm.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UsePipes(
    new ValidationPipe({
      stopAtFirstError: true,
    }),
  )
  @Post('register')
  register(@Body() user: User): Observable<User> {
    return this.userService.registerUser(user);
  }

  @Post('forgot')
  forgotPassword(
    @Body() forgot: Forgot,
  ): Observable<{ id: string; confirmationCode: string }> {
    return this.userService.forgotPassword(forgot);
  }

  @Post('confirm')
  confirmationCode(@Body() confirm: Confirm): Observable<{ message: string }> {
    return this.userService.confirmationCode(confirm);
  }
}
