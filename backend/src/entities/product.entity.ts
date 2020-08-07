import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'product'})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    @Generated("uuid")
    id: string;
    
    @Column({length: 150})
    name: string;

    @Column()
    minimumStock: number;

    @Column()
    currentStock: number;

    @Column({length: 36})
    image: string;

    @Column()
    costPrice: number;

    @Column()
    resalePrice: number;
    
    
    @CreateDateColumn({type: 'timestamp'})
    createdDate: number | Date;
    
    @UpdateDateColumn({type: 'timestamp'})
    modifiedDate: number | Date;
    
    @DeleteDateColumn({type: 'timestamp'})
    deletedDate: number | Date;

}
