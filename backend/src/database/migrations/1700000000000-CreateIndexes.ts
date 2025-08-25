import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIndexes1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Índices para la tabla tickets
    await queryRunner.query(`
      CREATE INDEX idx_tickets_created_at ON tickets ("createdAt");
      CREATE INDEX idx_tickets_status ON tickets ("status");
      CREATE INDEX idx_tickets_priority ON tickets ("priority");
      CREATE INDEX idx_tickets_category ON tickets ("category");
      CREATE INDEX idx_tickets_assignee ON tickets ("assigneeId");
      CREATE INDEX idx_tickets_creator ON tickets ("creatorId");
      CREATE INDEX idx_tickets_status_created_at ON tickets ("status", "createdAt");
    `);

    // Índices para la tabla ticket_comments
    await queryRunner.query(`
      CREATE INDEX idx_ticket_comments_ticket ON ticket_comments ("ticketId");
      CREATE INDEX idx_ticket_comments_author ON ticket_comments ("authorId");
      CREATE INDEX idx_ticket_comments_created_at ON ticket_comments ("createdAt");
    `);

    // Índices para la tabla users
    await queryRunner.query(`
      CREATE INDEX idx_users_role ON users ("role");
      CREATE INDEX idx_users_email ON users ("email");
      CREATE INDEX idx_users_is_active ON users ("isActive");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar índices de la tabla tickets
    await queryRunner.query(`
      DROP INDEX idx_tickets_created_at;
      DROP INDEX idx_tickets_status;
      DROP INDEX idx_tickets_priority;
      DROP INDEX idx_tickets_category;
      DROP INDEX idx_tickets_assignee;
      DROP INDEX idx_tickets_creator;
      DROP INDEX idx_tickets_status_created_at;
    `);

    // Eliminar índices de la tabla ticket_comments
    await queryRunner.query(`
      DROP INDEX idx_ticket_comments_ticket;
      DROP INDEX idx_ticket_comments_author;
      DROP INDEX idx_ticket_comments_created_at;
    `);

    // Eliminar índices de la tabla users
    await queryRunner.query(`
      DROP INDEX idx_users_role;
      DROP INDEX idx_users_email;
      DROP INDEX idx_users_is_active;
    `);
  }
}




