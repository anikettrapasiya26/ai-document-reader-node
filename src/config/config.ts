import dotenv from 'dotenv';

dotenv.config();

export enum ConfigKey {
  PORT = 'PORT',
  DB_SAMPLE_URL = 'DB_SAMPLE_URL',
  NODE_ENV = 'NODE_ENV',
  API_SECRET = 'API_SECRET',
  SENDGRID_API_KEY = 'SENDGRID_API_KEY',
  SENDGRID_RESET_PASSWORD_TEMPLATE_ID = 'SENDGRID_RESET_PASSWORD_TEMPLATE_ID',
  APP_MAIN_CONTACT_INFO_NAME = 'APP_MAIN_CONTACT_INFO_NAME',
  APP_MAIN_CONTACT_INFO_EMAIL = 'APP_MAIN_CONTACT_INFO_EMAIL',
  SENTRY_DSN = 'SENTRY_DSN',
  S3_ACCESS_KEY_ID = 'S3_ACCESS_KEY_ID',
  S3_SECRET_ACCESS_KEY = 'S3_SECRET_ACCESS_KEY',
  S3_REGION = 'S3_REGION',
  S3_ACL = 'S3_ACL',
  AWS_S3_BUCKET = 'AWS_S3_BUCKET',
  AWS_S3_FOLDER = 'AWS_S3_FOLDER',
  AWS_BASE_URL = 'AWS_BASE_URL',
}

class Config {
  private configMap = new Map<string, any>();

  constructor() {
    this.loadEnv();
  }

  get<T = any>(key: ConfigKey): T {
    return this.configMap.get(key);
  }

  isProd(): boolean {
    return this.get(ConfigKey.NODE_ENV) === 'production';
  }

  isStaging(): boolean {
    return this.get(ConfigKey.NODE_ENV) === 'staging';
  }

  isDev(): boolean {
    return !this.isProd() && !this.isStaging();
  }

  private loadEnv() {
    Object.keys(process.env).forEach((key) =>
      this.configMap.set(key, process.env[key]),
    );
  }
}

export default new Config();
