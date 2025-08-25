import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  SUPPORT = 'support',
  USER = 'user',
}

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'usuario' })
  email: string;

  @Column({ name: 'clave' })
  password: string;

  @Column({ name: 'permisos' })
  role: string;
}


