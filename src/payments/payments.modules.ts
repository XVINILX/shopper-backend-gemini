import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UserIdCheckMiddleware } from 'src/core/middleware/user-id-check.middleware';
import { EnterpriseController } from './controller/animals.controller';
import { CreateEnterpriseHandler } from './domain/command/create-animals.handler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CqrsModule } from '@nestjs/cqrs';
import { PatchEnterpriseHandler } from './domain/command/patch-animals.handler';
import { DeleteEnterpriseHandler } from './domain/command/delete-animals.handler';
import { GetEnterpriseByIdHandler } from './domain/query/find-by-id-enterprise.handler';
import { ListEnterpriseHandler } from './domain/query/list-enterprise.handler';
import { PaginationEnterpriseHandler } from './domain/query/pagination-enterprise.handler';
import { AuthModule } from 'src/core/auth/auth.module';
import { PayemntsService } from './payments.service';
import { PaymentEntity } from 'src/entities/payments.entities';
import { StripeService } from './stripe.service';

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
  imports: [TypeOrmModule.forFeature([PaymentEntity]), CqrsModule, AuthModule],
  controllers: [EnterpriseController],
  providers: [
    PayemntsService,
    StripeService,
    ...CommandHandler,
    ...QueryHandler,
  ],
  exports: [PayemntsService],
})
export class PaymentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes({ path: 'payments/id:id', method: RequestMethod.ALL });
  }
}
