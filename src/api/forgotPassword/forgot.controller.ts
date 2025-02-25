/**forgot Password with send mail function controller
 * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: Forgot Password function controller
 */
import { Request, Response } from 'express';
import ForgotService from './forgot.service';
import successHandler from '../../lang/handlers/success';
import { forgotConfig } from './forgot.config';
import message from '../../lang/message';
import bcrypt from 'bcrypt';
import errorHandler from '../../lang/handlers/error';
import { sendMailOtp } from './mail';
import sendMail from '../../view/mail.helper';
import generateOTP from './create';
import { new_password } from '../helpers/validation/forgot.validation';
import { logger } from '../../helpers/utils/index';

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}
export default class ForgotController {
  constructor() {
    this.forgot = this.forgot.bind(this);
    this.verification = this.verification.bind(this);
    this.newPassword = this.newPassword.bind(this);
  }
  // forgot Password Request //
  /**send Mail & OTP Generate
   * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
   * @description: send mail for get OTP
   * @returns: send OTP in mail
   */
  async forgot(req: Request, res: Response): Promise<any> {
    const { email } = req.body;
    const otpGenerated = generateOTP();
    const now = new Date();
    const expire_time = AddMinutesToDate(now, 15);

    if (!email) return errorHandler(res, 400, message.error.emailRequiredError);
    const emailValid = await ForgotService.email(req);
    // logger.info(emailValid);
    if (emailValid === null) {
      return errorHandler(res, 400, message.error.notRegisteredError);
    }
    const result = await ForgotService.forgot(email, otpGenerated, expire_time);

    try {
      if (result) {
        await sendMail(
          {
            email,
            otp: otpGenerated,
            mailLink: forgotConfig.mailLink,
            googleLink: forgotConfig.googleFormLink,
          },
          'forget.ejs',
          message.subject.welcomeToAHS,
        );

        return successHandler(res, 200, message.success.sendMail);
      }
      return errorHandler(res, 401, message.error.emailNotFoundError);
      // otherwise we need to create a temporary token that expires in 10 mins
    } catch (err) {
      logger.info(err);
      return errorHandler(res, 404, message.error.somethingWentWrongError);
    }
  }

  async resend(req: Request, res: Response): Promise<any> {
    const { email } = req.body;
    const otpGenerated = generateOTP();
    const now = new Date();
    const expire_time = AddMinutesToDate(now, 15);

    if (!email) return errorHandler(res, 400, message.error.emailRequiredError);
    const result = await ForgotService.resend(email, otpGenerated, expire_time);

    try {
      if (result) {
        await sendMailOtp({
          to: email,
          otp: otpGenerated,
          expire_time,
        });

        return successHandler(res, 200, message.success.resendMail);
      }
      return errorHandler(res, 401, message.error.emailNotFoundError);
      // otherwise we need to create a temporary token that expires in 10 mins
    } catch (err) {
      logger.info(err);
      return errorHandler(res, 404, message.error.somethingWentWrongError);
    }
  }

  // otp verification //
  /**OTP verify function
   * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
   * @description: Get otp from database & match OTP which is user enterd
   * @returns: success msg
   */
  async verification(req: Request, res: Response): Promise<any> {
    const verifyOtp = parseInt(req.body.otp);
    logger.info(verifyOtp);
    const { email } = req.body;
    if (!email) return errorHandler(res, 400, message.error.emailRequiredError);

    if (!verifyOtp) {
      return errorHandler(res, 400, message.error.otpNotFound);
    }

    try {
      if (verifyOtp) {
        const result: any = await ForgotService.verify(verifyOtp, email);

        if (result) {
          return successHandler(
            res,
            200,
            message.success.otpVerifySuccessFully,
          );
        }

        return errorHandler(res, 400, message.error.wrongOtpError);
      }
    } catch (err) {
      return errorHandler(res, 404, message.error.somethingWentWrongError);
    }
  }

  // send mail for Forgot Password //
  /**send Mail & send dynamic URL
   * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
   * @description:IF OTP verified than send mail for forgot password with dynamic URL
   * @returns: send dynamic URL in mail
   */
  async forget(req: Request, res: Response): Promise<any> {
    const { email } = req.body;
    const now = new Date();
    const expire_time = AddMinutesToDate(now, 15);
    const encrypted = await bcrypt.hash(email, 10);

    const BaseURL = forgotConfig.forgetLink;
    const mainURL = `${encrypted}`;

    const link = `${BaseURL}/forgetpassword/${mainURL}`;
    if (!email) {
      return errorHandler(res, 401, message.error.emailRequiredError);
    }

    const result: any = await ForgotService.forget(email, link, expire_time);
    try {
      if (result) {
        await sendMail(
          {
            email,
            link,
            mailLink: forgotConfig.mailLink,
            googleLink: forgotConfig.googleFormLink,
          },
          'forget.ejs',
          message.subject.welcomeToAHS,
        );

        return successHandler(res, 200, message.success.sendMail);
      }

      return errorHandler(res, 402, message.error.emailNotFoundError);
      // otherwise we need to create a temporary token that expires in 10 mins
    } catch (err) {
      return errorHandler(res, 404, message.error.somethingWentWrongError);
    }
  }
  // Link verification //
  /**Link verify function
   * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
   * @description: Get verifylink from database & match Link which is user called
   * @returns: success msg
   */
  async verify(req: Request, res: Response): Promise<any> {
    const verifyLink = req.body.Link;

    if (!verifyLink) {
      return errorHandler(res, 402, message.error.UrlNotFound);
    }

    try {
      if (verifyLink) {
        const result: any = await ForgotService.verify_link(verifyLink);

        if (result) {
          return successHandler(
            res,
            200,
            message.success.LinkVerifySuccessFully,
          );
        }

        return errorHandler(res, 401, message.error.wrongUrlError);
      }
    } catch (err) {
      return errorHandler(res, 404, message.error.somethingWentWrongError);
    }
  }
  // Set Newpassword //
  /** create new password
   * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
   * @description: using mail link user redirect to reset password page & add his new password
   * @returns: new password
   */
  async newPassword(req: Request, res: Response): Promise<any> {
    const { email } = req.body;
    const { newPassword } = req.body;
    const validate = await new_password.validateAsync(req.body);
    const encryptPassword = await bcrypt.hash(newPassword, 10);
    if (!email) return errorHandler(res, 400, message.error.emailRequiredError);
    const emailValid = await ForgotService.email(req);
    // logger.info(emailValid);
    if (emailValid === null) {
      return errorHandler(res, 400, message.error.notRegisteredError);
    }
    if (newPassword) {
      const result = await ForgotService.newPass(email, encryptPassword);
      logger.info(result);
      if (result[1].rowCount > 0) {
        return successHandler(
          res,
          200,
          message.success.getPasswordResetSuccessfully,
        );
      }
      return errorHandler(res, 400, message.error.notRegisteredError);
    }
    return errorHandler(res, 401, message.error.passwordNotFoundError);
  }
}
