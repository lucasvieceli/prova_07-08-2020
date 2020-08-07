import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../services/product.service';


@Controller('/product/report')
export class ReportController {

    constructor(
        public productService: ProductService
    ){}

    @Get()
    async get(
    ){
       return this.productService.getReport()
    }


   
 }
