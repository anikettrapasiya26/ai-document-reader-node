import minimist from 'minimist';
import { DBConnection } from '../db/db.connection';
import { App } from '../helpers/app';
import { ConsoleColor, logColor } from '../helpers/console.overrides';

class DbToolApp extends App {
  async init() {
    const { alter, force } = minimist(process.argv.slice(2));
    await DBConnection.init({ alter: !!alter, force: !!force });
    logColor(ConsoleColor.FgGreen, 'Sync was successful');
    await this.exit();
  }
}

App.run(DbToolApp);
