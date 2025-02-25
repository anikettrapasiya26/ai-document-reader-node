import { Request, Response } from 'express';
import successHandler from '../../lang/handlers/success';

const welcome = () => {
  return;
};

/**welcome to AHS
 * @auther JD9898<jaydeep.malaviya@dataprophets.in>
 * @description:Welcome to Advance health care system.
 *
 */

export default class publicController {
  static async welcome(req: Request, res: Response): Promise<any> {
    welcome();
    return successHandler(
      res,
      200,
      `Welcome to the ${process.env.APP_NAME}, running on port ${process.env.PORT}!`,
    );
  }
}
