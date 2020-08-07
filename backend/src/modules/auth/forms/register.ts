import { IsEmail, IsNotEmpty, MaxLength, MinLength, IsOptional, Validate } from 'class-validator';
import { UsernameExistValidation } from '../validations/username-exist.validation';

export class RegisterForm {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(150)
  name: string;

  @MaxLength(20)
  @IsOptional()
  phone: number;

  @IsOptional()
  @MaxLength(20)
  cpf: number;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(150)
  @Validate(UsernameExistValidation, [{exist: false}])
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}