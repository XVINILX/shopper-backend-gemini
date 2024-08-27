import { UpdateEnterpriseDto } from '../dtos/update-enterprise.dto';

export class PatchEnterpriseCommand {
  constructor(
    public readonly patchEnterpriseDto: UpdateEnterpriseDto,
    public readonly id: string,
  ) {}
}
