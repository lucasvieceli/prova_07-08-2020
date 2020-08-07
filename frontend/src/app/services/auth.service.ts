import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import {
    HttpClient,
   } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {LoginInterface} from './interfaces/auth.interface'
import {Router} from "@angular/router";

@Injectable()
export class AuthService  {
    constructor(
        public localSt:LocalStorageService,
        public http:HttpClient,
        public router: Router
    ) {}


    public isAuthenticated(): boolean {
        return this.localSt.retrieve('user');
    }

    public async login(post: LoginInterface){
        try{
            const result = await this.http.post(environment.urlApi + '/auth/login', post).toPromise()
            if(result){
                this.localSt.store('user', result)
                this.router.navigate(['/admin'])
            }
        }catch(e){
            return false;
        }
    }

    public logout(){
        this.localSt.clear('user')
        this.router.navigate(['/auth/login'])
    }
}