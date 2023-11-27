import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { PaginationEnterpriseQuery } from './pagination-enterprise.query';

@QueryHandler(PaginationEnterpriseQuery)
export class PaginationEnterpriseHandler
  implements IQueryHandler<PaginationEnterpriseQuery>
{
  constructor(private repository: EnterpriseService) {}

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
