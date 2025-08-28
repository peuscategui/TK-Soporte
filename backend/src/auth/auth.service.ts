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

  async validateUser(usuario: string, clave: string): Promise<any> {
    console.log('Intentando validar usuario:', usuario);
    try {
      const user = await this.usersService.findOneByEmail(usuario);
      console.log('Usuario encontrado:', JSON.stringify(user, null, 2));
      
      if (!user) {
        console.log('Usuario no encontrado');
        return null;
      }

      // Comparación directa de contraseñas sin bcrypt por ahora
      const isPasswordValid = user.password === clave;
      console.log('¿Contraseña válida?:', isPasswordValid, 'Contraseña proporcionada:', clave, 'Contraseña en BD:', user.password);
      
      if (isPasswordValid) {
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
