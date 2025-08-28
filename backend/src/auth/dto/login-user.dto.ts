import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  usuario: string; // Cambiado de email a usuario para coincidir con la BD

  @IsString()
  clave: string; // Cambiado de password a clave para coincidir con la BD
}
