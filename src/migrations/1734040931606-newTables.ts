import { MigrationInterface, QueryRunner } from "typeorm";

export class NewTables1734040931606 implements MigrationInterface {
    name = 'NewTables1734040931606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."property_sector_enum" AS ENUM('RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'AGRICULTURAL')`);
        await queryRunner.query(`CREATE TABLE "property" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "sector" "public"."property_sector_enum" NOT NULL, "description" character varying NOT NULL, "size" numeric NOT NULL, "yearBuilt" integer NOT NULL, "amenities" character varying NOT NULL, "images" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."advertisement_propertytype_enum" AS ENUM('APARTMENT', 'HOUSE', 'RETAIL', 'LAND', 'INDUSTRIAL')`);
        await queryRunner.query(`CREATE TYPE "public"."advertisement_status_enum" AS ENUM('FOR_SALE', 'FOR_LEASE')`);
        await queryRunner.query(`CREATE TABLE "advertisement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric NOT NULL, "title" character varying NOT NULL, "propertyType" "public"."advertisement_propertytype_enum" NOT NULL, "status" "public"."advertisement_status_enum" NOT NULL, "description" character varying NOT NULL, "publishedDate" date NOT NULL, "expirationDate" date, "contactInfo" character varying NOT NULL, "negotiable" boolean NOT NULL DEFAULT false, "viewsCount" integer NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "property_id" uuid, CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum" AS ENUM('SALE_PURCHASE', 'LEASE', 'MORTGAGE', 'JUDICIAL_SALE')`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_paymentmethod_enum" AS ENUM('CASH', 'CARD', 'BANK_TRANSFER')`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_status_enum" AS ENUM('IN_VERIFICATION', 'APPROVED', 'REJECTED')`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, "price" numeric NOT NULL, "paymentMethod" "public"."transaction_paymentmethod_enum" NOT NULL, "notes" character varying NOT NULL, "taxAmount" numeric NOT NULL, "status" "public"."transaction_status_enum" NOT NULL DEFAULT 'in_verification', "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "advertisement_id" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_723792fc2012f8a4c47915d1e25" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_f2fbb33c30c9a38d490aa7675eb" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_b4a3d92d5dde30f3ab5c34c5862" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_f3648d3f193aed477c6f51956cc" FOREIGN KEY ("advertisement_id") REFERENCES "advertisement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_f3648d3f193aed477c6f51956cc"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_b4a3d92d5dde30f3ab5c34c5862"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_f2fbb33c30c9a38d490aa7675eb"`);
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_723792fc2012f8a4c47915d1e25"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'USER'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_paymentmethod_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
        await queryRunner.query(`DROP TABLE "advertisement"`);
        await queryRunner.query(`DROP TYPE "public"."advertisement_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."advertisement_propertytype_enum"`);
        await queryRunner.query(`DROP TABLE "property"`);
        await queryRunner.query(`DROP TYPE "public"."property_sector_enum"`);
    }

}
