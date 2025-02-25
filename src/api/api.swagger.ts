import { RequestHandler } from 'express';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

const swaggerDocPath = path.resolve(__dirname, '../src/api/api.swagger.json');
const swaggerDoc = JSON.parse(
  fs.readFileSync(swaggerDocPath, { encoding: 'utf-8' }),
);

export default class Swagger {
  static getMiddlewares(): RequestHandler[] {
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  }
}
