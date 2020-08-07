import { Controller, Query, Post, Body, UseGuards, UploadedFile,  UseInterceptors, Get, Patch, Param, Delete } from '@nestjs/common';
import {ProductPost, ProductPatch} from '../form/product.form'
import { LocalAuthGuardService } from '../../auth/services/localauthguard.service';
import { ProductService } from '../services/product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path'
import { v1 as uuidv1 } from 'uuid';


@Controller('/product')
export class ProductController {

    constructor(
        public productService: ProductService
    ){}

    @UseGuards(LocalAuthGuardService)
    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads', 
            filename: (req, file, cb) => {
                cb(null, `${uuidv1()}${extname(file.originalname)}`)
            }
        })
    }))
    async insert(
      @Body() form: ProductPost, 
      @Query() query,
      @UploadedFile() file 
    ) {
        const {columns, ...paramsQuery} = query;
        form = {...form, ...{image: file.filename}}
        const result = await this.productService.insert(form);

        if(result && columns){
            return this.productService.getOne({'id': result.id}, columns);
        }

        return result;

    }

    @Get()
    async getAll(@Query() query){
        const {columns, ...queryString} = query;
        return await this.productService.getAll(columns,queryString)
    }
    @Get(':id')
    async get(
        @Query() query,
        @Param('id') id
    ){
        const {columns, ...queryString} = query;
        return await  this.productService.getOne({'id': id}, columns);
    }



    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads', 
            filename: (req, file, cb) => {
                cb(null, `${uuidv1()}${extname(file.originalname)}`)
            }
        })
    }))
    @Patch(':id')
    async patch(
        @Body() form: ProductPatch, 
        @Param('id') id,
        @Query() query,
        @UploadedFile() file 
    ){
        if(file){
            form = {...form, ...{image: file.filename}}
        }
        const {columns, ...paramsQuery} = query;
        const result = await this.productService.edit(id, form);

        if(result && columns){
            return this.productService.getOne({id: result.id}, columns);
        }

        return true;
    }

    @Delete(':id')
    async delete( @Param('id') id){
        return this.productService.delete(id);
    }

    
 }
