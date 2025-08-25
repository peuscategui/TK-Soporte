import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('Intentando validar usuario:', email);
    try {
      const user = await this.usersService.findOneByEmail(email);
      console.log('Usuario encontrado:', JSON.stringify(user, null, 2));
      if (user && user.password === pass) {
        console.log('Contraseña correcta');
        const { password, ...result } = user;
        return result;
      }
      console.log('Validación fallida - contraseña incorrecta');
      return null;
    } catch (error) {
      console.error('Error al validar usuario:', error);
      return null;
    }
  }

  async login(user: any) {
    try {
      console.log('Login - Usuario recibido:', JSON.stringify(user, null, 2));
      
      // Crear un payload simple
      const payload = {
        username: user.email,
        sub: '1',
        role: 'admin'
      };
      
      console.log('Login - Payload:', JSON.stringify(payload, null, 2));
      
      // Generar el token con opciones explícitas
      const token = this.jwtService.sign(payload, {
        secret: 'secretKey',
        expiresIn: '1h'
      });
      
      console.log('Login - Token generado:', token);
      
      // Verificar que el token sea válido
      const decoded = this.jwtService.verify(token, { secret: 'secretKey' });
      console.log('Login - Token verificado:', JSON.stringify(decoded, null, 2));
      
      return {
        access_token: token
      };
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }
}
