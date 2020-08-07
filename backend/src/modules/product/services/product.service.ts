import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { QuerySelect } from '../../../class/query-select';
import { Product } from '../../../entities/product.entity';
import { ProductRepository } from '../../../entities/repository/product.repository';


@Injectable()
export class ProductService { 
    constructor(
        @InjectRepository(ProductRepository) public productRepository: ProductRepository,
        private connection: Connection
    ){}
    columnsFilter = [
        {name: 'id'        , nameEntity: 'p.id'},
        {name: 'name'      , nameEntity: 'p.name'},
        {name: 'minimumStock'   , nameEntity: 'p.minimumStock'},
        {name: 'currentStock'   , nameEntity: 'p.currentStock'},
        {name: 'costPrice'      , nameEntity: 'p.costPrice'},
        {name: 'resalePrice'    , nameEntity: 'p.resalePrice'},
        {name: 'image'          , nameEntity: 'p.image'},
        {name: 'createDate'     , nameEntity: 'p.createDate'},
    ]

    async insert(form){
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const product          = queryRunner.manager.create(Product, form);
            product.createdDate    = new Date();
            product.modifiedDate   = new Date();

            await queryRunner.manager.save(product);
            await queryRunner.commitTransaction();
            return product;
        } catch (err) {
            await queryRunner.rollbackTransaction();

            throw err;
        }finally{
            await queryRunner.release();
        }

    }
    async edit(id: string, {resources, ...form}: any){

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const product = await this.exist(id);

            await queryRunner.manager.update(Product, {id: product.id}, form);

            await queryRunner.commitTransaction();
            return product;

        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }
    async exist(id: string): Promise<Product>{
        const product = await this.productRepository.findOne(id);

        if(!product){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Product not found',
            }, HttpStatus.NOT_FOUND);
        }

        return product;
    }

    async getAll(columns: string, filter?: any){
        const querySelect = new QuerySelect({
            fromEntity: Product,
            fromAlias: 'p',
            columns: this.columnsFilter,
            paginate:{
                page: (filter.page) ? filter.page : 1,
                limit: (filter.limit) ? filter.limit : 30,
            }
        });
        return querySelect.execute({
            columnsQueryString: columns,
            filtersQueryString: filter
        });
    }

    async getOne(filters: any, columns: string){
        const querySelect = new QuerySelect({
            fromEntity  : Product,
            fromAlias   : 'p',
            columns     : this.columnsFilter,
        });
        const query = await querySelect.execute({
            columnsQueryString: columns,
            filtersQueryString: filters
        });

        return query.getOne();
    }

    async delete(id){
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const role: Product    = await this.exist(id);
            const result           = await queryRunner.manager.softDelete(Product, {id})

            await queryRunner.commitTransaction();
            return result;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    async getReport(){
        return this.productRepository.getReport()
    }
}
