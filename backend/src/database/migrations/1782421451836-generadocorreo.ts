import { MigrationInterface, QueryRunner } from "typeorm";

export class Generadocorreo1782421451836 implements MigrationInterface {
    name = 'Generadocorreo1782421451836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "mail" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mail"`);
    }

}
