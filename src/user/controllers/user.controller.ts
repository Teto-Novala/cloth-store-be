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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('register')
  register(@Body(new ValidationPipe()) user: User): Observable<User> {
    return this.userService.registerUser(user);
  }
}
