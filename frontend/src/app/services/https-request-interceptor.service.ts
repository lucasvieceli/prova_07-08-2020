
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    constructor(
        public localSt:LocalStorageService,
    ){}

    
    intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const user = this.localSt.retrieve('user')
        let obj = {}
        if(user){
            obj = {
                headers: req.headers.set('Authorization', 'Bearer ' + user.access_token),
            }
        }
        const dupReq = req.clone(obj);
        return next.handle(dupReq);
    }
}
    