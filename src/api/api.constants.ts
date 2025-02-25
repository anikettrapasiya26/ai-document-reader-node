import config, { ConfigKey } from '../config/config';

export const API_PORT = config.get<number>(ConfigKey.PORT) || 8000;
export const API_SECRET = config.get<string>(ConfigKey.API_SECRET);
export const API_TOKEN_VALIDITY = 24 * 60 * 60; // 24h in seconds

// eslint-disable-next-line max-len
export const API_UUID_REGEX = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
);
