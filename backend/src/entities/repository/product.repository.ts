import { EntityRepository, Repository } from "typeorm";
import { Product } from "../product.entity";
import {getConnection} from "typeorm";
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    
   
    getReport(){
        return getConnection()
        .createQueryBuilder()
        .select([
            'SUM(p.resalePrice) - SUM(p.costPrice)  net',
            'count(p.id) totalProducts'
        ])
        .from(Product, "p")
        .getRawOne();
    }
}
