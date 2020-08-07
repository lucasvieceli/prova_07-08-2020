import { getConnection, SelectQueryBuilder } from 'typeorm';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';
import { configs } from 'src/config/config';

interface RequireColumn{
    column: string | any,
    alias: string,
    inner: boolean,
    where?: string
}

interface ColumnQuery {
    name: string //nome visivel na urlex: user.name
    nameEntity: string//name na entidade ex: user.name
    require?: RequireColumn[]
}

interface GetQueryParams {
    
    columnsQueryString:string,
    filtersQueryString?: any
}

interface InitParams{
    fromEntity: any,
    fromAlias: string,
    columns :ColumnQuery[],
    paginate?:IPaginationOptions | any
}


export class QuerySelect {
    operator = {
        '>': '>',
        '<': '>',
        '>=': '>=',
        '<=': '>=',
        'LIKE': 'LIKE',
        '!': '<>',
        '=': '=',
        'in': 'in',
    }
    private joins = {};
    private columnsQuery: string[];

    query       : SelectQueryBuilder<any>
    fromEntity  : any;
    fromAlias   : string;
    columns     : ColumnQuery[];
    paginate    : IPaginationOptions

    filtersQueryString: any


    constructor(params: InitParams){
        this.query          = getConnection().createQueryBuilder();
        this.fromEntity     = params.fromEntity;
        this.fromAlias      = params.fromAlias;
        this.columns        = params.columns;
        this.paginate       = params.paginate;
        if(this.paginate){
            this.paginate.limit = (params.paginate.limit) ? params.paginate.limit : configs.pagination.itemsPerPage;
        }
    }
    

    async execute(params: GetQueryParams): Promise<any> {
        this.columnsQuery       = this.getColumnsFromQueryString(params.columnsQueryString);
        this.filtersQueryString = params.filtersQueryString
        
        await Promise.all([
            this.setSelect(),
            this.setFrom(),
            this.setWhere(),
            this.setJoin(),
        ]);

        this.query.orderBy("createdDate", "DESC")

        if(this.paginate){
            return paginate(this.query, this.paginate)
        }else{
            return this.query;
        }
    }

    getColumnsFromQueryString(columnsQueryString: string): string[]{
        const columns = columnsQueryString.split(',');
        return columns.map(c => c.trim());
    }

    async setFrom(){
        this.query.from(this.fromEntity, this.fromAlias)
        return this.query;
    }

    private setOperator(value: any, column: ColumnQuery){
        let operator = this.operator['='];
        for(let op of Object.keys(this.operator)) {
            
            const pos = value.indexOf(op);
            if(pos != -1){

                operator = this.operator[op];
                let newValue = value.substr(op.length);

                switch(op){
                    case 'LIKE':
                        newValue = `%${newValue}%`;
                        break;
                }
                this.query.andWhere(`${column.nameEntity} ${operator} :${column.nameEntity}`, {[column.nameEntity]: newValue})

                return true;
            }
        }
        this.query.andWhere(`${column.nameEntity} ${operator} :${column.nameEntity}`, {[column.nameEntity]: value})
    }

    async setWhere(){
        if(!this.filtersQueryString){
            return this.query
        }
        for(let c of Object.keys(this.filtersQueryString)){
            const exist = this.columns.find(column => column.name == c);
            const value: string = this.filtersQueryString[c];
            if(exist){
                this.setOperator(value, exist)
                this.addJoin(exist)
            }
        }

        return this.query;
    }

    async setSelect(){
        const columnsArray = [`${this.fromAlias}.id`];
        this.columnsQuery.map(c =>  {
            const exist = this.columns.find(column => column.name == c);
            if(exist){
                columnsArray.push(exist.nameEntity);
            }
        });

        this.query.select(columnsArray)
        return this.query;
    }


    private addJoin(column: ColumnQuery){
        if(!column.require || !column.require.length){
            return false;
        }
        column.require.map(r => {
            if(!this.joins.hasOwnProperty(r.alias)){
                this.joins[r.alias] = r;
            }
        })
    }

    async setJoin(){

        this.columnsQuery.map(c => {
            const exist = this.columns.find(column => column.name == c);

            if(exist){
                this.addJoin(exist)
            }
        })

        if(Object.keys(this.joins).length){
            Object.keys(this.joins).map(key => {
                const obj: RequireColumn = this.joins[key] ;
                const func  = (obj.inner) ? 'innerJoin' : 'leftJoin';
                this.query[func](obj.column, obj.alias, obj.where)
            })
        }
        return this.query;
    }
}
