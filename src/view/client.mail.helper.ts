/** mail send function
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: send mail using nodemailer
 */
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { forgotConfig } from '../api/forgotPassword/forgot.config';
import { logger } from '../helpers/utils/index';

/** create mail Transporter
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: this a mail transporter for sending mail
 */
const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: forgotConfig.userMail,
    pass: forgotConfig.password,
  },
});
/** send mail function
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: this is send mail function for mail send using ejs template and mail data
 */
const sendMail = async (
  mailData: any,
  fileName: any,
  subject: any,
  otpdata: any,
) => {
  const requiredPath = path.join(__dirname, `..//src/view/${fileName}`);

  const data = await ejs.renderFile(requiredPath, mailData, subject, otpdata);

  const mainOptions = {
    from: forgotConfig.userMail,
    to: mailData.email,
    subject,
    html: data,
  };

  mailTransporter.sendMail(mainOptions, (err: any, info: { response: any }) => {
    if (err) logger.info(err);
    else console.info(`Message sent: ${info.response}`);
  });
};

export default sendMail;
