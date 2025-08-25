import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('tksoporte', { schema: 'public' })
export class Ticket {
  @PrimaryColumn({ name: 'Fecha de Registro', type: 'date' })
  createdAt: Date;

  @Column({ name: 'solicitante', type: 'varchar', length: 120, primary: true })
  solicitante: string;

  @Column({ name: 'solicitud', type: 'varchar', length: 120, nullable: true })
  description: string;

  @Column({ name: 'categoria', type: 'varchar', length: 120, nullable: true })
  category: string;

  @Column({ name: 'agente', type: 'varchar', length: 120, nullable: true })
  agente: string;

  @Column({ name: 'area', type: 'varchar', length: 120, nullable: true })
  area: string;
}


