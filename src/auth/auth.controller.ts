import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ユーザ登録
  @Post('register')
  register(@Body() dto: RegisterDto): Promise<{ accessToken: string }> {
    return this.authService.register(dto);
  }

  // ログイン
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDTO): Promise<{ accessToken: string }> {
    return this.authService.login(dto);
  }
}
