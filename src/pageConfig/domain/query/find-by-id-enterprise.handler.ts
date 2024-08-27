import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { GetEnterpriseByIdQuery } from './find-by-id-enterprise.query';

import { PageConfigService } from 'src/pageConfig/pageConfig.service';

@QueryHandler(GetEnterpriseByIdQuery)
export class GetEnterpriseByIdHandler
  implements IQueryHandler<GetEnterpriseByIdQuery>
{
  constructor(private repository: PageConfigService) {}

  async execute(command: GetEnterpriseByIdQuery) {
    try {
      const { id } = command;

      const enteprise = await this.repository.findEnterprise(id);

      return enteprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
