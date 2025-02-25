/**forgot Password with send mail function services
 * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: Forgot Password services
 */
import { QueryTypes } from 'sequelize';
import { DBConnection } from '../../db/db.connection';
import forgotQuery from '../helpers/query';
import query from '../helpers/query';
import { logger } from '../../helpers/utils/index';

export default class PasswordService {
  /**send Mail & OTP Generate
   * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
   * @description: send mail for get OTP
   * @returns: send OTP in mail
   */
  static async forgot<TDetail = any>(
    email: string,
    otpGenerated: string,
    expire_time: Date,
  ): Promise<any> {
    // send response from here
    try {
      const getOtp: any = await DBConnection.executeSampleQuery(
        forgotQuery.forgetQueries.getOtp,
        {
          email: email,
          otpGenerated: otpGenerated,
          expire_time: expire_time,
        },
        QueryTypes.SELECT,
      );
      return getOtp;
    } catch (err) {
      logger.info(err, 'error');
      return null;
    }
  }

  static async email(req: any) {
    try {
      const [users]: any = await DBConnection.executeSampleQuery(
        query.userQueries.get_user_by_mail,
        { email: req.body.email },
      );

      if (!users[0]) {
        return null;
      }
      return true;
    } catch (err) {
      logger.info(err, 'error');
      return null;
    }
  }

  /**send Mail & OTP Generate
   * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
   * @description: send mail for resend OTP
   * @returns: send OTP in mail
   */
  static async resend<TDetail = any>(
    email: string,
    otpGenerated: string,
    expire_time: Date,
  ): Promise<any> {
    // send response from here

    const forgotPaasword: any = await DBConnection.executeSampleQuery(
      forgotQuery.forgetQueries.forgot,
      { email },
      QueryTypes.SELECT,
    );

    if (
      forgotPaasword[0] &&
      forgotPaasword[0].length > 0 &&
      email === forgotPaasword[0][0].email
    ) {
      const getOtp: any = await DBConnection.executeSampleQuery(
        forgotQuery.forgetQueries.resendOtp,
        {
          is_verified: false,
          email: email,
          otpGenerated: otpGenerated,
          expire_time: expire_time,
        },
        QueryTypes.UPDATE,
      );
      return getOtp;
    }
  }

  /**OTP verify function
   * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
   * @description: Get otp from database & match OTP which is user enterd
   * @returns: success msg
   */
  static async verify<TDetail = any>(
    verifyOtp: number,
    email: string,
  ): Promise<any> {
    // send response from here
    const Otp: any = await DBConnection.executeSampleQuery(
      forgotQuery.forgetQueries.Otp,
      {
        verifyOtp,
        email,
      },
      QueryTypes.SELECT,
    );
    logger.info(Otp);
    if (
      Otp[0] &&
      Otp[0].length > 0 &&
      verifyOtp === Otp[0][0].otp &&
      Otp[0][0].expire_time > Date.now() &&
      Otp[0][0].is_verified === false
    ) {
      const Verified: any = await DBConnection.executeSampleQuery(
        forgotQuery.forgetQueries.Verified,
        {
          verifyOtp,
          is_verified: true,
        },
        QueryTypes.UPDATE,
      );
      return Verified;
    }
    return null;
  }
  /**send Mail & send dynamic URL
   * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
   * @description:IF OTP verified than send mail for forgot password with dynamic URL
   * @returns: send dynamic URL in mail
   */
  static async forget<TDetail = any>(
    email: string,
    link: string,
    expire_time: Date,
  ): Promise<any> {
    // send response from here
    const forgotPaasword: any = await DBConnection.executeSampleQuery(
      forgotQuery.forgetQueries.forgot_pass,
      {
        email: email,
      },
      QueryTypes.SELECT,
    );
    const getLink: any = await DBConnection.executeSampleQuery(
      forgotQuery.forgetQueries.InsertLink,
      {
        email: email,
        link: link,
        expire_time: expire_time,
      },
      QueryTypes.INSERT,
    );

    return forgotPaasword;
  }
  /**verifyLink services
   * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
   * @description: Get verifyLink from database & match verifyLink which is user enterd
   * @returns: success msg
   */
  static async verify_link<TDetail = any>(verifyLink: string): Promise<any> {
    // send response from here
    const Link: any = await DBConnection.executeSampleQuery(
      forgotQuery.forgetQueries.getLink,
      {
        verifyLink,
        is_called: false,
      },
      QueryTypes.SELECT,
    );
    if (
      Link[0] &&
      Link[0].length > 0 &&
      verifyLink === Link[0][0].reset_password_url &&
      Link[0][0].expire_time > Date.now()
    ) {
      const Verified: any = await DBConnection.executeSampleQuery(
        forgotQuery.forgetQueries.verify_link,
        {
          verifyLink,
          is_called: true,
        },
        QueryTypes.UPDATE,
      );

      return Verified;
    }
  }
  /** create new password
   * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
   * @description: using mail link user redirect to reset password page & add his new password
   * @returns: new password
   */
  static async newPass<TDetail = any>(
    email: string,
    encryptPassword: string,
  ): Promise<any> {
    try {
      // send response from here

      const newPaasword: any = await DBConnection.executeSampleQuery(
        forgotQuery.forgetQueries.new_pass,
        {
          email: email,
          encryptPassword: encryptPassword,
        },
        QueryTypes.UPDATE,
      );
      return newPaasword;
    } catch (err) {
      logger.info(err, 'error');
      return null;
    }
  }
}
