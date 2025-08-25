import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryColumn()
  codigo: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: true })
  serie: string;

  @Column({ nullable: true })
  procesador: string;

  @Column()
  año: number;

  @Column({ nullable: true })
  ram: string;

  @Column({
    type: 'enum',
    enum: ['BAJA', 'ASIGNADO'],
    default: 'ASIGNADO'
  })
  status: 'BAJA' | 'ASIGNADO';
}
