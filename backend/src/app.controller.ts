import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return 'Backend funcionando correctamente!';
  }

  @Get('health')
  getHealth(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'Backend funcionando sin base de datos'
    };
  }

  @Get('test-db')
  async testDbConnection() {
    try {
      // Obtener todos los usuarios directamente con SQL
      const usuarios = await this.dataSource.query('SELECT * FROM usuarios');
      
      // Obtener estructura de la tabla usuarios
      const estructura = await this.dataSource.query(
        `SELECT column_name, data_type, character_maximum_length 
         FROM information_schema.columns 
         WHERE table_name = 'usuarios'
         ORDER BY ordinal_position`
      );

      return {
        message: 'Consulta exitosa',
        estructura_tabla: estructura,
        usuarios: usuarios
      };
    } catch (error) {
      console.error('Error completo:', error);
      return {
        message: 'Error en la consulta',
        error: error.message
      };
    }
  }

  @Get('hash')
  async getHashedPassword() {
    const password = 'password';
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return {
      password: password,
      hashedPassword: hashedPassword,
      message: 'Copia el hashedPassword y pégalo en la columna "clave" de tu tabla "usuarios".'
    };
  }
}


