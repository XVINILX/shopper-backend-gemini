import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (typeof req.params.id != 'string') {
      throw new BadRequestException('Id is not a string');
    }

    next();
  }
}
