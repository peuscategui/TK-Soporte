/*
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const adminUser = await usersService.findOneByEmail('admin@example.com').catch(() => null);

  if (!adminUser) {
    console.log('Creating admin user...');
    // await usersService.create({
    //   email: 'admin@example.com',
    //   password: 'password', // La contraseña se hashea en el servicio
    //   firstName: 'Admin',
    //   lastName: 'User',
    //   role: UserRole.ADMIN,
    // });
    console.log('Admin user created.');
  } else {
    console.log('Admin user already exists.');
  }

  await app.close();
}

bootstrap();
*/
