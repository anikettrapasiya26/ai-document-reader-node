import { NextFunction, Request, Response } from 'express';

const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const authenticate = require('./auth/auth.middlewares');
const ValidatePermission = require('./auth/validator.middlewares');

/**
 * @description It plays an essential and key role to add middlewares. All request passes
 *              through the middleware.
 */
export class MiddlewaresLoader {
  /**
   * @static
   * @description Initializing middleware contains eg security, logger, parsing, request, viewing.
   * @memberOf Middlewares
   * @return
   */
  static init(app) {
    console.info('Loading application middlewares');

    // security middlewares
    app.use(cors());
    app.use(helmet());
    app.use(compression());

    // http request middlewares
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: false,
        parameterLimit: 50000,
      }),
    );

    app.use(async (req: Request, res: Response, next: NextFunction) => {
      if (
        !req.originalUrl.includes('/auth/') &&
        !req.originalUrl.includes('/welcome')
      )
        authenticate(req, res, next);
      else next();
    });
    // Extract user info from headers
    app.use(async (req, res, next) => {
      if (
        !req.originalUrl.includes('/auth/') &&
        !req.originalUrl.includes('/welcome')
      )
        ValidatePermission(req, res).then(() => {
          next();
        });
      else next();
    });

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
  }
}
