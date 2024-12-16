import { MigrationInterface, QueryRunner } from "typeorm";

export class MigracionInicial1734313307676 implements MigrationInterface {
    name = 'MigracionInicial1734313307676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "role" "public"."auth_role_enum" NOT NULL DEFAULT '0', "userId" integer, CONSTRAINT "REL_373ead146f110f04dad6084815" UNIQUE ("userId"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "advertisement" ("id" SERIAL NOT NULL, "price" numeric(10,2) NOT NULL, "status" "public"."advertisement_status_enum" NOT NULL, "propertyType" "public"."advertisement_propertytype_enum" NOT NULL, "propertyId" integer, "userId" integer, CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d95bd7a19767dfb8d5ffc6b17c" ON "advertisement" ("price") `);
        await queryRunner.query(`CREATE INDEX "IDX_c39d429bce57c4efdaaf9f2e1a" ON "advertisement" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_8b86ffe284e7adf2b6b3fdf057" ON "advertisement" ("propertyType") `);
        await queryRunner.query(`CREATE TABLE "property" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "area" integer NOT NULL, "ownerName" character varying NOT NULL, "sector" "public"."property_sector_enum" NOT NULL, "coordinates" geometry(Point,4326) NOT NULL, "userId" integer, CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fb48a701ea1ec50abb84a81a74" ON "property" ("area") `);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "price" numeric NOT NULL, "date" date NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, "propertyId" integer, "userId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_820435579b933687266d9f5b07" ON "transaction" ("price") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_314dc064070298a999f0036beba" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_6ec9d86e7c48126869b4c7f22db" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_d90007b39cfcf412e15823bebc1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_e58c3b8c65d0ed30f1ac77260bf" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_e58c3b8c65d0ed30f1ac77260bf"`);
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_d90007b39cfcf412e15823bebc1"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_6ec9d86e7c48126869b4c7f22db"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_314dc064070298a999f0036beba"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "userId"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_820435579b933687266d9f5b07"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb48a701ea1ec50abb84a81a74"`);
        await queryRunner.query(`DROP TABLE "property"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b86ffe284e7adf2b6b3fdf057"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c39d429bce57c4efdaaf9f2e1a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d95bd7a19767dfb8d5ffc6b17c"`);
        await queryRunner.query(`DROP TABLE "advertisement"`);
        await queryRunner.query(`DROP TABLE "auth"`);
    }

}
