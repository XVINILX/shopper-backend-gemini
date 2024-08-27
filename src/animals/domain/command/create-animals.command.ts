import { CreateEnterpriseDto } from '../dtos/create-enterprise.dto';

export class CreateEnterpriseCommand {
  constructor(public readonly createEnterpriseDto: CreateEnterpriseDto) {}
}
