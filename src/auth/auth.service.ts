import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (password === 'abc123') {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
