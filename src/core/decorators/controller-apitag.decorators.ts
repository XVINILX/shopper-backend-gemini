import { Controller, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

/**
 *
 * @param path url Path
 * @param apitag apiTag for swagger doc
 * @returns
 */
export const ControllerApp = (path: string, apitag: string) => {
  return applyDecorators(Controller(path), ApiTags(apitag));
};
