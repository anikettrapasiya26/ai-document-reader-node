/**Reset patient sign-in Password services
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Create ResetPassword services.
 */
import { QueryTypes } from 'sequelize';
import { DBConnection } from '../../db/db.connection';
import bcrypt from 'bcrypt';
import resetQueries from '../helpers/query';

export default class PasswordService {
  /**Reset Password services
   * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
   * @description: Create ResetPassword services,first get ols password than match old password & newly added password, if new password same as ols password you get error, old password & new password must be uniqe, encript new password and store in database .
   * @return: updated new Password.
   */
  static async resetPassword<TDetail = any>(
    // oldPassword: string,
    encryptPassword: string,
    req: any,
  ): Promise<any> {
    try {
      // send response from here
      // const old_password: any = await DBConnection.executeSampleQuery(
      //   resetQueries.resetQueries.get_pass,
      //   {
      //     id: req.user.id,
      //   },
      // );

      // if (await bcrypt.compare(oldPassword, old_password[0][0].password)) {
      const updatePassword: any = await DBConnection.executeSampleQuery(
        resetQueries.resetQueries.reset_pass,
        {
          id: req.user.id,
          // oldPassword: oldPassword,
          encryptPassword: encryptPassword,
        },
        QueryTypes.UPDATE,
      );

      return updatePassword;
    } catch (err) {
      return null;
    }
  }
}
