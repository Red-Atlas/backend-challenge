import { MigrationInterface, QueryRunner } from "typeorm";

export class Geolocation1734188269681 implements MigrationInterface {
    name = 'Geolocation1734188269681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" ADD "location" geometry(Point,4326) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "location"`);
    }

}
