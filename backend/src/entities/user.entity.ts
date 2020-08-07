import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { People } from "./people.entity";

@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Generated("uuid")
    id: string;
    
    @Column({length: 150})
    username: string;
    
    @Column({length: 60})
    password: string;
    
    @Column({length: 60})
    token: string;
    
    @CreateDateColumn({type: 'timestamp'})
    createdDate: number;
    
    @UpdateDateColumn({type: 'timestamp'})
    modifiedDate: number;
    
    @DeleteDateColumn({type: 'timestamp'})
    deletedDate: number;

    @OneToOne(type => People)
    @JoinColumn({name: 'people_id'})
    people: People | string;

}
