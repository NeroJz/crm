import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import { createHmac } from 'crypto';

import {
  SignUpCommand,
  AdminConfirmSignUpRequest,
  CognitoIdentityProviderClient,
  AdminConfirmSignUpCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
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

  private getSecretHash(email: string) {
    let clientId: string = this.configService.get<string>('COGNITO_CLIENT_ID')!;
    return createHmac('sha256', this.configService.get<string>('COGNITO_CLIENT_SECRET')!)
      .update(`${email}${clientId}`)
      .digest('base64')
  }

  async signup(user: any) {
    const client = new CognitoIdentityProviderClient({
      region: this.configService.get<string>('AWS_REGION'),
    });

    let clientId = this.configService.get<string>('COGNITO_CLIENT_ID');
    let options = {
      ClientId: clientId,
      Username: user.email,
      Password: user.password,
      SecretHash: this.getSecretHash(user.email)
    };

    const signUpCommand = new SignUpCommand(options);

    let signUpResult = await client.send(signUpCommand);

    if (signUpResult && signUpResult.UserSub) {
      let userPoolId = this.configService.get<string>('COGNITO_USER_POOL_ID')!;
      let username = user.email;

      let confirmCommand = new AdminConfirmSignUpCommand({
        UserPoolId: userPoolId,
        Username: username
      });

      await client.send(confirmCommand);
    }

    return { sid: signUpResult.UserSub || null };
  }
}
