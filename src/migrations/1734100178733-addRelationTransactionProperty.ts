import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationTransactionProperty1734100178733 implements MigrationInterface {
    name = 'AddRelationTransactionProperty1734100178733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_b4a3d92d5dde30f3ab5c34c5862"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_f3648d3f193aed477c6f51956cc"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "property_id" uuid`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_b4a3d92d5dde30f3ab5c34c5862" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_f3648d3f193aed477c6f51956cc" FOREIGN KEY ("advertisement_id") REFERENCES "advertisement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_21a559b0f11e895fbe42fc3cbd8" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_21a559b0f11e895fbe42fc3cbd8"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_f3648d3f193aed477c6f51956cc"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_b4a3d92d5dde30f3ab5c34c5862"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "property_id"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_f3648d3f193aed477c6f51956cc" FOREIGN KEY ("advertisement_id") REFERENCES "advertisement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_b4a3d92d5dde30f3ab5c34c5862" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
