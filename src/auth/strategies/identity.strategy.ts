import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class IdentityAuthGuard extends AuthGuard('Identity') { };

@Injectable()
export class IdentityStrategy extends PassportStrategy(Strategy, 'Identity') {
  constructor(
    protected readonly configSvc: ConfigService,
    protected readonly userSvc: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: configSvc.get<string>('AWS_COGNITO_URL')! + '/.well-known/jwks.json',
      })
    });
  }

  async validate(payload): Promise<User | null> {
    let { username: sid } = payload;
    if (sid) {
      let user = this.userSvc.findOneBySid(sid);
      return user;
    }
    return null;
  }

}