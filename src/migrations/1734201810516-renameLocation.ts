import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameLocation1734201810516 implements MigrationInterface {
    name = 'RenameLocation1734201810516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" RENAME COLUMN "geoLocation" TO "location"`);
        await queryRunner.query(`ALTER TABLE "property" ALTER COLUMN "location" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" ALTER COLUMN "location" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "property" RENAME COLUMN "location" TO "geoLocation"`);
    }

}
