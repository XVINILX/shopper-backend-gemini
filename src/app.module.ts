import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { UserModule } from './user/user.modules';
import { AuthModule } from './core/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseModule } from './enterprise/enterprise.modules';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AnimalsModule } from './animals/animals.modules';
import { PageConfigModule } from './pageConfig/pageConfig.modules';

@Module({
  imports: [
    UserModule,
    AuthModule,
    AnimalsModule,
    EnterpriseModule,
    PageConfigModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
