import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {DateZone} from '../class/date'

@Entity({name: 'people'})
export class People {
    @PrimaryGeneratedColumn('uuid')
    @Generated("uuid")
    id: number;
    
    @Column({length: 160})
    name: string;
    
    @Column({length: 20})
    phone: string;
    
    @Column({length: 20})
    cpf: string;
    
    @Column({length: 150})
    email: string;
    
    @CreateDateColumn({type: 'timestamp'})
    createdDate: number = DateZone.get();
    
    @UpdateDateColumn({type: 'timestamp'})
    modifiedDate: number = DateZone.get();
    
    @DeleteDateColumn({type: 'timestamp'})
    deletedDate: number;


}
