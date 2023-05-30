import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685436229537 {
    name = ' $npmConfigName1685436229537'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "id_tmdb" integer NOT NULL,
                "movie_title" varchar NOT NULL,
                "year" integer NOT NULL,
                "descr" varchar NOT NULL,
                "poster_img" varchar NOT NULL,
                "long_img" varchar NOT NULL,
                "vote" integer NOT NULL,
                CONSTRAINT "UQ_ab01fdc57c9af3db6ec2b93ef3d" UNIQUE ("id_tmdb")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "firstname" varchar NOT NULL,
                "lastname" varchar NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
