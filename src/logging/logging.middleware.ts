import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req) {
      const { originalUrl, method, params, query, body } = req;

      console.log('Request: ', {
        originalUrl,
        method,
        params,
        query,
        body,
      });

      console.log('Response code: ', res.statusCode);
    }

    next();
  }
}
