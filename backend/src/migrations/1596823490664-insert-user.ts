import {MigrationInterface, QueryRunner} from "typeorm";

export class insertUser1596823490664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`INSERT INTO \`people\` (\`id\`, \`name\`, \`phone\`, \`cpf\`, \`createdDate\`, \`modifiedDate\`, \`deletedDate\`, \`email\`) VALUES ('c26666d0-05d7-41f1-9708-c643b30f8665', 'lucas', NULL, NULL, '2020-08-07 18:00:10', '2020-08-07 18:00:10', NULL, 'teste@teste.com');`);

		
		await queryRunner.query(`INSERT INTO \`user\` (\`id\`, \`username\`, \`password\`, \`createdDate\`, \`modifiedDate\`, \`deletedDate\`, \`people_id\`, \`token\`) VALUES ('f9ce9ea1-d352-4306-b1f3-121efbc98ccd', 'teste@teste.com', '$2b$10$cI0bz9i414fWSwyCpGY4Kuc5sykWrylZHAQ6m4tPRlrfqgJ0LWBwC', '2020-08-07 18:00:10', '2020-08-07 18:00:10', NULL, 'c26666d0-05d7-41f1-9708-c643b30f8665', NULL);`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
