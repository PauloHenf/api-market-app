import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddTagIdToTagsProducts1671106046972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tags_products',
      new TableColumn({
        name: 'tags_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'tags_products',
      new TableForeignKey({
        name: 'TagsProductsTag',
        columnNames: ['tags_id'],
        referencedTableName: 'tags',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tags_products', 'TagsProductsTag');
    await queryRunner.dropColumn('tags_products', 'tags_id');
  }
}
