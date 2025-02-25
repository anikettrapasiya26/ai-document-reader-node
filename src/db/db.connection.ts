import {
  BindOrReplacements,
  QueryTypes,
  Sequelize,
  SyncOptions,
  Transaction,
} from 'sequelize';
import { logger } from '../helpers/utils/index';
import { ConsoleColor, logColor } from '../helpers/console.overrides';
import { DB_SAMPLE_URL } from './db.constants';

export class DBConnection {
  static sample = new Sequelize(DB_SAMPLE_URL, { logging: true });

  private static _syncOptions: SyncOptions;

  static async init(syncOptions?: SyncOptions): Promise<void> {
    this._syncOptions = syncOptions;
    await this.testConnection();
  }

  static async sample_sync(): Promise<void> {
    if (this._syncOptions) {
      logger.info('Sync db...');
      await this.sample.sync({ logging: true, ...this._syncOptions });
    }
  }

  static async testConnection(): Promise<void> {
    await this.sampleConnect();
    logColor(ConsoleColor.FgBlue, 'Connection is OK');
  }

  static newTransaction(): Promise<Transaction> {
    return this.sample.transaction();
  }

  static async runInTransaction<T = any>(
    action: (transaction: Transaction) => Promise<T>,
    existingTransaction?: Transaction,
  ): Promise<T> {
    if (existingTransaction) return action(existingTransaction);
    const transaction = await this.newTransaction();
    try {
      const result = await Promise.resolve(action(transaction));
      await transaction.commit();
      return result;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  private static async sampleConnect(): Promise<void> {
    logger.info('Init Pdb...');
    try {
      this.sample.modelManager.all.forEach((modelConstructor: any) => {
        const model = new modelConstructor();
        if (!model.associate) return;
        model.associate(this.sample.models);
      });
      await this.sample_sync();
    } catch (err) {
      logger.info('Connection error:', err);
      throw err;
    }
  }

  static async executeSampleQuery(
    query: string,
    replacements: BindOrReplacements,
    action = 'select',
  ): Promise<any> {
    try {
      const [results, metadata] = await this.sample.query(query, {
        replacements,
      });
      return [results, metadata];
    } catch (err) {
      return err;
    }
  }
}
