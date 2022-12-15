import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrdersPurchasesHistory1671113037460
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders_purchases_history',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'purchase_date',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'status',
            type: 'json',
          },
          {
            name: 'payment_form',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'json',
          },
          {
            name: 'name_product',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders_purchases_history');
  }
}
