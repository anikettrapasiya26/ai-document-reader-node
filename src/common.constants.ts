import config, { ConfigKey } from './config/config';
import { ContactInfo } from './helpers/mail.helper';

export const APP_MAIN_CONTACT_INFO: ContactInfo = {
  name: config.get<string>(ConfigKey.APP_MAIN_CONTACT_INFO_NAME),
  email: config.get<string>(ConfigKey.APP_MAIN_CONTACT_INFO_EMAIL),
};
