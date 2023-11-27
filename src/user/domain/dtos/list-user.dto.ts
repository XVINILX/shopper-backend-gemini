import { ReadUserDto } from './read-user.dto';

/**
 * Reads All values according to the searching
 */
export class ListUserDto {
  data: ReadUserDto[];
  total: number;
}
