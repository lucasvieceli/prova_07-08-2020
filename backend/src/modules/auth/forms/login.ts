import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class PostLogin {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}