import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewEntity1700948813707 implements MigrationInterface {
  name = 'NewEntity1700948813707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "enterprise_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "razaoSocial" character varying NOT NULL, "nomeFantasia" character varying NOT NULL, "cnpj" character varying NOT NULL, "regional" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1e56943738df2e702a9c885042c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(`DROP TABLE "enterprise_entity"`);
  }
}
