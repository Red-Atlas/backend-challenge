import { MigrationInterface, QueryRunner } from "typeorm";

export class GeoLocation1734189910367 implements MigrationInterface {
    name = 'GeoLocation1734189910367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" RENAME COLUMN "location" TO "geoLocation"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" RENAME COLUMN "geoLocation" TO "location"`);
    }

}
