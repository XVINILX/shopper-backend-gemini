import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';

import { ListEnterpriseQuery } from './list-enterprise.query';

import { AnimalsService } from 'src/animals/animals.service';

@QueryHandler(ListEnterpriseQuery)
export class ListEnterpriseHandler
  implements IQueryHandler<ListEnterpriseQuery>
{
  constructor(private repository: AnimalsService) {}

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
