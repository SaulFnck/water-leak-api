import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPhotosToReport1792604383885 implements MigrationInterface {
  name = 'AddPhotosToReport1792604383885';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Limpiamos los reportes de prueba anteriores que no tenían foto
    //await queryRunner.query(`DELETE FROM "WATER_REPORT"`);
    await queryRunner.query(
      `ALTER TABLE "WATER_REPORT" ADD "photoUrl" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "WATER_REPORT" ADD "repairPhotoUrl" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "WATER_REPORT" DROP COLUMN "repairPhotoUrl"`,
    );
    await queryRunner.query(
      `ALTER TABLE "WATER_REPORT" DROP COLUMN "photoUrl"`,
    );
  }
}
