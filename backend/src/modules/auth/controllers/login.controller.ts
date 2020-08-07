import { Body, Controller, Post, Request, Res, BadRequestException } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { PostLogin } from '../forms/login';

  @Controller('auth/login')
export class LoginController {

    constructor(
        public authService: AuthService
    ){}

    @Post()
    async login(
      @Request() req: any, 
      @Body() form: PostLogin, 
    ) {
      const result = await this.authService.validateLogin(form.username, form.password);
      if (!result) {
        throw new BadRequestException('Invalid user');
      }

      return result;
    }
}
