import util from 'util';

export enum ConsoleColor {
  Reset = '\x1b[0m',
  Bright = '\x1b[1m',
  Dim = '\x1b[2m',
  Underscore = '\x1b[4m',
  Blink = '\x1b[5m',
  Reverse = '\x1b[7m',
  Hidden = '\x1b[8m',
  FgBlack = '\x1b[30m',
  FgRed = '\x1b[31m',
  FgGreen = '\x1b[32m',
  FgYellow = '\x1b[33m',
  FgBlue = '\x1b[34m',
  FgMagenta = '\x1b[35m',
  FgCyan = '\x1b[36m',
  FgWhite = '\x1b[37m',
  BgBlack = '\x1b[40m',
  BgRed = '\x1b[41m',
  BgGreen = '\x1b[42m',
  BgYellow = '\x1b[43m',
  BgBlue = '\x1b[44m',
  BgMagenta = '\x1b[45m',
  BgCyan = '\x1b[46m',
  BgWhite = '\x1b[47m',
}

// override log/error for dev purposes
const consoleLog = console.log;

console.log = (...args: any[]) =>
  consoleLog(
    ...[
      `[${new Date().toUTCString()}]:`, // adds timestamp
      ...args,
    ],
  );

export function logColor(color: ConsoleColor, ...args: any[]): void {
  console.log(color, ...args, ConsoleColor.Reset);
}

export function logInspect(...args: any[]): void {
  console.log(
    ...args.map((log) => util.inspect(log, { depth: null, colors: true })),
  );
}
