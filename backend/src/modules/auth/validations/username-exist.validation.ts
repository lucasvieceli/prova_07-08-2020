import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/entities/repository/user.repository";
import { UserService } from "src/modules/auth/services/user.service";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ name: "usernameExist", async: true })
@Injectable()
export class UsernameExistValidation implements ValidatorConstraintInterface {

    constructor(
        @InjectRepository(UserRepository) public userRepository: UserRepository,
    ){}

    async validate(text: string, args: ValidationArguments) {
        const result = await this.userRepository.findUserLogin(text);

        if(args.constraints[0].exist){
            return (result) ? true : false;
        }else{
            return (!result) ? true : false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        if(args.constraints[0].exist){
            return "Email not found";
        }else{
            return "Email already used";
        }
        
    }

}