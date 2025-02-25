import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from './sendgrid.constants';

sgMail.setApiKey(SENDGRID_API_KEY);

export default class SendGrid {
  static async sendMail(emailData: sgMail.MailDataRequired): Promise<void> {
    await sgMail.send(emailData);
  }
}
