import { Controller, Post, Body } from '@nestjs/common';
import { FormPost, FormPostUpdate } from '../forms/forgot-password.form';
import { UserService } from '../services/user.service';

@Controller('/auth/forgot-password')
export class ForgotPasswordController {

    constructor(
        public userService: UserService
    ){

    }
    
    @Post()
    async post(@Body() form: FormPost){
        try{
            await this.userService.forgotPassword(form.username);
            return true;

        }catch(e){
            console.log(e)
        }
    }

    @Post('/update')
    async postUpdate(@Body() form: FormPostUpdate){
        try{
            return this.userService.forgotPasswordUpdate(form.token, form.password);
        }catch(e){
            console.log(e);
        }
    }

}
    