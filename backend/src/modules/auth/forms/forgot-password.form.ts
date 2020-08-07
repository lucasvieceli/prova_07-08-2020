import { IsEmail, IsNotEmpty, MinLength, ValidationOptions, Matches, Validate } from 'class-validator';
import { UsernameExistValidation } from '../validations/username-exist.validation';
import { TokenExistValidation } from '../validations/token.validation';
import { PasswordConfirm } from '../validations/passwordConfirm.validation';

export class FormPostUpdate {

    @Validate(TokenExistValidation)
    @IsNotEmpty()
    token: string


    @IsNotEmpty()
    @Validate(PasswordConfirm)
    passwordConfirm: string;

    @IsNotEmpty()
    @MinLength(5)
    password: string;
}

export class FormPost{

    @Validate(UsernameExistValidation, [{exist: true}])
    @IsNotEmpty()
    @IsEmail()
    username: string
}