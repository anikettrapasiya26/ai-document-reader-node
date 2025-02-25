import config, { ConfigKey } from '../../config/config';

export const SENDGRID_API_KEY = config.get<string>(ConfigKey.SENDGRID_API_KEY);

export const SENDGRID_TEMPLATE_IDS = {
  RESET_PASSWORD: config.get<string>(
    ConfigKey.SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
  ),
};
