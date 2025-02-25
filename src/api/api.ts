import cors from 'cors';
// import path from 'path';
import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
// import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import { ValidationError, DatabaseError } from 'sequelize';
import { ConsoleColor, logColor } from '../helpers/console.overrides';
import SentryHelper from '../helpers/sentry.helper';
import { API_PORT } from './api.constants';
import apiRouter from './api.router';
import forgotRouter from './forgotPassword/forgot.router';
import publicRouter from './public/public.router';
import httpLogger from '../helpers/middlewares/index';
import { logger } from '../helpers/utils/index';

const { Sentry } = SentryHelper;

export class Api {
  private static app = express();

  private static setupApi() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(httpLogger);
    this.app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: false,
        parameterLimit: 50000,
      }),
    );
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.set('view engine', 'ejs');
  }
  static async init(): Promise<void> {
    this.setupApi();
    this.setupCustomMiddlewares();
    // this.setupFileUpload();
    this.setupRoutes();
    this.errorHandling();
    await this.listen();
  }
  // private static setupFileUpload() {
  //   this.app.use(
  //     fileUpload({
  //       useTempFiles: true,
  //       tempFileDir: path.resolve('uploads'),
  //     }),
  //   );
  // }

  private static setupCustomMiddlewares() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next();
    });
  }

  private static errorHandling() {
    this.app.use(Sentry.Handlers.errorHandler());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.info(err);
        if (err instanceof ValidationError) {
          res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            message: err?.errors?.[0]?.message ?? err.message,
          });
          return;
        }
        if (err instanceof DatabaseError) {
          res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            message: err.message,
          });
          return;
        }
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      },
    );
  }

  private static setupRoutes() {
    this.app.use('/public', publicRouter);
    this.app.use('/api/v1', apiRouter);
    this.app.use('/forget', forgotRouter);
  }

  private static async listen() {
    // this is for BE team's reference that execute query is working properly.
    // uncomment below line and you will get result of postgresql in terminal
    // await UsersService.detail(null);
    this.app.listen(API_PORT, () =>
      logColor(
        ConsoleColor.FgBlue,
        `API running at http://localhost:${API_PORT}`,
      ),
    );
  }
}
