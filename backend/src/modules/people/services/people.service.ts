import { Injectable } from '@nestjs/common';
import { PeopleRepository } from 'src/entities/repository/people.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from 'src/entities/people.entity';
import { DateZone } from 'src/class/date';
import { InserPeople } from './people.interface';

@Injectable()
export class PeopleService {

    constructor(
        @InjectRepository(PeopleRepository) public peopleRepository: PeopleRepository,
    ){}

    async insert(body: InserPeople | any){
        const result = await this.peopleRepository.manager.insert(People, {
            name        : body.name,
            phone       : body.phone,
            email       : body.email,
            cpf         : body.cpf,
            createdDate : DateZone.get(body.createdDate),
            modifiedDate: DateZone.get(body.modifiedDate),
        });
        if(result.raw.affectedRows){
            return result.generatedMaps[0];
        }

        return null;
    }
}
