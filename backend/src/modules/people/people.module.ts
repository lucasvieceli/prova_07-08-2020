import { Module } from '@nestjs/common';
import { PeopleService } from './services/people.service'
import { PeopleRepository } from 'src/entities/repository/people.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PeopleRepository,
        ])
    ],
    controllers: [],
    providers: [
        PeopleService
    ],
    exports:[
        PeopleService
    ]
})
export class PeopleModule {}
