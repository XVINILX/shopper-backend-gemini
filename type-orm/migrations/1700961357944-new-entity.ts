import { MigrationInterface, QueryRunner } from "typeorm";

export class NewEntity1700961357944 implements MigrationInterface {
    name = 'NewEntity1700961357944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterprise_entity" ADD "openingDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "enterprise_entity" ADD "activate" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "enterprise_entity" ADD "especialidades" character varying array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enterprise_entity" DROP COLUMN "especialidades"`);
        await queryRunner.query(`ALTER TABLE "enterprise_entity" DROP COLUMN "activate"`);
        await queryRunner.query(`ALTER TABLE "enterprise_entity" DROP COLUMN "openingDate"`);
    }

}
