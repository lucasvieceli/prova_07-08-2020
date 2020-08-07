import { EntityRepository, Repository } from "typeorm";
import { People } from "../people.entity";

@EntityRepository(People)
export class PeopleRepository extends Repository<People> {
    
   
}
