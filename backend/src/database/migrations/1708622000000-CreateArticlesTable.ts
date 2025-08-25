import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateArticlesTable1708622000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'article',
        columns: [
          {
            name: 'codigo',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'marca',
            type: 'varchar',
          },
          {
            name: 'modelo',
            type: 'varchar',
          },
          {
            name: 'descripcion',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'serie',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'procesador',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'año',
            type: 'integer',
          },
          {
            name: 'ram',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['BAJA', 'ASIGNADO'],
            default: "'ASIGNADO'",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('article');
  }
}
