import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from '../../entities/repository/product.repository';
import { ProductController } from './controllers/product.controller';
import { ReportController } from './controllers/report.controller';
import { ProductService } from './services/product.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductRepository,
        ]),
    ],
    controllers: [
        ReportController,
        ProductController, 
    ],
    providers: [
        ProductService
    ],
})
export class ProductModule { }
