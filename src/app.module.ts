import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { UserModule } from './user/user.modules';
import { AuthModule } from './core/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { StorageService } from './storage/services/storage.service';
import { StorageController } from './storage/controller/storage.controller';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    UserModule,
    AuthModule,

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

    StorageModule,
  ],

  controllers: [AppController, StorageController],
  providers: [StorageService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
