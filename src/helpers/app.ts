import minimist from 'minimist';
import config from '../config/config';
import { DBConnection } from '../db/db.connection';
import './console.overrides';
import SentryHelper from './sentry.helper';
import { logger } from './utils/index';

export interface App {
  setup?(): Promise<any> | any;
  init?(): Promise<any> | any;
  onExit?(): Promise<any> | any;
}

export abstract class App {
  args = minimist(process.argv.slice(2));

  constructor(public initDB = false) {
    if (this.onExit) process.on('exit', this.onExit.bind(this));
  }

  static async run(appOrClass: App | (new () => App)): Promise<void> {
    let app: App;
    if (appOrClass instanceof App) {
      app = appOrClass;
    } else {
      app = new appOrClass();
    }
    await App.setup(app);
    if (app.init) await app.init();
  }

  private static async setup(app: App) {
    SentryHelper.init();
    if (app.initDB) await DBConnection.init();
    process.on('uncaughtException', (err) => app.exit(err));
    process.on('SIGINT', () => app.exit());
    process.on('SIGQUIT', () => app.exit());
    process.on('SIGTERM', () => app.exit());
    if (app.setup) await app.setup();
  }

  async exit(err?: Error): Promise<void> {
    if (err) {
      if (config.isProd()) {
        SentryHelper.logError(err);
        await SentryHelper.Sentry.flush();
      } else {
        logger.info(err);
      }
    }
    process.exit(err ? 1 : 0);
  }
}
