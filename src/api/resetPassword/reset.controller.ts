/**Reset patient sign-in Password services
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Create ResetPassword controller.
 */
import { Request, Response } from 'express';
import PasswordService from './reset.service';
import bcrypt from 'bcrypt';
import { update_password } from '../helpers/validation/reset.validation';
import successHandler from '../../lang/handlers/success';
import message from '../../lang/message';
import errorHandler from '../../lang/handlers/error';

export default class EmployeeController {
  constructor() {
    this.resetPassword = this.resetPassword.bind(this);
  }
  /**Reset Password services
   * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
   * @description: Create ResetPassword services,first get ols password than match old password & newly added password, if new password same as ols password you get error, old password & new password must be uniqe, encript new password and store in database .
   * @return: updated new Password.
   */
  async resetPassword(req: any, res: Response): Promise<any> {
    try {
      // const oldPassword = req.body.old_password;
      const newPassword = req.body.newPassword;

      // const validate = await update_password.validateAsync(req.body);
      const encryptPassword = await bcrypt.hash(newPassword, 10);

      const result: any = await PasswordService.resetPassword(
        encryptPassword,
        req,
      );

      if (result[1].rowCount > 0) {
        return successHandler(
          res,
          200,
          message.success.getPasswordResetSuccessfully,
        );
      }
      return errorHandler(res, 401, message.error.wrongPasswordError);
    } catch (err) {
      return errorHandler(res, 404, message.error.somethingWentWrongError);
    }
  }
}
