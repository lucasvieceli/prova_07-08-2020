import { People } from "src/entities/people.entity";

export interface InsertUser {
    id?:string,
    username: string,
    password: string,
    people: People | string,
    createdDate?: number | Date,
    modifiedDate?: number | Date,
}
