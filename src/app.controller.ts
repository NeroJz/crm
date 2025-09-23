import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/strategies/local.strategy';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/strategies/jwt.strategy';
import { IdentityAuthGuard, Public } from './auth/strategies/identity.strategy';


export class IdentityUser {
  email: string;
  password: string;
}

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post('auth/signup')
  async signup(@Body() identityUser: IdentityUser) {
    return this.authService.signup(identityUser);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
    // return this.authService.login(req.user);/
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req) {
    return req.logout();
  }

  @UseGuards(IdentityAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
