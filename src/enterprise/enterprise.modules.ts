import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UserIdCheckMiddleware } from 'src/core/middleware/user-id-check.middleware';
import { EnterpriseController } from './controller/enterprise.controller';
import { CreateEnterpriseHandler } from './domain/command/create-enteprise.handler';
import { EnterpriseService } from './enterprise.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseEntity } from 'src/entities/enterprise.entities';
import { CqrsModule } from '@nestjs/cqrs';
import { PatchEnterpriseHandler } from './domain/command/patch-enteprise.handler';
import { DeleteEnterpriseHandler } from './domain/command/delete-enteprise.handler';
import { GetEnterpriseByIdHandler } from './domain/query/find-by-id-enterprise.handler';
import { ListEnterpriseHandler } from './domain/query/list-enterprise.handler';
import { PaginationEnterpriseHandler } from './domain/query/pagination-enterprise.handler';
import { AuthModule } from 'src/core/auth/auth.module';

const CommandHandler = [
  CreateEnterpriseHandler,
  DeleteEnterpriseHandler,
  PatchEnterpriseHandler,
  ListEnterpriseHandler,
];

const QueryHandler = [
  GetEnterpriseByIdHandler,
  ListEnterpriseHandler,
  PaginationEnterpriseHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([EnterpriseEntity]),
    CqrsModule,
    AuthModule,
  ],
  controllers: [EnterpriseController],
  providers: [EnterpriseService, ...CommandHandler, ...QueryHandler],
  exports: [EnterpriseService],
})
export class EnterpriseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes({ path: 'enterprise/id:id', method: RequestMethod.ALL });
  }
}
