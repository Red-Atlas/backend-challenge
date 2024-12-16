import { MigrationInterface, QueryRunner } from "typeorm";

export class BeforeUpdatePasswordDeleted1734285417135 implements MigrationInterface {
    name = 'BeforeUpdatePasswordDeleted1734285417135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
    }

}
