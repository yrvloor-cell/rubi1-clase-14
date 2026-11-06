import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAuthDto } from './dto/login-auth.dto';
import { LoginAuthDto } from './dto/register-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerUser(@Body() userObject: RegisterAuthDto) {
    // El registro aún requiere persistencia de usuarios en la base de datos.
    return userObject;
  }

  @Post('/login')
  login(@Body() credenciales: LoginAuthDto) {
    return this.authService.login(credenciales);
  }
}
