import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByEmail(usuario: string): Promise<User | undefined> {
    console.log('Buscando usuario:', usuario);
    const user = await this.userRepository.findOne({
      where: { email: usuario }, // email está mapeado a la columna 'usuario'
      select: ['id', 'email', 'password', 'role'],
    });
    console.log('Usuario encontrado:', JSON.stringify(user, null, 2));
    return user || undefined;
  }
}


