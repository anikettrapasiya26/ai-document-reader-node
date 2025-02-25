import * as Sentry from '@sentry/node';
import { CaptureContext } from '@sentry/types';
import config, { ConfigKey } from '../config/config';

export default class SentryHelper {
  static Sentry = Sentry;

  static init(): void {
    Sentry.init({ dsn: config.get(ConfigKey.SENTRY_DSN) });
  }

  static logMessage(message: string, captureContext?: CaptureContext): string {
    return Sentry.captureMessage(message, captureContext);
  }

  static logError(err: Error, captureContext?: CaptureContext): string {
    return Sentry.captureException(err, captureContext);
  }
}
