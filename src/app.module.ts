import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { UserModule } from './user/user.modules';
import { AuthModule } from './core/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'typeOrm.config';
import { EnterpriseModule } from './enterprise/enterprise.modules';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    EnterpriseModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: ['dist/src/entities/**'],
      migrations: ['dist/type-orm/migrations/*.js'],
      synchronize: true,
    }),
    UserModule,
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule {}
