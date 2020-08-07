import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';
import { DateZone } from 'src/class/date';
import { UserRepository } from 'src/entities/repository/user.repository';
import { User } from 'src/entities/user.entity';
import { PeopleService } from '../../people/services/people.service';
import { AuthService } from './auth.service';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository) public userRepository: UserRepository,
        public peopleService: PeopleService,
        public authService: AuthService,
    ){}

    async insert(user: any | any){
        const result = await this.userRepository.manager.insert(User, {
            people      : user.people,
            username    : user.username,
            createdDate : DateZone.get(user.createdDate),
            modifiedDate: DateZone.get(user.modifiedDate),
            password    : await this.authService.getHashPassword(user.password)
        });
        if(result.raw.affectedRows){
            return this.userRepository.findOne(result.identifiers[0].id);
        }

        return null;
    }

    async update(values:any, where: any ){
        const result = await this.userRepository.manager.update(User, where, values)
        return result.raw.affectedRows;
    }


    async registerNewUser(body: any){
        const exist = await this.userRepository.findUserLogin(body.email)

        if(exist){
            throw new HttpException('This record already exists', HttpStatus.CONFLICT);
        }

        const people = await this.peopleService.insert(body)
        const params = {
            ...body,
            ...{
                people,
                username: body.email
            }
        }
        let user = await this.insert(params);

        user['access_token'] = await this.authService.getNewAccessToken(user); //ja faz login
        delete user['password'];

        return user;
    }
    
    async forgotPassword(username: string){
        const token = await md5(new Date().getTime().toString()+'tokennewpassword');

        const result = await this.update({token}, {username})
        if(result){
            //enviar email
            return true;
        }

        return false;

    }

    async forgotPasswordUpdate(token: string, newPassword: string): Promise<boolean>{
        const update = {
            token: null,
            password: await this.authService.getHashPassword(newPassword)
        }

        const result = await this.update(update, {token});

        return (result) ? true: false;
    }

}
