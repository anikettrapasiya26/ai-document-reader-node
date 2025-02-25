import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const transport: any = new DailyRotateFile({
  filename: './logs/all-logs-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  json: false,
  zippedArchive: true,
  maxSize: 5242880,
  maxFiles: 5,
});
const logger: any = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf((info: any) => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    }),
  ),
  transports: [transport],
});

export default logger;
