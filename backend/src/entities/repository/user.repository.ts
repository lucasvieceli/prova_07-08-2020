import {EntityRepository, Repository} from "typeorm";
import { User } from "../user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
    public findUserLogin(username: string) {
        return this.createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.username = :username", { username })
        .getOne();
    }
}
