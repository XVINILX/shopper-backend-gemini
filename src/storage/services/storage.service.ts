import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  constructor() {}
  /**
   *
   * @param file - base 64 string of file
   */
  async writesFileIntoRoot(file: string) {}
}
