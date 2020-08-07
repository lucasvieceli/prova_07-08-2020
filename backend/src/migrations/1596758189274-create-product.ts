import {MigrationInterface, QueryRunner} from "typeorm";

export class createProduct1596758189274 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS \`product\` (
            \`id\` VARCHAR(36) NOT NULL,
            \`name\` VARCHAR(150) NULL DEFAULT NULL,
            \`minimumStock\` INT(11) NULL DEFAULT NULL,
            \`currentStock\` INT(11) NULL DEFAULT NULL,
            \`image\` VARCHAR(50) NULL DEFAULT NULL,
            \`costPrice\` DECIMAL(24,2) NULL DEFAULT NULL,
            \`resalePrice\` VARCHAR(45) NULL DEFAULT NULL,
            \`createdDate\` DATETIME NULL DEFAULT NULL,
            \`modifiedDate\` DATETIME NULL DEFAULT NULL,
            \`deletedDate\` DATETIME NULL DEFAULT NULL,
            PRIMARY KEY (\`id\`))
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.query(`
        DROP TABLE \`product\`;
        `)
    }

}


