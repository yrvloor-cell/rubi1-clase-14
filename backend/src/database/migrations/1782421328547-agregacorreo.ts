import { MigrationInterface, QueryRunner } from "typeorm";

export class Agregacorreo1782421328547 implements MigrationInterface {
    name = 'Agregacorreo1782421328547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "mail" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mail"`);
    }

}
