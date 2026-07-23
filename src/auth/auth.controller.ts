import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ユーザ登録
  @Post('register')
  register(
    @Body() dto: RegisterDto,
  ): Promise<{ accessToken: string; username: string }> {
    return this.authService.register(dto);
  }

  // ログイン
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() dto: LoginDTO,
  ): Promise<{ accessToken: string; username: string }> {
    return this.authService.login(dto);
  }

  // ログイン中ユーザー情報取得
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(
    @Request() req: { user: { userId: string; email: string; username: string } },
  ): { userId: string; email: string; username: string } {
    return req.user;
  }
}
