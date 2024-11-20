import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entitity';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { ForgotEntity } from './models/forgot-password.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ForgotEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [UserService, AuthService, JwtGuard],
  controllers: [UserController, AuthController],
})
export class UserModule {}
