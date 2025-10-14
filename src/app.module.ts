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


console.log(process.env.DB_USER);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
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
    PipelinesModule
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
