import { MigrationInterface, QueryRunner } from "typeorm";

export class Elimircorreo1782421385229 implements MigrationInterface {
    name = 'Elimircorreo1782421385229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mail"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "mail" character varying NOT NULL`);
    }

}
