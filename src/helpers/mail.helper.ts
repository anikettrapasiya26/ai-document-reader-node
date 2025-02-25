import SendGrid from '../integrations/sendgrid/sendgrid';

export type ContactInfo = string | { name?: string; email: string };

export interface IMailFromTemplate {
  from: ContactInfo;
  to: ContactInfo | ContactInfo[];
  subject: string;
  templateId: string;
  dynamicTemplateData?: any;
}

export default class MailHelper {
  static sendFromTemplate(mailData: IMailFromTemplate): Promise<void> {
    return SendGrid.sendMail(mailData);
  }
}
