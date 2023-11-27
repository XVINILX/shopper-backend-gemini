import {
  CommandHandler,
  ICommandHandler,
  IQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { ListEnterpriseQuery } from './list-enterprise.query';
import { setEngine } from 'crypto';

@QueryHandler(ListEnterpriseQuery)
export class ListEnterpriseHandler
  implements IQueryHandler<ListEnterpriseQuery>
{
  constructor(private repository: EnterpriseService) {}

  async execute(command: ListEnterpriseQuery) {
    try {
      const { search } = command;

      const enteprise = await this.repository.listEnterprise(search);

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
