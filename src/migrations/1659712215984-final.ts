import { MigrationInterface, QueryRunner } from "typeorm";

export class final1659712215984 implements MigrationInterface {
    name = 'final1659712215984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "currentJRT" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "currentJRT"`);
    }

}
