import {MigrationInterface, QueryRunner} from "typeorm";

export class createPeople1591396998854 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS \`people\` (
            \`id\` varchar(36) NOT NULL,
            \`name\` varchar(160) DEFAULT NULL,
            \`phone\` varchar(20) DEFAULT NULL,
            \`cpf\` varchar(20) DEFAULT NULL,
            \`createdDate\` timestamp NOT NULL,
            \`modifiedDate\` timestamp NOT NULL,
            \`deletedDate\` timestamp NULL DEFAULT NULL,
            \`email\` varchar(150) DEFAULT NULL,
            PRIMARY KEY (\`id\`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        `);
        await queryRunner.query(`
  CREATE TABLE IF NOT EXISTS \`user\` (
    \`id\` varchar(36) NOT NULL,
    \`username\` varchar(150) NOT NULL,
    \`password\` varchar(60) NOT NULL,
    \`createdDate\` timestamp NOT NULL,
    \`modifiedDate\` timestamp NOT NULL,
    \`deletedDate\` timestamp NULL DEFAULT NULL,
    \`people_id\` varchar(36) NOT NULL,
    \`token\` varchar(60) DEFAULT NULL,
    PRIMARY KEY (\`id\`),
    KEY \`people_id\` (\`people_id\`),
    CONSTRAINT \`user_ibfk_2\` FOREIGN KEY (\`people_id\`) REFERENCES \`people\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.query(`
        DROP TABLE \`user\`;
        DROP TABLE \`people\`;
        `)
    }

}
