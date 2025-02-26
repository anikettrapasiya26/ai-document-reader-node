/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config/config.ts":
/*!******************************!*\
  !*** ./src/config/config.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigKey = void 0;
const dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
dotenv_1.default.config();
var ConfigKey;
(function (ConfigKey) {
    ConfigKey["PORT"] = "PORT";
    ConfigKey["DB_SAMPLE_URL"] = "DB_SAMPLE_URL";
    ConfigKey["NODE_ENV"] = "NODE_ENV";
    ConfigKey["API_SECRET"] = "API_SECRET";
    ConfigKey["SENDGRID_API_KEY"] = "SENDGRID_API_KEY";
    ConfigKey["SENDGRID_RESET_PASSWORD_TEMPLATE_ID"] = "SENDGRID_RESET_PASSWORD_TEMPLATE_ID";
    ConfigKey["APP_MAIN_CONTACT_INFO_NAME"] = "APP_MAIN_CONTACT_INFO_NAME";
    ConfigKey["APP_MAIN_CONTACT_INFO_EMAIL"] = "APP_MAIN_CONTACT_INFO_EMAIL";
    ConfigKey["SENTRY_DSN"] = "SENTRY_DSN";
    ConfigKey["S3_ACCESS_KEY_ID"] = "S3_ACCESS_KEY_ID";
    ConfigKey["S3_SECRET_ACCESS_KEY"] = "S3_SECRET_ACCESS_KEY";
    ConfigKey["S3_REGION"] = "S3_REGION";
    ConfigKey["S3_ACL"] = "S3_ACL";
    ConfigKey["AWS_S3_BUCKET"] = "AWS_S3_BUCKET";
    ConfigKey["AWS_S3_FOLDER"] = "AWS_S3_FOLDER";
    ConfigKey["AWS_BASE_URL"] = "AWS_BASE_URL";
})(ConfigKey = exports.ConfigKey || (exports.ConfigKey = {}));
class Config {
    constructor() {
        this.configMap = new Map();
        this.loadEnv();
    }
    get(key) {
        return this.configMap.get(key);
    }
    isProd() {
        return this.get(ConfigKey.NODE_ENV) === 'production';
    }
    isStaging() {
        return this.get(ConfigKey.NODE_ENV) === 'staging';
    }
    isDev() {
        return !this.isProd() && !this.isStaging();
    }
    loadEnv() {
        Object.keys(process.env).forEach((key) => this.configMap.set(key, process.env[key]));
    }
}
exports["default"] = new Config();


/***/ }),

/***/ "./src/db/db.connection.ts":
/*!*********************************!*\
  !*** ./src/db/db.connection.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DBConnection = void 0;
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const index_1 = __webpack_require__(/*! ../helpers/utils/index */ "./src/helpers/utils/index.ts");
const console_overrides_1 = __webpack_require__(/*! ../helpers/console.overrides */ "./src/helpers/console.overrides.ts");
const db_constants_1 = __webpack_require__(/*! ./db.constants */ "./src/db/db.constants.ts");
class DBConnection {
    static init(syncOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            this._syncOptions = syncOptions;
            yield this.testConnection();
        });
    }
    static sample_sync() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._syncOptions) {
                index_1.logger.info('Sync db...');
                yield this.sample.sync(Object.assign({ logging: true }, this._syncOptions));
            }
        });
    }
    static testConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sampleConnect();
            (0, console_overrides_1.logColor)(console_overrides_1.ConsoleColor.FgBlue, 'Connection is OK');
        });
    }
    static newTransaction() {
        return this.sample.transaction();
    }
    static runInTransaction(action, existingTransaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (existingTransaction)
                return action(existingTransaction);
            const transaction = yield this.newTransaction();
            try {
                const result = yield Promise.resolve(action(transaction));
                yield transaction.commit();
                return result;
            }
            catch (err) {
                yield transaction.rollback();
                throw err;
            }
        });
    }
    static sampleConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            index_1.logger.info('Init Pdb...');
            try {
                this.sample.modelManager.all.forEach((modelConstructor) => {
                    const model = new modelConstructor();
                    if (!model.associate)
                        return;
                    model.associate(this.sample.models);
                });
                yield this.sample_sync();
            }
            catch (err) {
                index_1.logger.info('Connection error:', err);
                throw err;
            }
        });
    }
    static executeSampleQuery(query, replacements, action = 'select') {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [results, metadata] = yield this.sample.query(query, {
                    replacements,
                });
                return [results, metadata];
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.DBConnection = DBConnection;
DBConnection.sample = new sequelize_1.Sequelize(db_constants_1.DB_SAMPLE_URL, { logging: true });


/***/ }),

