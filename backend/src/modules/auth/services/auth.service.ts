import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/entities/repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserRepository) public userRepository: UserRepository,
    ){

    }

    validPassword(password: string, hash : string) {return  bcrypt.compareSync(password, hash)}


    getHashPassword(password: string, saltRounds = 10){
        return bcrypt.hashSync(password, saltRounds )
    } 


    async getNewAccessToken(user){
        return this.jwtService.sign(JSON.parse(JSON.stringify(user)))
    }

    async validateLogin(email: string, password: string){
        const user = await this.userRepository.findUserLogin(email);

        if(!user || !await this.validPassword(password, user.password)){
            // throw new UnauthorizedException();
            return false;
        }
        delete user['password'];
        user['access_token'] = await this.getNewAccessToken(user)
        return user
    }

   
}
