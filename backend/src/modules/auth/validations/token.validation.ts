import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "src/entities/repository/user.repository";

@ValidatorConstraint({ name: "tokenExist", async: true })
@Injectable()
export class TokenExistValidation implements ValidatorConstraintInterface {

    constructor(
        @InjectRepository(UserRepository) public userRepository: UserRepository,
    ){}

    async validate(token: string, args: ValidationArguments) {
        const result = await this.userRepository.findOne({token});

        return (result) ? true : false;
    }

    defaultMessage(args: ValidationArguments) {
        return "Token not found";
    }

}