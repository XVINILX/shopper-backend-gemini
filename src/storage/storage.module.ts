import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CqrsModule } from '@nestjs/cqrs';

import { UserEntity } from '../entities/user.entities';
import { MeasurementEntity } from '../entities/measurement.entities';

import { StorageController } from './controller/storage.controller';
import { PostMeasurementeHandler } from './domain/command/post-measurement.handler';
import { StorageService } from './services/storage.service';
import { MeasurementService } from 'src/measurement/services/measurement.service';
import { StorageEntity } from 'src/entities/storage.entities';
import { GeminiService } from 'src/measurement/integrations/gemini.service';

const CommandHandler = [PostMeasurementeHandler];
const QueryHandler = [];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([MeasurementEntity]),
    TypeOrmModule.forFeature([StorageEntity]),
    TypeOrmModule.forFeature([UserEntity]),

    CqrsModule,
  ],
  controllers: [StorageController],
  providers: [
    StorageService,
    MeasurementService,
    GeminiService,
    ...CommandHandler,
    ...QueryHandler,
  ],
  exports: [StorageService, TypeOrmModule.forFeature([MeasurementEntity])],
})
export class StorageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
