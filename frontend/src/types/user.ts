export enum UserRole {
  ADMIN = 'admin',
  SUPPORT = 'support',
  USER = 'user',
}

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
  preferences?: Record<string, any>;
}

export interface UpdateUserDto extends Partial<Omit<CreateUserDto, 'password'>> {}


