export const dev =  {
    auth:{
        secret: 'chavesecretadaporra'
    },
    database:  {
        type: 'mysql',
        host: 'app_db',
        port: 3306,
        username: 'root',
        password: 'test',
        synchronize: false,
        migrationsRun: true,
        database: 'myDb',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
        logging: true,
        logger: 'file',
        autoLoadEntities: true,
        cli: {
            migrationsDir: 'src/migrations',
        }
    },
    email:{
        from: 'from@from.com',
        forgotPassword:{
            title: 'Recuperação de senha'
        }
    },
    pagination:{
        itemsPerPage:30
    }
}

