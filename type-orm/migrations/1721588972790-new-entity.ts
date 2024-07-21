import { MigrationInterface, QueryRunner } from "typeorm";

export class NewEntity1721588972790 implements MigrationInterface {
    name = 'NewEntity1721588972790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animals_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "race" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "street" character varying NOT NULL, "zipCode" character varying NOT NULL, "principalPictureUuid" character varying NOT NULL, "listOfPictures" text NOT NULL, "adoptedAt" TIMESTAMP NOT NULL, "birthday" TIMESTAMP NOT NULL, "activate" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "PK_81a748aa0c05d92925f7b989436" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enterprise_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "razaoSocial" character varying NOT NULL, "nomeFantasia" character varying NOT NULL, "cnpj" character varying NOT NULL, "regional" character varying NOT NULL, "openingDate" TIMESTAMP NOT NULL, "activate" boolean NOT NULL DEFAULT true, "especialidades" character varying array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1e56943738df2e702a9c885042c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "animals_entity" ADD CONSTRAINT "FK_cec79c496fb776f8f0fbd19110a" FOREIGN KEY ("companyId") REFERENCES "enterprise_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals_entity" DROP CONSTRAINT "FK_cec79c496fb776f8f0fbd19110a"`);
        await queryRunner.query(`DROP TABLE "enterprise_entity"`);
        await queryRunner.query(`DROP TABLE "animals_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
