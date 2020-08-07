import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductInterface } from './interfaces/product.interface';

@Injectable()
export class ProductService  {
    constructor(
        public http:HttpClient,
    ) {}



    public insert(post: ProductInterface){
        return this.http.post(environment.urlApi + '/product', post)
    }

    public edit(id: string, body: any, params?){
        return this.http.patch(`${environment.urlApi}/product/${id}`, body, {params})
    }

    public getAll(params){
        return this.http.get(environment.urlApi + '/product', {params})
    }

    public get(id: string, params){
        return this.http.get(`${environment.urlApi}/product/${id}`, {params})
    }

    public getReport(){
        return this.http.get(`${environment.urlApi}/product/report`)
    }
    
    public delete(id: string){
        return this.http.delete(`${environment.urlApi}/product/${id}`)
    }

}