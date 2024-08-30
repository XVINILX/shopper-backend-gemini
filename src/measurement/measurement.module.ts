import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CqrsModule } from '@nestjs/cqrs';

import { UserEntity } from 'src/entities/user.entities';

import { PatchUserHandler } from './domain/command/patch-measurement.handler';
import { MeasurementConstroller } from './controller/measurement.controller';
import { MeasurementService } from './services/measurement.service';
import { GeminiService } from './integrations/gemini.service';
import { MeasurementEntity } from 'src/entities/measurement.entities';
import { StorageEntity } from 'src/entities/storage.entities';
import { PaginationUserHandler } from './domain/query/pagination-measurement.handler';

const CommandHandler = [PatchUserHandler];
const QueryHandler = [PaginationUserHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([MeasurementEntity]),
    TypeOrmModule.forFeature([StorageEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    CqrsModule,
  ],
  controllers: [MeasurementConstroller],
  providers: [
    MeasurementService,
    GeminiService,
    ...CommandHandler,
    ...QueryHandler,
  ],
  exports: [
    MeasurementService,
    GeminiService,
    TypeOrmModule.forFeature([MeasurementEntity]),
  ],
})
export class MeasurementModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
