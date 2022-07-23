import { MigrationInterface, QueryRunner } from "typeorm";

export class artists1658571170545 implements MigrationInterface {
    name = 'artists1658571170545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "artists"`);
    }

}
