import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AsyncRequestHandler, wrap } from 'express-promise-wrap';

export default class ApiHelper {
  static wrapHandler(
    handler: AsyncRequestHandler,
    forceNext = false,
  ): RequestHandler {
    return wrap(async (req: Request, res: Response, next: NextFunction) => {
      let nextCalled = false;
      const result = await Promise.resolve(
        handler(req, res, () => {
          nextCalled = true;
          return next();
        }),
      );
      if (nextCalled) return;
      if (forceNext) return next();
      return result;
    }) as RequestHandler;
  }
}
