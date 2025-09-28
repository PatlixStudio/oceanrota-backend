import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntity1759099027467 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add username column with a default for existing rows
        await queryRunner.query(`
            ALTER TABLE "users" 
            ADD COLUMN "username" character varying NOT NULL DEFAULT 'unknown_user'
        `);

        // Optional: remove the default if you don’t want new rows to use it
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "username" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }
}
