import { MigrationInterface, QueryRunner } from "typeorm";

export class albums1658570038317 implements MigrationInterface {
    name = 'albums1658570038317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "albums"`);
    }

}
