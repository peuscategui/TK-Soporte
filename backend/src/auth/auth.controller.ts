import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    console.log('Login attempt:', { email: loginUserDto.email });
    const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) {
      console.log('Login failed: user not found or invalid password');
      throw new UnauthorizedException();
    }
    console.log('Login successful:', { email: loginUserDto.email });
    return this.authService.login(user);
  }
}