/***/ "./src/db/db.constants.ts":
/*!********************************!*\
  !*** ./src/db/db.constants.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DB_SAMPLE_URL = void 0;
const config_1 = __importStar(__webpack_require__(/*! ../config/config */ "./src/config/config.ts"));
exports.DB_SAMPLE_URL = config_1.default.get(config_1.ConfigKey.DB_SAMPLE_URL);


/***/ }),

/***/ "./src/helpers/app.ts":
/*!****************************!*\
  !*** ./src/helpers/app.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
const minimist_1 = __importDefault(__webpack_require__(/*! minimist */ "minimist"));
const config_1 = __importDefault(__webpack_require__(/*! ../config/config */ "./src/config/config.ts"));
const db_connection_1 = __webpack_require__(/*! ../db/db.connection */ "./src/db/db.connection.ts");
__webpack_require__(/*! ./console.overrides */ "./src/helpers/console.overrides.ts");
const sentry_helper_1 = __importDefault(__webpack_require__(/*! ./sentry.helper */ "./src/helpers/sentry.helper.ts"));
const index_1 = __webpack_require__(/*! ./utils/index */ "./src/helpers/utils/index.ts");
class App {
    constructor(initDB = false) {
        this.initDB = initDB;
        this.args = (0, minimist_1.default)(process.argv.slice(2));
        if (this.onExit)
            process.on('exit', this.onExit.bind(this));
    }
    static run(appOrClass) {
        return __awaiter(this, void 0, void 0, function* () {
            let app;
            if (appOrClass instanceof App) {
                app = appOrClass;
            }
            else {
                app = new appOrClass();
            }
            yield App.setup(app);
            if (app.init)
                yield app.init();
        });
    }
    static setup(app) {
        return __awaiter(this, void 0, void 0, function* () {
            sentry_helper_1.default.init();
            if (app.initDB)
                yield db_connection_1.DBConnection.init();
            process.on('uncaughtException', (err) => app.exit(err));
            process.on('SIGINT', () => app.exit());
            process.on('SIGQUIT', () => app.exit());
            process.on('SIGTERM', () => app.exit());
            if (app.setup)
                yield app.setup();
        });
    }
    exit(err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                if (config_1.default.isProd()) {
                    sentry_helper_1.default.logError(err);
                    yield sentry_helper_1.default.Sentry.flush();
                }
                else {
                    index_1.logger.info(err);
                }
            }
            process.exit(err ? 1 : 0);
        });
    }
}
exports.App = App;


/***/ }),

/***/ "./src/helpers/console.overrides.ts":
/*!******************************************!*\
  !*** ./src/helpers/console.overrides.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logInspect = exports.logColor = exports.ConsoleColor = void 0;
const util_1 = __importDefault(__webpack_require__(/*! util */ "util"));
var ConsoleColor;
(function (ConsoleColor) {
    ConsoleColor["Reset"] = "\u001B[0m";
    ConsoleColor["Bright"] = "\u001B[1m";
    ConsoleColor["Dim"] = "\u001B[2m";
    ConsoleColor["Underscore"] = "\u001B[4m";
    ConsoleColor["Blink"] = "\u001B[5m";
    ConsoleColor["Reverse"] = "\u001B[7m";
    ConsoleColor["Hidden"] = "\u001B[8m";
    ConsoleColor["FgBlack"] = "\u001B[30m";
    ConsoleColor["FgRed"] = "\u001B[31m";
    ConsoleColor["FgGreen"] = "\u001B[32m";
    ConsoleColor["FgYellow"] = "\u001B[33m";
    ConsoleColor["FgBlue"] = "\u001B[34m";
    ConsoleColor["FgMagenta"] = "\u001B[35m";
    ConsoleColor["FgCyan"] = "\u001B[36m";
    ConsoleColor["FgWhite"] = "\u001B[37m";
    ConsoleColor["BgBlack"] = "\u001B[40m";
    ConsoleColor["BgRed"] = "\u001B[41m";
    ConsoleColor["BgGreen"] = "\u001B[42m";
    ConsoleColor["BgYellow"] = "\u001B[43m";
    ConsoleColor["BgBlue"] = "\u001B[44m";
    ConsoleColor["BgMagenta"] = "\u001B[45m";
    ConsoleColor["BgCyan"] = "\u001B[46m";
    ConsoleColor["BgWhite"] = "\u001B[47m";
})(ConsoleColor = exports.ConsoleColor || (exports.ConsoleColor = {}));
// override log/error for dev purposes
const consoleLog = console.log;
console.log = (...args) => consoleLog(...[
    `[${new Date().toUTCString()}]:`,
    ...args,
]);
function logColor(color, ...args) {
    console.log(color, ...args, ConsoleColor.Reset);
}
exports.logColor = logColor;
function logInspect(...args) {
    console.log(...args.map((log) => util_1.default.inspect(log, { depth: null, colors: true })));
}
exports.logInspect = logInspect;


