import config, { ConfigKey } from '../config/config';

export const DB_SAMPLE_URL = config.get<string>(ConfigKey.DB_SAMPLE_URL);
