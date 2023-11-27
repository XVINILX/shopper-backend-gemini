import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UserIdCheckMiddleware } from 'src/core/middleware/user-id-check.middleware';
import { UserController } from './controller/user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CqrsModule } from '@nestjs/cqrs';

import { UserEntity } from 'src/entities/user.entities';
import { DeleteUserHandler } from './domain/command/delete-user.handler';
import { PatchUserHandler } from './domain/command/patch-user.handler';
import { GetUserByIdHandler } from './domain/query/find-by-id-user.handler';
import { PaginationUserHandler } from './domain/query/pagination-user.handler';
import { AuthModule } from 'src/core/auth/auth.module';

const CommandHandler = [DeleteUserHandler, PatchUserHandler];

const QueryHandler = [GetUserByIdHandler, PaginationUserHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, ...CommandHandler, ...QueryHandler],
  exports: [UserService, TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes({ path: 'user/id:id', method: RequestMethod.ALL });
  }
}
