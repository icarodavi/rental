import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsers1653732945122 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'username',
            isUnique: true,
            type: 'varchar',
          },
          { name: 'email', type: 'varchar' },
          { name: 'driver_license', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          { name: 'is_admin', type: 'boolean' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
