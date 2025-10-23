import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { ActivitiesModule } from './activities/activities.module';
import { APP_GUARD } from '@nestjs/core';
import { IdentityAuthGuard } from './auth/strategies/identity.strategy';
import { LeadModule } from './lead/lead.module';
import { StageModule } from './stage/stage.module';
import { PipelinesModule } from './pipelines/pipelines.module';
import { LoggerModule } from 'nestjs-pino';
import { OpportunityModule } from './opportunity/opportunity.module';


console.log(process.env.DB_USER);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        DB_USER: Joi.string().required(),
        DB_PWD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        COGNITO_CLIENT_NAME: Joi.string().required(),
        COGNITO_USER_POOL_ID: Joi.string().required(),
        COGNITO_CLIENT_ID: Joi.string().required(),
        COGNITO_CLIENT_SECRET: Joi.string().required(),
        AWS_COGNITO_URL: Joi.string().required(),
        AWS_REGION: Joi.string().required()
      })
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true
          }
        }
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CustomersModule,
    ActivitiesModule,
    LeadModule,
    StageModule,
    PipelinesModule,
    OpportunityModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: IdentityAuthGuard,
    },
    AppService
  ],
})
export class AppModule { }
