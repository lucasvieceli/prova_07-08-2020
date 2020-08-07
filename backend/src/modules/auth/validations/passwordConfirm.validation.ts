import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "passwordConfirm", async: true })
@Injectable()
export class PasswordConfirm implements ValidatorConstraintInterface {

    constructor(
    ){}

    async validate(text: string, args: ValidationArguments) {
        return text == args.object['password'];
    }

    defaultMessage(args: ValidationArguments) {
        return "Password not equals password confirm";
    }

}