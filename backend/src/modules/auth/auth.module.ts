import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configs } from 'src/config/config';
import { UserRepository } from 'src/entities/repository/user.repository';
import { PeopleModule } from '../people/people.module';
import { LoginController } from './controllers/login.controller';
import { RegisterController } from './controllers/register.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategyService } from './services/jwtstrategy.service';
import { LocalAuthGuardService } from './services/localauthguard.service';
import { UserService } from './services/user.service';
import { PasswordConfirm } from './validations/passwordConfirm.validation';
import { TokenExistValidation } from './validations/token.validation';
import { UsernameExistValidation } from './validations/username-exist.validation';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      UserRepository,
    ]),
    JwtModule.register({
      secret: configs.auth.secret,
      signOptions: { expiresIn: 0 },
    }),
    PassportModule,
    PeopleModule,
  ],
  controllers: [
    LoginController, 
    RegisterController,
  ],
  providers:[
    AuthService,
    LocalAuthGuardService, 
    JwtStrategyService, 
    UserService,
    UsernameExistValidation,
    TokenExistValidation,
    PasswordConfirm,
  ],
  exports:[
    AuthService,
    UserService,
    UsernameExistValidation,
    PassportModule,
    TokenExistValidation,
    PasswordConfirm,
  ]
})
export class AuthModule {}
