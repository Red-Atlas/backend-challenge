import { MigrationInterface, QueryRunner } from "typeorm";

export class AddArea1734105685693 implements MigrationInterface {
    name = 'AddArea1734105685693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" RENAME COLUMN "size" TO "area"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" RENAME COLUMN "area" TO "size"`);
    }

}
