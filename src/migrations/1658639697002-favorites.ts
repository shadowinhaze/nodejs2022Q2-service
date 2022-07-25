import { MigrationInterface, QueryRunner } from "typeorm";

export class favorites1658639697002 implements MigrationInterface {
    name = 'favorites1658639697002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artists" text array NOT NULL DEFAULT '{}', "albums" text array NOT NULL DEFAULT '{}', "tracks" text array NOT NULL DEFAULT '{}', CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "favorites"`);
    }

}
