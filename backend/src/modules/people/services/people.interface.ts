import { People } from "src/entities/people.entity";

export interface InserPeople {
    id?: string,
    name?: string,
    cpf?: string,
    phone?: string,
    email?: string,
    createdDate?: number | Date,
    modifiedDate?: number | Date,
}
