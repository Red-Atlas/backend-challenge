import { MigrationInterface, QueryRunner } from "typeorm";

export class Changes1734065159895 implements MigrationInterface {
    name = 'Changes1734065159895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" ALTER COLUMN "amenities" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "property" ALTER COLUMN "images" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" ALTER COLUMN "images" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "property" ALTER COLUMN "amenities" SET NOT NULL`);
    }

}