/***/ }),

/***/ "./src/helpers/sentry.helper.ts":
/*!**************************************!*\
  !*** ./src/helpers/sentry.helper.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Sentry = __importStar(__webpack_require__(/*! @sentry/node */ "@sentry/node"));
const config_1 = __importStar(__webpack_require__(/*! ../config/config */ "./src/config/config.ts"));
class SentryHelper {
    static init() {
        Sentry.init({ dsn: config_1.default.get(config_1.ConfigKey.SENTRY_DSN) });
    }
    static logMessage(message, captureContext) {
        return Sentry.captureMessage(message, captureContext);
    }
    static logError(err, captureContext) {
        return Sentry.captureException(err, captureContext);
    }
}
exports["default"] = SentryHelper;
SentryHelper.Sentry = Sentry;


/***/ }),

/***/ "./src/helpers/utils/index.ts":
/*!************************************!*\
  !*** ./src/helpers/utils/index.ts ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logger = void 0;
const logger_1 = __importDefault(__webpack_require__(/*! ./logger */ "./src/helpers/utils/logger.ts"));
exports.logger = logger_1.default;
module.exports = {
    logger: logger_1.default,
};


/***/ }),

/***/ "./src/helpers/utils/logger.ts":
/*!*************************************!*\
  !*** ./src/helpers/utils/logger.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const winston_1 = __webpack_require__(/*! winston */ "winston");
const winston_daily_rotate_file_1 = __importDefault(__webpack_require__(/*! winston-daily-rotate-file */ "winston-daily-rotate-file"));
const transport = new winston_daily_rotate_file_1.default({
    filename: './logs/all-logs-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    json: false,
    zippedArchive: true,
    maxSize: 5242880,
    maxFiles: 5,
});
const logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.format.printf((info) => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
    })),
    transports: [transport],
});
exports["default"] = logger;


/***/ }),

/***/ "./src/tools/db.tool.ts":
/*!******************************!*\
  !*** ./src/tools/db.tool.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const minimist_1 = __importDefault(__webpack_require__(/*! minimist */ "minimist"));
const db_connection_1 = __webpack_require__(/*! ../db/db.connection */ "./src/db/db.connection.ts");
const app_1 = __webpack_require__(/*! ../helpers/app */ "./src/helpers/app.ts");
const console_overrides_1 = __webpack_require__(/*! ../helpers/console.overrides */ "./src/helpers/console.overrides.ts");
class DbToolApp extends app_1.App {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { alter, force } = (0, minimist_1.default)(process.argv.slice(2));
            yield db_connection_1.DBConnection.init({ alter: !!alter, force: !!force });
            (0, console_overrides_1.logColor)(console_overrides_1.ConsoleColor.FgGreen, 'Sync was successful');
            yield this.exit();
        });
    }
}
app_1.App.run(DbToolApp);


/***/ }),

/***/ "@sentry/node":
/*!*******************************!*\
  !*** external "@sentry/node" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@sentry/node");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "minimist":
/*!***************************!*\
  !*** external "minimist" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("minimist");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("winston");

/***/ }),

