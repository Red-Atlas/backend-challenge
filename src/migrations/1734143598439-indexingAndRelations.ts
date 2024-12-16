import { MigrationInterface, QueryRunner } from "typeorm";

export class IndexingAndRelations1734143598439 implements MigrationInterface {
    name = 'IndexingAndRelations1734143598439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_d95bd7a19767dfb8d5ffc6b17c" ON "advertisement" ("price") `);
        await queryRunner.query(`CREATE INDEX "IDX_c39d429bce57c4efdaaf9f2e1a" ON "advertisement" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_784872887f8ac36773a03f678d" ON "property" ("sector") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb48a701ea1ec50abb84a81a74" ON "property" ("area") `);
        await queryRunner.query(`CREATE INDEX "IDX_820435579b933687266d9f5b07" ON "transaction" ("price") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_820435579b933687266d9f5b07"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb48a701ea1ec50abb84a81a74"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_784872887f8ac36773a03f678d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c39d429bce57c4efdaaf9f2e1a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d95bd7a19767dfb8d5ffc6b17c"`);
    }

}
