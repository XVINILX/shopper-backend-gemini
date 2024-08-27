import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UserIdCheckMiddleware } from 'src/core/middleware/user-id-check.middleware';
import { EnterpriseController } from './controller/pageConfig.controller';
import { CreateEnterpriseHandler } from './domain/command/create-animals.handler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CqrsModule } from '@nestjs/cqrs';
import { PatchEnterpriseHandler } from './domain/command/patch-animals.handler';
import { DeleteEnterpriseHandler } from './domain/command/delete-animals.handler';
import { GetEnterpriseByIdHandler } from './domain/query/find-by-id-enterprise.handler';
import { ListEnterpriseHandler } from './domain/query/list-enterprise.handler';
import { PaginationEnterpriseHandler } from './domain/query/pagination-enterprise.handler';
import { AuthModule } from 'src/core/auth/auth.module';
import { PageConfigService } from './pageConfig.service';
import { PageConfigEntity } from 'src/entities/page-config.entities';

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
    TypeOrmModule.forFeature([PageConfigEntity]),
    CqrsModule,
    AuthModule,
  ],
  controllers: [EnterpriseController],
  providers: [PageConfigService, ...CommandHandler, ...QueryHandler],
  exports: [PageConfigService],
})
export class PageConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes({ path: 'pageConfig/id:id', method: RequestMethod.ALL });
  }
}
