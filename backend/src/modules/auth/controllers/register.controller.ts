import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuardService } from 'src/modules/auth/services/localauthguard.service';
import { UserService } from 'src/modules/auth/services/user.service';
import { RegisterForm } from '../forms/register';

@Controller('auth/register')
export class RegisterController {


    constructor(
        public userService: UserService
    ){

    }

    @Post()
    public async post(@Body() form: RegisterForm, @Request() req){
        const result =  await this.userService.registerNewUser(form);
        req.user = result
        return result;
    }



    @UseGuards(LocalAuthGuardService)
    @Post('teste')
    public async teste(@Request() req){
        return true;
    }
}
