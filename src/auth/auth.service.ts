import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // ユーザー登録時
  async register(dto: RegisterDto): Promise<{ accessToken: string }> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create(
      dto.username,
      dto.email,
      hashedPassword,
    );
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
    return { accessToken };
  }

  // ログイン時
  async login(dto: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user)
      throw new UnauthorizedException(
        'メールアドレスまたはパスワードが違います',
      );

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch)
      throw new UnauthorizedException(
        'メールアドレスまたはパスワードが違います',
      );

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
    return { accessToken };
  }
}
