import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class IdentityAuthGuard extends AuthGuard('Identity') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [
        context.getHandler(),
        context.getClass()
      ]
    );
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
};

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