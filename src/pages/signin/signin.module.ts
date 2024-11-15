import { Module } from '@nestjs/common';
import { SigninService } from './services/signin.service';
import { SigninController } from './controllers/signin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignInEntity } from './models/signin.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([SignInEntity])
  ],
  providers: [SigninService],
  controllers: [SigninController]
})
export class SigninModule {}
