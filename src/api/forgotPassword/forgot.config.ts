/** send mail config file
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: mail send using multer, add config in this file.
 */
export const forgotConfig = {
  accessKeyId: String(process.env.S3_ACCESS_KEY_ID),
  secretAccessKey: String(process.env.S3_SECRET_ACCESS_KEY),
  bucketName: String(process.env.AWS_S3_BUCKET),
  Region: String(process.env.S3_REGION),
  folderName: String(process.env.AWS_S3_FOLDER),
  FilesACL: String(process.env.S3_ACL),
  userMail: String(process.env.USER_MAIL),
  password: String(process.env.PASSWORD),
  sid: String(process.env.SID),
  authToken: String(process.env.AUTH_TOKEN),
  twilioMo: String(process.env.TWILIO_MO),
  loginLink: String(process.env.LOGIN_LINK),
  forgetLink: String(process.env.FORGET_LINK),
  mailLink: String(process.env.MAIL_LINK),
  googleFormLink: String(process.env.GOOGLE_FORM_LINK),
};