/***/ "winston-daily-rotate-file":
/*!********************************************!*\
  !*** external "winston-daily-rotate-file" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("winston-daily-rotate-file");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/tools/db.tool.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDOzs7Ozs7Ozs7OztBQ2RuQjs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbXBsZS8uL3NyYy9jb25maWcvY29uZmlnLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9kYi9kYi5jb25uZWN0aW9uLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9kYi9kYi5jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2hlbHBlcnMvYXBwLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9oZWxwZXJzL2NvbnNvbGUub3ZlcnJpZGVzLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9oZWxwZXJzL3NlbnRyeS5oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2hlbHBlcnMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2hlbHBlcnMvdXRpbHMvbG9nZ2VyLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy90b29scy9kYi50b29sLnRzIiwid2VicGFjazovL3NhbXBsZS9leHRlcm5hbCBjb21tb25qcyBcIkBzZW50cnkvbm9kZVwiIiwid2VicGFjazovL3NhbXBsZS9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL3NhbXBsZS9leHRlcm5hbCBjb21tb25qcyBcIm1pbmltaXN0XCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwic2VxdWVsaXplXCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwidXRpbFwiIiwid2VicGFjazovL3NhbXBsZS9leHRlcm5hbCBjb21tb25qcyBcIndpbnN0b25cIiIsIndlYnBhY2s6Ly9zYW1wbGUvZXh0ZXJuYWwgY29tbW9uanMgXCJ3aW5zdG9uLWRhaWx5LXJvdGF0ZS1maWxlXCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NhbXBsZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3NhbXBsZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc2FtcGxlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5cbmRvdGVudi5jb25maWcoKTtcblxuZXhwb3J0IGVudW0gQ29uZmlnS2V5IHtcbiAgUE9SVCA9ICdQT1JUJyxcbiAgREJfU0FNUExFX1VSTCA9ICdEQl9TQU1QTEVfVVJMJyxcbiAgTk9ERV9FTlYgPSAnTk9ERV9FTlYnLFxuICBBUElfU0VDUkVUID0gJ0FQSV9TRUNSRVQnLFxuICBTRU5ER1JJRF9BUElfS0VZID0gJ1NFTkRHUklEX0FQSV9LRVknLFxuICBTRU5ER1JJRF9SRVNFVF9QQVNTV09SRF9URU1QTEFURV9JRCA9ICdTRU5ER1JJRF9SRVNFVF9QQVNTV09SRF9URU1QTEFURV9JRCcsXG4gIEFQUF9NQUlOX0NPTlRBQ1RfSU5GT19OQU1FID0gJ0FQUF9NQUlOX0NPTlRBQ1RfSU5GT19OQU1FJyxcbiAgQVBQX01BSU5fQ09OVEFDVF9JTkZPX0VNQUlMID0gJ0FQUF9NQUlOX0NPTlRBQ1RfSU5GT19FTUFJTCcsXG4gIFNFTlRSWV9EU04gPSAnU0VOVFJZX0RTTicsXG4gIFMzX0FDQ0VTU19LRVlfSUQgPSAnUzNfQUNDRVNTX0tFWV9JRCcsXG4gIFMzX1NFQ1JFVF9BQ0NFU1NfS0VZID0gJ1MzX1NFQ1JFVF9BQ0NFU1NfS0VZJyxcbiAgUzNfUkVHSU9OID0gJ1MzX1JFR0lPTicsXG4gIFMzX0FDTCA9ICdTM19BQ0wnLFxuICBBV1NfUzNfQlVDS0VUID0gJ0FXU19TM19CVUNLRVQnLFxuICBBV1NfUzNfRk9MREVSID0gJ0FXU19TM19GT0xERVInLFxuICBBV1NfQkFTRV9VUkwgPSAnQVdTX0JBU0VfVVJMJyxcbn1cblxuY2xhc3MgQ29uZmlnIHtcbiAgcHJpdmF0ZSBjb25maWdNYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubG9hZEVudigpO1xuICB9XG5cbiAgZ2V0PFQgPSBhbnk+KGtleTogQ29uZmlnS2V5KTogVCB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnTWFwLmdldChrZXkpO1xuICB9XG5cbiAgaXNQcm9kKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldChDb25maWdLZXkuTk9ERV9FTlYpID09PSAncHJvZHVjdGlvbic7XG4gIH1cblxuICBpc1N0YWdpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KENvbmZpZ0tleS5OT0RFX0VOVikgPT09ICdzdGFnaW5nJztcbiAgfVxuXG4gIGlzRGV2KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc1Byb2QoKSAmJiAhdGhpcy5pc1N0YWdpbmcoKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZEVudigpIHtcbiAgICBPYmplY3Qua2V5cyhwcm9jZXNzLmVudikuZm9yRWFjaCgoa2V5KSA9PlxuICAgICAgdGhpcy5jb25maWdNYXAuc2V0KGtleSwgcHJvY2Vzcy5lbnZba2V5XSksXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQ29uZmlnKCk7XG4iLCJpbXBvcnQge1xuICBCaW5kT3JSZXBsYWNlbWVudHMsXG4gIFF1ZXJ5VHlwZXMsXG4gIFNlcXVlbGl6ZSxcbiAgU3luY09wdGlvbnMsXG4gIFRyYW5zYWN0aW9uLFxufSBmcm9tICdzZXF1ZWxpemUnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vaGVscGVycy91dGlscy9pbmRleCc7XG5pbXBvcnQgeyBDb25zb2xlQ29sb3IsIGxvZ0NvbG9yIH0gZnJvbSAnLi4vaGVscGVycy9jb25zb2xlLm92ZXJyaWRlcyc7XG5pbXBvcnQgeyBEQl9TQU1QTEVfVVJMIH0gZnJvbSAnLi9kYi5jb25zdGFudHMnO1xuXG5leHBvcnQgY2xhc3MgREJDb25uZWN0aW9uIHtcbiAgc3RhdGljIHNhbXBsZSA9IG5ldyBTZXF1ZWxpemUoREJfU0FNUExFX1VSTCwgeyBsb2dnaW5nOiB0cnVlIH0pO1xuXG4gIHByaXZhdGUgc3RhdGljIF9zeW5jT3B0aW9uczogU3luY09wdGlvbnM7XG5cbiAgc3RhdGljIGFzeW5jIGluaXQoc3luY09wdGlvbnM/OiBTeW5jT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX3N5bmNPcHRpb25zID0gc3luY09wdGlvbnM7XG4gICAgYXdhaXQgdGhpcy50ZXN0Q29ubmVjdGlvbigpO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIHNhbXBsZV9zeW5jKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLl9zeW5jT3B0aW9ucykge1xuICAgICAgbG9nZ2VyLmluZm8oJ1N5bmMgZGIuLi4nKTtcbiAgICAgIGF3YWl0IHRoaXMuc2FtcGxlLnN5bmMoeyBsb2dnaW5nOiB0cnVlLCAuLi50aGlzLl9zeW5jT3B0aW9ucyB9KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgdGVzdENvbm5lY3Rpb24oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5zYW1wbGVDb25uZWN0KCk7XG4gICAgbG9nQ29sb3IoQ29uc29sZUNvbG9yLkZnQmx1ZSwgJ0Nvbm5lY3Rpb24gaXMgT0snKTtcbiAgfVxuXG4gIHN0YXRpYyBuZXdUcmFuc2FjdGlvbigpOiBQcm9taXNlPFRyYW5zYWN0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuc2FtcGxlLnRyYW5zYWN0aW9uKCk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgcnVuSW5UcmFuc2FjdGlvbjxUID0gYW55PihcbiAgICBhY3Rpb246ICh0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24pID0+IFByb21pc2U8VD4sXG4gICAgZXhpc3RpbmdUcmFuc2FjdGlvbj86IFRyYW5zYWN0aW9uLFxuICApOiBQcm9taXNlPFQ+IHtcbiAgICBpZiAoZXhpc3RpbmdUcmFuc2FjdGlvbikgcmV0dXJuIGFjdGlvbihleGlzdGluZ1RyYW5zYWN0aW9uKTtcbiAgICBjb25zdCB0cmFuc2FjdGlvbiA9IGF3YWl0IHRoaXMubmV3VHJhbnNhY3Rpb24oKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKGFjdGlvbih0cmFuc2FjdGlvbikpO1xuICAgICAgYXdhaXQgdHJhbnNhY3Rpb24uY29tbWl0KCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgYXdhaXQgdHJhbnNhY3Rpb24ucm9sbGJhY2soKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBzYW1wbGVDb25uZWN0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZ2dlci5pbmZvKCdJbml0IFBkYi4uLicpO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnNhbXBsZS5tb2RlbE1hbmFnZXIuYWxsLmZvckVhY2goKG1vZGVsQ29uc3RydWN0b3I6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBtb2RlbCA9IG5ldyBtb2RlbENvbnN0cnVjdG9yKCk7XG4gICAgICAgIGlmICghbW9kZWwuYXNzb2NpYXRlKSByZXR1cm47XG4gICAgICAgIG1vZGVsLmFzc29jaWF0ZSh0aGlzLnNhbXBsZS5tb2RlbHMpO1xuICAgICAgfSk7XG4gICAgICBhd2FpdCB0aGlzLnNhbXBsZV9zeW5jKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuaW5mbygnQ29ubmVjdGlvbiBlcnJvcjonLCBlcnIpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBleGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgcXVlcnk6IHN0cmluZyxcbiAgICByZXBsYWNlbWVudHM6IEJpbmRPclJlcGxhY2VtZW50cyxcbiAgICBhY3Rpb24gPSAnc2VsZWN0JyxcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgW3Jlc3VsdHMsIG1ldGFkYXRhXSA9IGF3YWl0IHRoaXMuc2FtcGxlLnF1ZXJ5KHF1ZXJ5LCB7XG4gICAgICAgIHJlcGxhY2VtZW50cyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFtyZXN1bHRzLCBtZXRhZGF0YV07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IGNvbmZpZywgeyBDb25maWdLZXkgfSBmcm9tICcuLi9jb25maWcvY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IERCX1NBTVBMRV9VUkwgPSBjb25maWcuZ2V0PHN0cmluZz4oQ29uZmlnS2V5LkRCX1NBTVBMRV9VUkwpO1xuIiwiaW1wb3J0IG1pbmltaXN0IGZyb20gJ21pbmltaXN0JztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnL2NvbmZpZyc7XG5pbXBvcnQgeyBEQkNvbm5lY3Rpb24gfSBmcm9tICcuLi9kYi9kYi5jb25uZWN0aW9uJztcbmltcG9ydCAnLi9jb25zb2xlLm92ZXJyaWRlcyc7XG5pbXBvcnQgU2VudHJ5SGVscGVyIGZyb20gJy4vc2VudHJ5LmhlbHBlcic7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL3V0aWxzL2luZGV4JztcblxuZXhwb3J0IGludGVyZmFjZSBBcHAge1xuICBzZXR1cD8oKTogUHJvbWlzZTxhbnk+IHwgYW55O1xuICBpbml0PygpOiBQcm9taXNlPGFueT4gfCBhbnk7XG4gIG9uRXhpdD8oKTogUHJvbWlzZTxhbnk+IHwgYW55O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBwIHtcbiAgYXJncyA9IG1pbmltaXN0KHByb2Nlc3MuYXJndi5zbGljZSgyKSk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGluaXREQiA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMub25FeGl0KSBwcm9jZXNzLm9uKCdleGl0JywgdGhpcy5vbkV4aXQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgcnVuKGFwcE9yQ2xhc3M6IEFwcCB8IChuZXcgKCkgPT4gQXBwKSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBhcHA6IEFwcDtcbiAgICBpZiAoYXBwT3JDbGFzcyBpbnN0YW5jZW9mIEFwcCkge1xuICAgICAgYXBwID0gYXBwT3JDbGFzcztcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwID0gbmV3IGFwcE9yQ2xhc3MoKTtcbiAgICB9XG4gICAgYXdhaXQgQXBwLnNldHVwKGFwcCk7XG4gICAgaWYgKGFwcC5pbml0KSBhd2FpdCBhcHAuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgc2V0dXAoYXBwOiBBcHApIHtcbiAgICBTZW50cnlIZWxwZXIuaW5pdCgpO1xuICAgIGlmIChhcHAuaW5pdERCKSBhd2FpdCBEQkNvbm5lY3Rpb24uaW5pdCgpO1xuICAgIHByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgKGVycikgPT4gYXBwLmV4aXQoZXJyKSk7XG4gICAgcHJvY2Vzcy5vbignU0lHSU5UJywgKCkgPT4gYXBwLmV4aXQoKSk7XG4gICAgcHJvY2Vzcy5vbignU0lHUVVJVCcsICgpID0+IGFwcC5leGl0KCkpO1xuICAgIHByb2Nlc3Mub24oJ1NJR1RFUk0nLCAoKSA9PiBhcHAuZXhpdCgpKTtcbiAgICBpZiAoYXBwLnNldHVwKSBhd2FpdCBhcHAuc2V0dXAoKTtcbiAgfVxuXG4gIGFzeW5jIGV4aXQoZXJyPzogRXJyb3IpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBpZiAoY29uZmlnLmlzUHJvZCgpKSB7XG4gICAgICAgIFNlbnRyeUhlbHBlci5sb2dFcnJvcihlcnIpO1xuICAgICAgICBhd2FpdCBTZW50cnlIZWxwZXIuU2VudHJ5LmZsdXNoKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnZXIuaW5mbyhlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgICBwcm9jZXNzLmV4aXQoZXJyID8gMSA6IDApO1xuICB9XG59XG4iLCJpbXBvcnQgdXRpbCBmcm9tICd1dGlsJztcblxuZXhwb3J0IGVudW0gQ29uc29sZUNvbG9yIHtcbiAgUmVzZXQgPSAnXFx4MWJbMG0nLFxuICBCcmlnaHQgPSAnXFx4MWJbMW0nLFxuICBEaW0gPSAnXFx4MWJbMm0nLFxuICBVbmRlcnNjb3JlID0gJ1xceDFiWzRtJyxcbiAgQmxpbmsgPSAnXFx4MWJbNW0nLFxuICBSZXZlcnNlID0gJ1xceDFiWzdtJyxcbiAgSGlkZGVuID0gJ1xceDFiWzhtJyxcbiAgRmdCbGFjayA9ICdcXHgxYlszMG0nLFxuICBGZ1JlZCA9ICdcXHgxYlszMW0nLFxuICBGZ0dyZWVuID0gJ1xceDFiWzMybScsXG4gIEZnWWVsbG93ID0gJ1xceDFiWzMzbScsXG4gIEZnQmx1ZSA9ICdcXHgxYlszNG0nLFxuICBGZ01hZ2VudGEgPSAnXFx4MWJbMzVtJyxcbiAgRmdDeWFuID0gJ1xceDFiWzM2bScsXG4gIEZnV2hpdGUgPSAnXFx4MWJbMzdtJyxcbiAgQmdCbGFjayA9ICdcXHgxYls0MG0nLFxuICBCZ1JlZCA9ICdcXHgxYls0MW0nLFxuICBCZ0dyZWVuID0gJ1xceDFiWzQybScsXG4gIEJnWWVsbG93ID0gJ1xceDFiWzQzbScsXG4gIEJnQmx1ZSA9ICdcXHgxYls0NG0nLFxuICBCZ01hZ2VudGEgPSAnXFx4MWJbNDVtJyxcbiAgQmdDeWFuID0gJ1xceDFiWzQ2bScsXG4gIEJnV2hpdGUgPSAnXFx4MWJbNDdtJyxcbn1cblxuLy8gb3ZlcnJpZGUgbG9nL2Vycm9yIGZvciBkZXYgcHVycG9zZXNcbmNvbnN0IGNvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcblxuY29uc29sZS5sb2cgPSAoLi4uYXJnczogYW55W10pID0+XG4gIGNvbnNvbGVMb2coXG4gICAgLi4uW1xuICAgICAgYFske25ldyBEYXRlKCkudG9VVENTdHJpbmcoKX1dOmAsIC8vIGFkZHMgdGltZXN0YW1wXG4gICAgICAuLi5hcmdzLFxuICAgIF0sXG4gICk7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dDb2xvcihjb2xvcjogQ29uc29sZUNvbG9yLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICBjb25zb2xlLmxvZyhjb2xvciwgLi4uYXJncywgQ29uc29sZUNvbG9yLlJlc2V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ0luc3BlY3QoLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgY29uc29sZS5sb2coXG4gICAgLi4uYXJncy5tYXAoKGxvZykgPT4gdXRpbC5pbnNwZWN0KGxvZywgeyBkZXB0aDogbnVsbCwgY29sb3JzOiB0cnVlIH0pKSxcbiAgKTtcbn1cbiIsImltcG9ydCAqIGFzIFNlbnRyeSBmcm9tICdAc2VudHJ5L25vZGUnO1xuaW1wb3J0IHsgQ2FwdHVyZUNvbnRleHQgfSBmcm9tICdAc2VudHJ5L3R5cGVzJztcbmltcG9ydCBjb25maWcsIHsgQ29uZmlnS2V5IH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbnRyeUhlbHBlciB7XG4gIHN0YXRpYyBTZW50cnkgPSBTZW50cnk7XG5cbiAgc3RhdGljIGluaXQoKTogdm9pZCB7XG4gICAgU2VudHJ5LmluaXQoeyBkc246IGNvbmZpZy5nZXQoQ29uZmlnS2V5LlNFTlRSWV9EU04pIH0pO1xuICB9XG5cbiAgc3RhdGljIGxvZ01lc3NhZ2UobWVzc2FnZTogc3RyaW5nLCBjYXB0dXJlQ29udGV4dD86IENhcHR1cmVDb250ZXh0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gU2VudHJ5LmNhcHR1cmVNZXNzYWdlKG1lc3NhZ2UsIGNhcHR1cmVDb250ZXh0KTtcbiAgfVxuXG4gIHN0YXRpYyBsb2dFcnJvcihlcnI6IEVycm9yLCBjYXB0dXJlQ29udGV4dD86IENhcHR1cmVDb250ZXh0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gU2VudHJ5LmNhcHR1cmVFeGNlcHRpb24oZXJyLCBjYXB0dXJlQ29udGV4dCk7XG4gIH1cbn1cbiIsImltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbG9nZ2VyLFxufTtcbmV4cG9ydCB7IGxvZ2dlciB9O1xuIiwiaW1wb3J0IHsgY3JlYXRlTG9nZ2VyLCB0cmFuc3BvcnRzLCBmb3JtYXQgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBEYWlseVJvdGF0ZUZpbGUgZnJvbSAnd2luc3Rvbi1kYWlseS1yb3RhdGUtZmlsZSc7XG5jb25zdCB0cmFuc3BvcnQ6IGFueSA9IG5ldyBEYWlseVJvdGF0ZUZpbGUoe1xuICBmaWxlbmFtZTogJy4vbG9ncy9hbGwtbG9ncy0lREFURSUubG9nJyxcbiAgZGF0ZVBhdHRlcm46ICdZWVlZLU1NLUREJyxcbiAganNvbjogZmFsc2UsXG4gIHppcHBlZEFyY2hpdmU6IHRydWUsXG4gIG1heFNpemU6IDUyNDI4ODAsXG4gIG1heEZpbGVzOiA1LFxufSk7XG5jb25zdCBsb2dnZXI6IGFueSA9IGNyZWF0ZUxvZ2dlcih7XG4gIGZvcm1hdDogZm9ybWF0LmNvbWJpbmUoXG4gICAgZm9ybWF0LnRpbWVzdGFtcCh7IGZvcm1hdDogJ1lZWVktTU0tREQgSEg6bW06c3M6bXMnIH0pLFxuICAgIGZvcm1hdC5wcmludGYoKGluZm86IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIGAke2luZm8udGltZXN0YW1wfSAke2luZm8ubGV2ZWx9OiAke2luZm8ubWVzc2FnZX1gO1xuICAgIH0pLFxuICApLFxuICB0cmFuc3BvcnRzOiBbdHJhbnNwb3J0XSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7XG4iLCJpbXBvcnQgbWluaW1pc3QgZnJvbSAnbWluaW1pc3QnO1xuaW1wb3J0IHsgREJDb25uZWN0aW9uIH0gZnJvbSAnLi4vZGIvZGIuY29ubmVjdGlvbic7XG5pbXBvcnQgeyBBcHAgfSBmcm9tICcuLi9oZWxwZXJzL2FwcCc7XG5pbXBvcnQgeyBDb25zb2xlQ29sb3IsIGxvZ0NvbG9yIH0gZnJvbSAnLi4vaGVscGVycy9jb25zb2xlLm92ZXJyaWRlcyc7XG5cbmNsYXNzIERiVG9vbEFwcCBleHRlbmRzIEFwcCB7XG4gIGFzeW5jIGluaXQoKSB7XG4gICAgY29uc3QgeyBhbHRlciwgZm9yY2UgfSA9IG1pbmltaXN0KHByb2Nlc3MuYXJndi5zbGljZSgyKSk7XG4gICAgYXdhaXQgREJDb25uZWN0aW9uLmluaXQoeyBhbHRlcjogISFhbHRlciwgZm9yY2U6ICEhZm9yY2UgfSk7XG4gICAgbG9nQ29sb3IoQ29uc29sZUNvbG9yLkZnR3JlZW4sICdTeW5jIHdhcyBzdWNjZXNzZnVsJyk7XG4gICAgYXdhaXQgdGhpcy5leGl0KCk7XG4gIH1cbn1cblxuQXBwLnJ1bihEYlRvb2xBcHApO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQHNlbnRyeS9ub2RlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtaW5pbWlzdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b24tZGFpbHktcm90YXRlLWZpbGVcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3Rvb2xzL2RiLnRvb2wudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=