import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginationEnterpriseQuery } from './pagination-enterprise.query';

import { PageConfigService } from 'src/pageConfig/pageConfig.service';

@QueryHandler(PaginationEnterpriseQuery)
export class PaginationEnterpriseHandler
  implements IQueryHandler<PaginationEnterpriseQuery>
{
  constructor(private repository: PageConfigService) {}

  async execute(command: PaginationEnterpriseQuery) {
    try {
      const { search, items, page } = command;
      const enteprise = await this.repository.listEnterprise(
        search,
        items,
        page,
      );

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
