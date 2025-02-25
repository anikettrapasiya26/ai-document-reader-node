import { Request, Response, NextFunction } from 'express';
import errorHandler from '../../lang/handlers/error';
import message from '../../lang/message';
import { DBConnection } from '../../db/db.connection';
import jwt from 'jsonwebtoken';
import query from '../helpers/query';
import { logger } from '../../helpers/utils/index';

interface id {
  id: number;
}
/**
 * @author aniket.trapasiya <aniket.trapasiya@dataprophets.in>
 * @description authenticate function: get Bearer token in header then authenticate token is valid or not for particular user
 * if valid then we have access for resources or else we don't have authorization
 * @return user details
 */
export async function authenticate(
  req: any,
  res: Response,
  next: NextFunction,
) {
  try {
    let token = req.headers.authorization;
    if (token) {
      let scheme: string;
      [scheme, token] = req.headers.authorization.split(' ');
      if (scheme !== 'Bearer') {
        return errorHandler(res, 403, message.error.invalidAuthorizationSchema);
      }
      if (!token) {
        return errorHandler(res, 403, message.error.invalidAuthorizationToken);
      } else {
        const tokenValidate: any = jwt.verify(token, process.env.API_SECRET);
        // logger.info(tokenValidate);
        if (tokenValidate) {
          const { id } = tokenValidate;
          // logger.info('in', id);
          const [user]: any = await DBConnection.executeSampleQuery(
            query.userQueries.get_user,
            { id },
            'select',
          );
          logger.info(user);
          if (user) req.user = user[0];
        } else
          return errorHandler(
            res,
            401,
            message.error.invalidAuthorizationToken,
          );
      }
    } else return errorHandler(res, 401, message.error.tokenIsRequired);
    next();
  } catch {
    errorHandler(res, 401, message.error.invalidAuthorizationToken);
  }
}
