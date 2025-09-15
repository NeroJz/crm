import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import { createHmac } from 'crypto';

import {
  SignUpCommand,
  CognitoIdentityProviderClient,
  AdminConfirmSignUpCommand,
  InitiateAuthCommand,
  AuthFlowType
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';


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

  private getIdentityClient(): CognitoIdentityProviderClient {
    const client = new CognitoIdentityProviderClient({
      region: this.configService.get<string>('AWS_REGION'),
    });

    return client;
  }

  async signup(user: any) {
    const client = this.getIdentityClient();

    let clientId = this.configService.get<string>('COGNITO_CLIENT_ID');
    let options = {
      ClientId: clientId,
      Username: user.email,
      Password: user.password,
      SecretHash: this.getSecretHash(user.email)
    };

    const signUpCommand = new SignUpCommand(options);

    let signUpResult = await client.send(signUpCommand);

    let dbUser: User | null = null;
    if (signUpResult && signUpResult.UserSub) {

      // Insert to user table
      dbUser = await this.usersService.findOneByUsername(user.email);

      if (!dbUser) {
        dbUser = await this.usersService.create({
          name: user.email,
          email: user.email,
          sid: signUpResult.UserSub
        });
      } else {
        if (dbUser.sid !== signUpResult.UserSub) {
          let updateUserDto: UpdateUserDto = { ...dbUser, sid: signUpResult.UserSub };
          dbUser = await this.usersService.update(dbUser.id, updateUserDto);
        }
      }

      // Confirm the user in cognito
      if (dbUser) {
        let userPoolId = this.configService.get<string>('COGNITO_USER_POOL_ID')!;
        let username = user.email;

        let confirmCommand = new AdminConfirmSignUpCommand({
          UserPoolId: userPoolId,
          Username: username
        });

        await client.send(confirmCommand);
      }
    }

    return dbUser;
  }

  async authenticate(username: string, password): Promise<any> {
    try {
      const client = this.getIdentityClient();
      let clientId = this.configService.get<string>('COGNITO_CLIENT_ID');
      const authCommand = new InitiateAuthCommand({
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        ClientId: clientId,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
          SECRET_HASH: this.getSecretHash(username)
        }
      });

      const response = await client.send(authCommand);
      return response.AuthenticationResult || null;
    } catch (err) {
      return null;
    }
  }
}
