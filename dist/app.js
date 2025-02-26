/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
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
const api_1 = __webpack_require__(/*! ./src/api/api */ "./src/api/api.ts");
__webpack_require__(/*! ./src/helpers/console.overrides */ "./src/helpers/console.overrides.ts");
const app_1 = __webpack_require__(/*! ./src/helpers/app */ "./src/helpers/app.ts");
class SampleApp extends app_1.App {
    constructor() {
        super(true);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            api_1.Api.init();
        });
    }
}
app_1.App.run(SampleApp);


/***/ }),

/***/ "./src/api/api.constants.ts":
/*!**********************************!*\
  !*** ./src/api/api.constants.ts ***!
  \**********************************/
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
exports.API_UUID_REGEX = exports.API_TOKEN_VALIDITY = exports.API_SECRET = exports.API_PORT = void 0;
const config_1 = __importStar(__webpack_require__(/*! ../config/config */ "./src/config/config.ts"));
exports.API_PORT = config_1.default.get(config_1.ConfigKey.PORT) || 8000;
exports.API_SECRET = config_1.default.get(config_1.ConfigKey.API_SECRET);
exports.API_TOKEN_VALIDITY = 24 * 60 * 60; // 24h in seconds
// eslint-disable-next-line max-len
exports.API_UUID_REGEX = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);


/***/ }),

/***/ "./src/api/api.jwt.ts":
/*!****************************!*\
  !*** ./src/api/api.jwt.ts ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {


/**
 * @author aniket.trapasiya <aniket.trapasiya@dataprophets.in>
 * created JWT token: we use tokendata,SECRET_KEY and TOKEN VALIDITY in env file, using this data token was created
 * @returns token
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
class JWT {
    static createToken(tokenData) {
        try {
            return jsonwebtoken_1.default.sign({
                id: tokenData,
            }, process.env.API_SECRET, {
                expiresIn: process.env.TOKEN_VALIDITY,
            });
        }
        catch (err) {
            return null;
        }
    }
}
module.exports = JWT;


/***/ }),

/***/ "./src/api/api.router.ts":
/*!*******************************!*\
  !*** ./src/api/api.router.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const auth_middlewares_1 = __webpack_require__(/*! ./auth/auth.middlewares */ "./src/api/auth/auth.middlewares.ts");
const users_router_1 = __importDefault(__webpack_require__(/*! ./users/users.router */ "./src/api/users/users.router.ts"));
const client_router_1 = __importDefault(__webpack_require__(/*! ./client/client.router */ "./src/api/client/client.router.ts"));
const auth_router_1 = __importDefault(__webpack_require__(/*! ./auth/auth.router */ "./src/api/auth/auth.router.ts"));
const forgot_router_1 = __importDefault(__webpack_require__(/*! ./forgotPassword/forgot.router */ "./src/api/forgotPassword/forgot.router.ts"));
const s3router_1 = __importDefault(__webpack_require__(/*! ./s3bucket/s3router */ "./src/api/s3bucket/s3router.ts"));
const reset_router_1 = __importDefault(__webpack_require__(/*! ./resetPassword/reset.router */ "./src/api/resetPassword/reset.router.ts"));
const public_router_1 = __importDefault(__webpack_require__(/*! ./public/public.router */ "./src/api/public/public.router.ts"));
const router = (0, express_1.Router)({ mergeParams: true });
router.use('/auth', forgot_router_1.default);
router.use('/ahs', public_router_1.default);
router.use('/auth', auth_router_1.default);
router.use(auth_middlewares_1.authenticate);
router.use('/user', users_router_1.default);
router.use('/client', client_router_1.default);
router.use('/upload', s3router_1.default);
router.use('/password', reset_router_1.default);
exports["default"] = router;


/***/ }),

/***/ "./src/api/api.swagger.ts":
/*!********************************!*\
  !*** ./src/api/api.swagger.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const swagger_ui_express_1 = __importDefault(__webpack_require__(/*! swagger-ui-express */ "swagger-ui-express"));
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const swaggerDocPath = path_1.default.resolve(__dirname, '../src/api/api.swagger.json');
const swaggerDoc = JSON.parse(fs_1.default.readFileSync(swaggerDocPath, { encoding: 'utf-8' }));
class Swagger {
    static getMiddlewares() {
        return [...swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc)];
    }
}
exports["default"] = Swagger;


/***/ }),

/***/ "./src/api/api.ts":
/*!************************!*\
  !*** ./src/api/api.ts ***!
  \************************/
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
exports.Api = void 0;
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
// import path from 'path';
const body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser"));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
// import fileUpload from 'express-fileupload';
const helmet_1 = __importDefault(__webpack_require__(/*! helmet */ "helmet"));
const http_status_codes_1 = __webpack_require__(/*! http-status-codes */ "http-status-codes");
const morgan_1 = __importDefault(__webpack_require__(/*! morgan */ "morgan"));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const console_overrides_1 = __webpack_require__(/*! ../helpers/console.overrides */ "./src/helpers/console.overrides.ts");
const sentry_helper_1 = __importDefault(__webpack_require__(/*! ../helpers/sentry.helper */ "./src/helpers/sentry.helper.ts"));
const api_constants_1 = __webpack_require__(/*! ./api.constants */ "./src/api/api.constants.ts");
const api_router_1 = __importDefault(__webpack_require__(/*! ./api.router */ "./src/api/api.router.ts"));
const forgot_router_1 = __importDefault(__webpack_require__(/*! ./forgotPassword/forgot.router */ "./src/api/forgotPassword/forgot.router.ts"));
const public_router_1 = __importDefault(__webpack_require__(/*! ./public/public.router */ "./src/api/public/public.router.ts"));
const index_1 = __importDefault(__webpack_require__(/*! ../helpers/middlewares/index */ "./src/helpers/middlewares/index.ts"));
const index_2 = __webpack_require__(/*! ../helpers/utils/index */ "./src/helpers/utils/index.ts");
const { Sentry } = sentry_helper_1.default;
class Api {
    static setupApi() {
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.default.json());
        this.app.use(index_1.default);
        this.app.use(body_parser_1.default.urlencoded({
            limit: '50mb',
            extended: false,
            parameterLimit: 50000,
        }));
        this.app.use(Sentry.Handlers.requestHandler());
        this.app.set('view engine', 'ejs');
    }
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setupApi();
            this.setupCustomMiddlewares();
            // this.setupFileUpload();
            this.setupRoutes();
            this.errorHandling();
            yield this.listen();
        });
    }
    // private static setupFileUpload() {
    //   this.app.use(
    //     fileUpload({
    //       useTempFiles: true,
    //       tempFileDir: path.resolve('uploads'),
    //     }),
    //   );
    // }
    static setupCustomMiddlewares() {
        this.app.use((req, res, next) => {
            next();
        });
    }
    static errorHandling() {
        this.app.use(Sentry.Handlers.errorHandler());
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.app.use((err, req, res, next) => {
            var _a, _b, _c;
            index_2.logger.info(err);
            if (err instanceof sequelize_1.ValidationError) {
                res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
                    message: (_c = (_b = (_a = err === null || err === void 0 ? void 0 : err.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : err.message,
                });
                return;
            }
            if (err instanceof sequelize_1.DatabaseError) {
                res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
                    message: err.message,
                });
                return;
            }
            res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        });
    }
    static setupRoutes() {
        this.app.use('/public', public_router_1.default);
        this.app.use('/api/v1', api_router_1.default);
        this.app.use('/forget', forgot_router_1.default);
    }
    static listen() {
        return __awaiter(this, void 0, void 0, function* () {
            // this is for BE team's reference that execute query is working properly.
            // uncomment below line and you will get result of postgresql in terminal
            // await UsersService.detail(null);
            this.app.listen(api_constants_1.API_PORT, () => (0, console_overrides_1.logColor)(console_overrides_1.ConsoleColor.FgBlue, `API running at http://localhost:${api_constants_1.API_PORT}`));
        });
    }
}
exports.Api = Api;
Api.app = (0, express_1.default)();


/***/ }),

/***/ "./src/api/auth/auth.controller.ts":
/*!*****************************************!*\
  !*** ./src/api/auth/auth.controller.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * @author aniket.trapasiya <aniket.trapasiya@dataprophets.in>
 * @description Patient Auth controller file
 */
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
const bcrypt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
const db_connection_1 = __webpack_require__(/*! ../../db/db.connection */ "./src/db/db.connection.ts");
const success_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/success */ "./src/lang/handlers/success.ts"));
const message_1 = __importDefault(__webpack_require__(/*! ../../lang/message */ "./src/lang/message.ts"));
const error_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/error */ "./src/lang/handlers/error.ts"));
const auth_service_1 = __importDefault(__webpack_require__(/*! ./auth.service */ "./src/api/auth/auth.service.ts"));
const query_1 = __importDefault(__webpack_require__(/*! ../helpers/query */ "./src/api/helpers/query.ts"));
const index_1 = __webpack_require__(/*! ../../helpers/utils/index */ "./src/helpers/utils/index.ts");
const JWT = __webpack_require__(/*! ../../api/api.jwt */ "./src/api/api.jwt.ts");
class AuthController {
    /**
     * @description signIn function: find user with email and check password are same or not
     * @return patient data with token
     */
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // const result = AuthService.signinSchema.blog.validate(req.body);
                // if (result.error) {
                //   return errorHandler(res, 400, result.error.details[0].message);
                // } else {
                const tokenData = yield auth_service_1.default.signIn(email, password);
                if (tokenData) {
                    if (yield bcrypt.compare(password, tokenData.password)) {
                        const { id } = tokenData;
                        const token = JWT.createToken(id);
                        if (token) {
                            tokenData.token = token;
                            const expired_on = Math.floor(Date.now()) + 24 * 60 * 60 * 1000;
                            const str = new Date(expired_on).toUTCString();
                            const saveAccesstoken = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.update_access_token, {
                                token: token,
                                exp: str,
                                id: tokenData.id,
                            }, 'update');
                            return (0, success_1.default)(res, 200, message_1.default.success.signInSuccessFully, tokenData);
                        }
                        return (0, error_1.default)(res, 400, message_1.default.error.tokenNotFound);
                    }
                    else
                        return (0, error_1.default)(res, 401, message_1.default.error.wrongPasswordError);
                }
                return (0, error_1.default)(res, 404, message_1.default.error.emailNotFoundError);
                // }
            }
            catch (error) {
                return (0, error_1.default)(res, 400, message_1.default.error.tokenNotFound);
            }
        });
    }
    /**
     * @description signUp function: create new user and create token then save details into Database
     * @return new patient data with token
     */
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = auth_service_1.default.createUserSchema.blog.validate(req.body);
                if (result.error) {
                    return (0, error_1.default)(res, 400, result.error.details[0].message);
                }
                else {
                    const emailValid = yield auth_service_1.default.email(req);
                    index_1.logger.info(emailValid, 'email');
                    if (emailValid === null) {
                        return (0, error_1.default)(res, 400, message_1.default.error.alreadyExistsError);
                    }
                    // const ValidUsername = await AuthService.username(req);
                    // logger.info(ValidUsername);
                    // if (ValidUsername === null) {
                    //   return errorHandler(
                    //     res,
                    //     400,
                    //     message.error.usernamealreadyExistsError,
                    //   );
                    // }
                    const tokenData = yield auth_service_1.default.signUp(res, req);
                    // logger.info(tokenData);
                    if (tokenData) {
                        return (0, success_1.default)(res, 200, message_1.default.success.signUpSuccessFully, tokenData);
                    }
                    // if (tokenData) {
                    //   const id = tokenData.id;
                    //   const token = JWT.createToken({
                    //     id,
                    //   });
                    // if (token) {
                    //   tokenData.token = token;
                    //   const expired_on = Math.floor(Date.now()) + 24 * 60 * 60 * 1000;
                    //   const str = new Date(expired_on).toUTCString();
                    //   const saveAccesstoken = await DBConnection.executeSampleQuery(
                    //     query.userQueries.insert_access_token,
                    //     {
                    //
                    //       token: token,
                    //       id: tokenData.id,
                    //       exp: str,
                    //     },
                    //     'insert',
                    //   );
                    //   return successHandler(
                    //     res,
                    //     200,
                    //     message.success.signUpSuccessFully,
                    //     tokenData,
                    //   );
                    // }
                    // await DBConnection.executeSampleQuery(
                    //   query.userQueries.delete_user_detail,
                    //   { id: tokenData.id },
                    //   'delete',
                    // );
                }
            }
            catch (err) {
                index_1.logger.info('error', err);
                (0, error_1.default)(res, 400, message_1.default.error.tokenNotFound);
            }
        });
    }
}
exports["default"] = AuthController;


/***/ }),

/***/ "./src/api/auth/auth.middlewares.ts":
/*!******************************************!*\
  !*** ./src/api/auth/auth.middlewares.ts ***!
  \******************************************/
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
exports.authenticate = void 0;
const error_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/error */ "./src/lang/handlers/error.ts"));
const message_1 = __importDefault(__webpack_require__(/*! ../../lang/message */ "./src/lang/message.ts"));
const db_connection_1 = __webpack_require__(/*! ../../db/db.connection */ "./src/db/db.connection.ts");
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
const query_1 = __importDefault(__webpack_require__(/*! ../helpers/query */ "./src/api/helpers/query.ts"));
const index_1 = __webpack_require__(/*! ../../helpers/utils/index */ "./src/helpers/utils/index.ts");
/**
 * @author aniket.trapasiya <aniket.trapasiya@dataprophets.in>
 * @description authenticate function: get Bearer token in header then authenticate token is valid or not for particular user
 * if valid then we have access for resources or else we don't have authorization
 * @return user details
 */
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = req.headers.authorization;
            if (token) {
                let scheme;
                [scheme, token] = req.headers.authorization.split(' ');
                if (scheme !== 'Bearer') {
                    return (0, error_1.default)(res, 403, message_1.default.error.invalidAuthorizationSchema);
                }
                if (!token) {
                    return (0, error_1.default)(res, 403, message_1.default.error.invalidAuthorizationToken);
                }
                else {
                    const tokenValidate = jsonwebtoken_1.default.verify(token, process.env.API_SECRET);
                    // logger.info(tokenValidate);
                    if (tokenValidate) {
                        const { id } = tokenValidate;
                        // logger.info('in', id);
                        const [user] = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.get_user, { id }, 'select');
                        index_1.logger.info(user);
                        if (user)
                            req.user = user[0];
                    }
                    else
                        return (0, error_1.default)(res, 401, message_1.default.error.invalidAuthorizationToken);
                }
            }
            else
                return (0, error_1.default)(res, 401, message_1.default.error.tokenIsRequired);
            next();
        }
        catch (_a) {
            (0, error_1.default)(res, 401, message_1.default.error.invalidAuthorizationToken);
        }
    });
}
exports.authenticate = authenticate;


/***/ }),

/***/ "./src/api/auth/auth.router.ts":
/*!*************************************!*\
  !*** ./src/api/auth/auth.router.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const api_helper_1 = __importDefault(__webpack_require__(/*! ../helpers/api.helper */ "./src/api/helpers/api.helper.ts"));
const auth_controller_1 = __importDefault(__webpack_require__(/*! ./auth.controller */ "./src/api/auth/auth.controller.ts"));
const authController = new auth_controller_1.default();
const router = (0, express_1.Router)();
/**
 * signIn and signUp router
 */
router.post('/signin', api_helper_1.default.wrapHandler(authController.signIn));
router.post('/signup', api_helper_1.default.wrapHandler(authController.signUp));
exports["default"] = router;


/***/ }),

/***/ "./src/api/auth/auth.service.ts":
/*!**************************************!*\
  !*** ./src/api/auth/auth.service.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * @author aniket.trapasiya <aniket.trapasiya@dataprophets.in>
 * @description Patient Auth service file
 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const joi_1 = __importDefault(__webpack_require__(/*! joi */ "joi"));
const db_connection_1 = __webpack_require__(/*! ../../db/db.connection */ "./src/db/db.connection.ts");
const bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ "bcrypt"));
const query_1 = __importDefault(__webpack_require__(/*! ../helpers/query */ "./src/api/helpers/query.ts"));
const index_1 = __webpack_require__(/*! ../../helpers/utils/index */ "./src/helpers/utils/index.ts");
class AuthService {
    /**
     * signIn authservice function
     * @param email - to check user exists or not
     * @returns user data
     */
    static signIn(email, password, expiryDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.get_user_by_mail, {
                email: email,
            }, 'select');
            if (user && user[0]) {
                return user[0];
            }
            else {
                return null;
            }
        });
    }
    static email(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const [users] = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.get_user_by_mail, { email: req.body.email });
            if (!users[0]) {
                return true;
            }
            return null;
        });
    }
    static username(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const [users] = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.get_user_by_username, { username: req.body.username });
            if (!users[0]) {
                return true;
            }
            return null;
        });
    }
}
exports["default"] = AuthService;
_a = AuthService;
/**
 * signUp authservice function
 * @param req.body.email - to check user exists or not
 * @returns added data of user
 */
AuthService.signUp = (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcrypt_1.default.hash(req.body.password, 10);
    const mail = req.body.email;
    // const gender = req.body.gender?.toLowerCase();
    // const dob = moment(
    //   `${req.body.dob} 00:00:00.00`,
    //   'MM/DD/YYYY hh:mm:ss.ms',
    // ).format('YYYY-MM-DD hh:mm:ss.ms');
    const saveuser = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.add_user_detail, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
    }, 'insert');
    // logger.info(saveuser);
    const [newUser] = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.get_user_by_mail, {
        email: mail,
    }, 'select');
    index_1.logger.info(newUser);
    if (newUser[0]) {
        return newUser[0];
    }
    return null;
});
AuthService.createUserSchema = {
    blog: joi_1.default.object()
        .keys({
        name: joi_1.default.string()
            .required()
            .regex(/^([a-zA-Z ]){2,30}$/),
        phone: joi_1.default.string().regex(/^[0-9]{9,14}$/),
        email: joi_1.default.string()
            .email()
            .lowercase()
            .required()
            .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i),
        password: joi_1.default.string()
            .required()
            .min(8)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/)
            .label('password')
            .messages({
            'string.min': 'Must have at least 8 characters',
            'object.regex': 'Must have at least 8 characters(User#@123)',
            'string.pattern.base': 'Password format is incorrect',
        }),
    })
        .with('name', 'email'),
};
AuthService.signinSchema = {
    blog: joi_1.default.object().keys({
        email: joi_1.default.string()
            .email()
            .lowercase()
            .required()
            .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i),
        password: joi_1.default.string()
            .required()
            .min(8)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/)
            .label('password')
            .messages({
            'string.min': 'Must have at least 8 characters',
            'object.regex': 'Must have at least 8 characters(User#@123)',
            'string.pattern.base': 'Password must have at least 8 character that include at least 1 Uppercase character,1 lowercase character,1 number and 1 special character(!@#$%^&*) in',
        }),
    }),
};


/***/ }),

/***/ "./src/api/client/client.controller.ts":
/*!*********************************************!*\
  !*** ./src/api/client/client.controller.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**patient controller
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Patient Profile controlle functions
 */
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
const client_service_1 = __importDefault(__webpack_require__(/*! ./client.service */ "./src/api/client/client.service.ts"));
const success_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/success */ "./src/lang/handlers/success.ts"));
const error_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/error */ "./src/lang/handlers/error.ts"));
const message_1 = __importDefault(__webpack_require__(/*! ../../lang/message */ "./src/lang/message.ts"));
const index_1 = __webpack_require__(/*! ../../helpers/utils/index */ "./src/helpers/utils/index.ts");
class ClientController {
    constructor() {
        // this.detail = this.detail.bind(this);
        // this.ProfileUpdate = this.ProfileUpdate.bind(this);
        // this.ViewFamily = this.ViewFamily.bind(this);
    }
    userList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userList = yield client_service_1.default.userList(req);
                if (userList)
                    return (0, success_1.default)(res, 200, message_1.default.success.getUserDataRetriveSuccessFully, userList);
                return (0, error_1.default)(res, 400, message_1.default.error.UserNotFound);
            }
            catch (err) {
                return (0, error_1.default)(res, 401, message_1.default.error.somethingWentWrongError);
            }
        });
    }
    userDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetail = yield client_service_1.default.userDetail(req);
                if (userDetail)
                    return (0, success_1.default)(res, 200, message_1.default.success.getUserDataRetriveSuccessFully, userDetail[0]);
                return (0, error_1.default)(res, 400, message_1.default.error.UserNotFound);
            }
            catch (err) {
                return (0, error_1.default)(res, 401, message_1.default.error.somethingWentWrongError);
            }
        });
    }
    userUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                name: req.body.name || '',
                phone: req.body.phone || '',
                userId: req.body.userId || '',
            };
            const result = yield client_service_1.default.userUpdate(data);
            if (result.rowCount > 0) {
                return (0, success_1.default)(res, 200, message_1.default.success.userEditSuccessFully);
            }
            return (0, error_1.default)(res, 400, message_1.default.error.somethingWentWrongError);
        });
    }
    userDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                userId: req.query.userId,
                is_active: false,
                is_delete: true,
            };
            console.log(data);
            const result = yield client_service_1.default.userDelete(data);
            if (!result.rowCount) {
                return (0, error_1.default)(res, 400, message_1.default.error.somethingWentWrongError);
            }
            return (0, success_1.default)(res, 200, message_1.default.success.userDeletSuccessFully);
        });
    }
    addClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = client_service_1.default.createClientSchema.blog.validate(req.body);
                if (result.error) {
                    return (0, error_1.default)(res, 400, result.error.details[0].message);
                }
                else {
                    const emailValid = yield client_service_1.default.email(req);
                    index_1.logger.info(emailValid);
                    if (emailValid === null) {
                        return (0, error_1.default)(res, 400, message_1.default.error.alreadyExistsError);
                    }
                    // const ValidUsername = await ClientService.username(req);
                    // logger.info(ValidUsername);
                    // if (ValidUsername === null) {
                    //   return errorHandler(
                    //     res,
                    //     400,
                    //     message.error.usernamealreadyExistsError,
                    //   );
                    // }
                    const tokenData = yield client_service_1.default.addClient(res, req);
                    if (tokenData) {
                        return (0, success_1.default)(res, 200, message_1.default.success.ClientAddSuccessFully, tokenData);
                    }
                    index_1.logger.info(tokenData);
                    // if (tokenData) {
                    //   const id = tokenData.id;
                    //   const token = JWT.createToken({
                    //     id,
                    //   });
                    // if (token) {
                    //   tokenData.token = token;
                    //   const expired_on = Math.floor(Date.now()) + 24 * 60 * 60 * 1000;
                    //   const str = new Date(expired_on).toUTCString();
                    //   const saveAccesstoken = await DBConnection.executeSampleQuery(
                    //     query.userQueries.insert_access_token,
                    //     {
                    //
                    //       token: token,
                    //       id: tokenData.id,
                    //       exp: str,
                    //     },
                    //     'insert',
                    //   );
                    //   return successHandler(
                    //     res,
                    //     200,
                    //     message.success.signUpSuccessFully,
                    //     tokenData,
                    //   );
                    // }
                    // await DBConnection.executeSampleQuery(
                    //   query.userQueries.delete_user_detail,
                    //   { id: tokenData.id },
                    //   'delete',
                    // );
                }
            }
            catch (err) {
                index_1.logger.info('error', err);
                (0, error_1.default)(res, 400, message_1.default.error.tokenNotFound);
            }
        });
    }
}
exports["default"] = ClientController;


/***/ }),

/***/ "./src/api/client/client.router.ts":
/*!*****************************************!*\
  !*** ./src/api/client/client.router.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**patientdetails routers
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description:Add all routers for Patient Profile details with show family member is here.
 */
const express_1 = __webpack_require__(/*! express */ "express");
const client_controller_1 = __importDefault(__webpack_require__(/*! ./client.controller */ "./src/api/client/client.controller.ts"));
const clientController = new client_controller_1.default();
const router = (0, express_1.Router)({ mergeParams: true });
router.route('/clientList').get(clientController.userList);
router.route('/clientDetail').get(clientController.userDetail);
router.route('/updateClient').put(clientController.userUpdate);
router.route('/deleteClient').delete(clientController.userDelete);
router.route('/addClient').post(clientController.addClient);
exports["default"] = router;


/***/ }),

/***/ "./src/api/client/client.service.ts":
/*!******************************************!*\
  !*** ./src/api/client/client.service.ts ***!
  \******************************************/
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
/** userdetails services
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description:user Profile details services is here.
 */
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const db_connection_1 = __webpack_require__(/*! ../../db/db.connection */ "./src/db/db.connection.ts");
const query_1 = __importDefault(__webpack_require__(/*! ../helpers/query */ "./src/api/helpers/query.ts"));
const joi_1 = __importDefault(__webpack_require__(/*! joi */ "joi"));
const bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ "bcrypt"));
const moment_1 = __importDefault(__webpack_require__(/*! moment */ "moment"));
const generator = __webpack_require__(/*! generate-password */ "generate-password");
const client_mail_helper_1 = __importDefault(__webpack_require__(/*! ../../view/client.mail.helper */ "./src/view/client.mail.helper.ts"));
const message_1 = __importDefault(__webpack_require__(/*! ../../lang/message */ "./src/lang/message.ts"));
const forgot_config_1 = __webpack_require__(/*! ../forgotPassword/forgot.config */ "./src/api/forgotPassword/forgot.config.ts");
const index_1 = __webpack_require__(/*! ../../helpers/utils/index */ "./src/helpers/utils/index.ts");
class ClientService {
    /**Get userdetails services
     * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
     * @description:GET user Profile details using Email.
     * @return: all the users details you need.
     */
    static email(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const [users] = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.get_user_by_mail, { email: req.body.email });
            if (!users[0]) {
                return true;
            }
            return null;
        });
    }
    static username(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const [users] = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.get_user_by_username, { username: req.body.username });
            if (!users[0]) {
                return true;
            }
            return null;
        });
    }
    static userList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // logger.info('userid', req.user.id);
                const [userList] = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.userList, {});
                if (userList)
                    return userList;
                return null;
            }
            catch (err) {
                return null;
            }
        });
    }
    static userDetail(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [userDetail] = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.userDetail, {
                    userId: req.query.userId,
                });
                if (userDetail)
                    return userDetail;
                return null;
            }
            catch (err) {
                return null;
            }
        });
    }
    static userUpdate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            const update = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.userUpdate, Object.assign({}, data), sequelize_1.QueryTypes.UPDATE);
            return update[1];
        });
    }
    static userDelete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            const update = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.userDelete, Object.assign(Object.assign({}, data), { userId: data.userId }), sequelize_1.QueryTypes.DELETE);
            return update[1];
        });
    }
    /**Update userdetails controller
     * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
     * @description:Update user Profile details with update query.
     * @return: updated row with data.
     */
    static ProfileUpdate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            const update = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.update_user, Object.assign({}, data), sequelize_1.QueryTypes.UPDATE);
            return update[1];
        });
    }
}
exports["default"] = ClientService;
_a = ClientService;
ClientService.addClient = (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // const hash = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email.toLowerCase();
    const gender = (_b = req.body.gender) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    const genSinglePassword = generator.generate({
        length: 10,
        numbers: true,
        lowercase: true,
        uppercase: true,
        symbols: true,
        exclude: './?~(){}][|-_+=`;:"^<>',
        excludeSimilarCharacters: true,
        strict: true,
    });
    const password = yield bcrypt_1.default.hash(genSinglePassword, 10);
    const dob = (0, moment_1.default)(`${req.body.dob} 00:00:00.00`, 'MM/DD/YYYY hh:mm:ss.ms').format('YYYY-MM-DD hh:mm:ss.ms');
    console.log(req.body);
    const saveuser = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.add_client_detail, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password,
        createdAt: new Date(),
    }, 'insert');
    if (saveuser) {
        yield (0, client_mail_helper_1.default)({
            email: req.body.email.toLowerCase(),
            password: genSinglePassword,
            mailLink: forgot_config_1.forgotConfig.mailLink,
            googleLink: forgot_config_1.forgotConfig.googleFormLink,
        }, 'AddClient.ejs', { email: req.body.email.toLowerCase(), password: genSinglePassword }, message_1.default.subject.welcomeToAHS);
    }
    const [newUser] = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.get_user_by_mail, {
        email: req.body.email,
    }, 'select');
    index_1.logger.info(newUser);
    if (newUser[0]) {
        return newUser[0];
    }
    return null;
});
ClientService.createUserSchema = {
    blog: joi_1.default.object()
        .keys({
        username: joi_1.default.string().required(),
        // patient_unique_id: Joi.string().required(),
        first_name: joi_1.default.string()
            .required()
            .regex(/^([a-zA-Z ]){2,30}$/),
        // middle_name: Joi.string()
        //   .required()
        //   .regex(/^([a-zA-Z ]){1,30}$/),
        last_name: joi_1.default.string()
            .required()
            .regex(/^([a-zA-Z ]){2,30}$/),
        street: joi_1.default.string(),
        phone: joi_1.default.string().regex(/^[0-9]{9,14}$/),
        email: joi_1.default.string()
            .email()
            .lowercase()
            .required()
            .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i),
        password: joi_1.default.string()
            .required()
            .min(8)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/)
            .label('password')
            .messages({
            'string.min': 'Must have at least 8 characters',
            'object.regex': 'Must have at least 8 characters(User#@123)',
            'string.pattern.base': 'Password format is incorrect',
        }),
    })
        .with('firstName', 'email'),
};
ClientService.createClientSchema = {
    blog: joi_1.default.object()
        .keys({
        name: joi_1.default.string()
            .required()
            .regex(/^([a-zA-Z ]){2,30}$/),
        phone: joi_1.default.string().regex(/^[0-9]{9,14}$/),
        email: joi_1.default.string()
            .email()
            .lowercase()
            .required()
            .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i),
    })
        .with('name', 'email'),
};


/***/ }),

/***/ "./src/api/forgotPassword/create.ts":
/*!******************************************!*\
  !*** ./src/api/forgotPassword/create.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/** create OTP
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: using otp-generator create new otp for sending mail
 */
const otp_generator_1 = __importDefault(__webpack_require__(/*! otp-generator */ "otp-generator"));
const generateOTP = () => {
    const OTP = otp_generator_1.default.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
    return OTP;
};
exports["default"] = generateOTP;


/***/ }),

/***/ "./src/api/forgotPassword/forgot.config.ts":
/*!*************************************************!*\
  !*** ./src/api/forgotPassword/forgot.config.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.forgotConfig = void 0;
/** send mail config file
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: mail send using multer, add config in this file.
 */
exports.forgotConfig = {
    accessKeyId: String(process.env.S3_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.S3_SECRET_ACCESS_KEY),
    bucketName: String(process.env.AWS_S3_BUCKET),
    Region: String(process.env.S3_REGION),
    folderName: String(process.env.AWS_S3_FOLDER),
    FilesACL: String(process.env.S3_ACL),
    userMail: String(process.env.USER_MAIL),
    password: String(process.env.PASSWORD),
    sid: String(process.env.SID),
    authToken: String(process.env.AUTH_TOKEN),
    twilioMo: String(process.env.TWILIO_MO),
    loginLink: String(process.env.LOGIN_LINK),
    forgetLink: String(process.env.FORGET_LINK),
    mailLink: String(process.env.MAIL_LINK),
    googleFormLink: String(process.env.GOOGLE_FORM_LINK),
};


/***/ }),

/***/ "./src/api/forgotPassword/forgot.controller.ts":
/*!*****************************************************!*\
  !*** ./src/api/forgotPassword/forgot.controller.ts ***!
  \*****************************************************/
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
const forgot_service_1 = __importDefault(__webpack_require__(/*! ./forgot.service */ "./src/api/forgotPassword/forgot.service.ts"));
const success_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/success */ "./src/lang/handlers/success.ts"));
const forgot_config_1 = __webpack_require__(/*! ./forgot.config */ "./src/api/forgotPassword/forgot.config.ts");
const message_1 = __importDefault(__webpack_require__(/*! ../../lang/message */ "./src/lang/message.ts"));
const bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ "bcrypt"));
const error_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/error */ "./src/lang/handlers/error.ts"));
const mail_1 = __webpack_require__(/*! ./mail */ "./src/api/forgotPassword/mail.ts");
const mail_helper_1 = __importDefault(__webpack_require__(/*! ../../view/mail.helper */ "./src/view/mail.helper.ts"));
const create_1 = __importDefault(__webpack_require__(/*! ./create */ "./src/api/forgotPassword/create.ts"));
const forgot_validation_1 = __webpack_require__(/*! ../helpers/validation/forgot.validation */ "./src/api/helpers/validation/forgot.validation.ts");
const index_1 = __webpack_require__(/*! ../../helpers/utils/index */ "./src/helpers/utils/index.ts");
function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60 * 1000);
}
class ForgotController {
    constructor() {
        this.forgot = this.forgot.bind(this);
        this.verification = this.verification.bind(this);
        this.newPassword = this.newPassword.bind(this);
    }
    // forgot Password Request //
    /**send Mail & OTP Generate
     * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
     * @description: send mail for get OTP
     * @returns: send OTP in mail
     */
    forgot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const otpGenerated = (0, create_1.default)();
            const now = new Date();
            const expire_time = AddMinutesToDate(now, 15);
            if (!email)
                return (0, error_1.default)(res, 400, message_1.default.error.emailRequiredError);
            const emailValid = yield forgot_service_1.default.email(req);
            // logger.info(emailValid);
            if (emailValid === null) {
                return (0, error_1.default)(res, 400, message_1.default.error.notRegisteredError);
            }
            const result = yield forgot_service_1.default.forgot(email, otpGenerated, expire_time);
            try {
                if (result) {
                    yield (0, mail_helper_1.default)({
                        email,
                        otp: otpGenerated,
                        mailLink: forgot_config_1.forgotConfig.mailLink,
                        googleLink: forgot_config_1.forgotConfig.googleFormLink,
                    }, 'forget.ejs', message_1.default.subject.welcomeToAHS);
                    return (0, success_1.default)(res, 200, message_1.default.success.sendMail);
                }
                return (0, error_1.default)(res, 401, message_1.default.error.emailNotFoundError);
                // otherwise we need to create a temporary token that expires in 10 mins
            }
            catch (err) {
                index_1.logger.info(err);
                return (0, error_1.default)(res, 404, message_1.default.error.somethingWentWrongError);
            }
        });
    }
    resend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const otpGenerated = (0, create_1.default)();
            const now = new Date();
            const expire_time = AddMinutesToDate(now, 15);
            if (!email)
                return (0, error_1.default)(res, 400, message_1.default.error.emailRequiredError);
            const result = yield forgot_service_1.default.resend(email, otpGenerated, expire_time);
            try {
                if (result) {
                    yield (0, mail_1.sendMailOtp)({
                        to: email,
                        otp: otpGenerated,
                        expire_time,
                    });
                    return (0, success_1.default)(res, 200, message_1.default.success.resendMail);
                }
                return (0, error_1.default)(res, 401, message_1.default.error.emailNotFoundError);
                // otherwise we need to create a temporary token that expires in 10 mins
            }
            catch (err) {
                index_1.logger.info(err);
                return (0, error_1.default)(res, 404, message_1.default.error.somethingWentWrongError);
            }
        });
    }
    // otp verification //
    /**OTP verify function
     * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
     * @description: Get otp from database & match OTP which is user enterd
     * @returns: success msg
     */
    verification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyOtp = parseInt(req.body.otp);
            index_1.logger.info(verifyOtp);
            const { email } = req.body;
            if (!email)
                return (0, error_1.default)(res, 400, message_1.default.error.emailRequiredError);
            if (!verifyOtp) {
                return (0, error_1.default)(res, 400, message_1.default.error.otpNotFound);
            }
            try {
                if (verifyOtp) {
                    const result = yield forgot_service_1.default.verify(verifyOtp, email);
                    if (result) {
                        return (0, success_1.default)(res, 200, message_1.default.success.otpVerifySuccessFully);
                    }
                    return (0, error_1.default)(res, 400, message_1.default.error.wrongOtpError);
                }
            }
            catch (err) {
                return (0, error_1.default)(res, 404, message_1.default.error.somethingWentWrongError);
            }
        });
    }
    // send mail for Forgot Password //
    /**send Mail & send dynamic URL
     * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
     * @description:IF OTP verified than send mail for forgot password with dynamic URL
     * @returns: send dynamic URL in mail
     */
    forget(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const now = new Date();
            const expire_time = AddMinutesToDate(now, 15);
            const encrypted = yield bcrypt_1.default.hash(email, 10);
            const BaseURL = forgot_config_1.forgotConfig.forgetLink;
            const mainURL = `${encrypted}`;
            const link = `${BaseURL}/forgetpassword/${mainURL}`;
            if (!email) {
                return (0, error_1.default)(res, 401, message_1.default.error.emailRequiredError);
            }
            const result = yield forgot_service_1.default.forget(email, link, expire_time);
            try {
                if (result) {
                    yield (0, mail_helper_1.default)({
                        email,
                        link,
                        mailLink: forgot_config_1.forgotConfig.mailLink,
                        googleLink: forgot_config_1.forgotConfig.googleFormLink,
                    }, 'forget.ejs', message_1.default.subject.welcomeToAHS);
                    return (0, success_1.default)(res, 200, message_1.default.success.sendMail);
                }
                return (0, error_1.default)(res, 402, message_1.default.error.emailNotFoundError);
                // otherwise we need to create a temporary token that expires in 10 mins
            }
            catch (err) {
                return (0, error_1.default)(res, 404, message_1.default.error.somethingWentWrongError);
            }
        });
    }
    // Link verification //
    /**Link verify function
     * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
     * @description: Get verifylink from database & match Link which is user called
     * @returns: success msg
     */
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyLink = req.body.Link;
            if (!verifyLink) {
                return (0, error_1.default)(res, 402, message_1.default.error.UrlNotFound);
            }
            try {
                if (verifyLink) {
                    const result = yield forgot_service_1.default.verify_link(verifyLink);
                    if (result) {
                        return (0, success_1.default)(res, 200, message_1.default.success.LinkVerifySuccessFully);
                    }
                    return (0, error_1.default)(res, 401, message_1.default.error.wrongUrlError);
                }
            }
            catch (err) {
                return (0, error_1.default)(res, 404, message_1.default.error.somethingWentWrongError);
            }
        });
    }
    // Set Newpassword //
    /** create new password
     * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
     * @description: using mail link user redirect to reset password page & add his new password
     * @returns: new password
     */
    newPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const { newPassword } = req.body;
            const validate = yield forgot_validation_1.new_password.validateAsync(req.body);
            const encryptPassword = yield bcrypt_1.default.hash(newPassword, 10);
            if (!email)
                return (0, error_1.default)(res, 400, message_1.default.error.emailRequiredError);
            const emailValid = yield forgot_service_1.default.email(req);
            // logger.info(emailValid);
            if (emailValid === null) {
                return (0, error_1.default)(res, 400, message_1.default.error.notRegisteredError);
            }
            if (newPassword) {
                const result = yield forgot_service_1.default.newPass(email, encryptPassword);
                index_1.logger.info(result);
                if (result[1].rowCount > 0) {
                    return (0, success_1.default)(res, 200, message_1.default.success.getPasswordResetSuccessfully);
                }
                return (0, error_1.default)(res, 400, message_1.default.error.notRegisteredError);
            }
            return (0, error_1.default)(res, 401, message_1.default.error.passwordNotFoundError);
        });
    }
}
exports["default"] = ForgotController;


/***/ }),

/***/ "./src/api/forgotPassword/forgot.router.ts":
/*!*************************************************!*\
  !*** ./src/api/forgotPassword/forgot.router.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**forgot Password with send mail function routers
 * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: Forgot Password routers with his params
 */
const express_1 = __webpack_require__(/*! express */ "express");
const forgot_controller_1 = __importDefault(__webpack_require__(/*! ./forgot.controller */ "./src/api/forgotPassword/forgot.controller.ts"));
const forgotController = new forgot_controller_1.default();
const router = (0, express_1.Router)({ mergeParams: true });
router.route('/forget').post(forgotController.forgot);
router.route('/resendOtp').put(forgotController.resend);
router.route('/verify').put(forgotController.verification);
router.route('/forgot').post(forgotController.forget);
router.route('/verifyLink').put(forgotController.verify);
router.route('/newPassword').put(forgotController.newPassword);
exports["default"] = router;


/***/ }),

/***/ "./src/api/forgotPassword/forgot.service.ts":
/*!**************************************************!*\
  !*** ./src/api/forgotPassword/forgot.service.ts ***!
  \**************************************************/
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
/**forgot Password with send mail function services
 * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: Forgot Password services
 */
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const db_connection_1 = __webpack_require__(/*! ../../db/db.connection */ "./src/db/db.connection.ts");
const query_1 = __importDefault(__webpack_require__(/*! ../helpers/query */ "./src/api/helpers/query.ts"));
const query_2 = __importDefault(__webpack_require__(/*! ../helpers/query */ "./src/api/helpers/query.ts"));
const index_1 = __webpack_require__(/*! ../../helpers/utils/index */ "./src/helpers/utils/index.ts");
class PasswordService {
    /**send Mail & OTP Generate
     * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
     * @description: send mail for get OTP
     * @returns: send OTP in mail
     */
    static forgot(email, otpGenerated, expire_time) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            try {
                const getOtp = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.forgetQueries.getOtp, {
                    email: email,
                    otpGenerated: otpGenerated,
                    expire_time: expire_time,
                }, sequelize_1.QueryTypes.SELECT);
                return getOtp;
            }
            catch (err) {
                index_1.logger.info(err, 'error');
                return null;
            }
        });
    }
    static email(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [users] = yield db_connection_1.DBConnection.executeSampleQuery(query_2.default.userQueries.get_user_by_mail, { email: req.body.email });
                if (!users[0]) {
                    return null;
                }
                return true;
            }
            catch (err) {
                index_1.logger.info(err, 'error');
                return null;
            }
        });
    }
    /**send Mail & OTP Generate
     * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
     * @description: send mail for resend OTP
     * @returns: send OTP in mail
     */
    static resend(email, otpGenerated, expire_time) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            const forgotPaasword = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.forgetQueries.forgot, { email }, sequelize_1.QueryTypes.SELECT);
            if (forgotPaasword[0] &&
                forgotPaasword[0].length > 0 &&
                email === forgotPaasword[0][0].email) {
                const getOtp = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.forgetQueries.resendOtp, {
                    is_verified: false,
                    email: email,
                    otpGenerated: otpGenerated,
                    expire_time: expire_time,
                }, sequelize_1.QueryTypes.UPDATE);
                return getOtp;
            }
        });
    }
    /**OTP verify function
     * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
     * @description: Get otp from database & match OTP which is user enterd
     * @returns: success msg
     */
    static verify(verifyOtp, email) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            const Otp = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.forgetQueries.Otp, {
                verifyOtp,
                email,
            }, sequelize_1.QueryTypes.SELECT);
            index_1.logger.info(Otp);
            if (Otp[0] &&
                Otp[0].length > 0 &&
                verifyOtp === Otp[0][0].otp &&
                Otp[0][0].expire_time > Date.now() &&
                Otp[0][0].is_verified === false) {
                const Verified = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.forgetQueries.Verified, {
                    verifyOtp,
                    is_verified: true,
                }, sequelize_1.QueryTypes.UPDATE);
                return Verified;
            }
            return null;
        });
    }
    /**send Mail & send dynamic URL
     * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
     * @description:IF OTP verified than send mail for forgot password with dynamic URL
     * @returns: send dynamic URL in mail
     */
    static forget(email, link, expire_time) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            const forgotPaasword = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.forgetQueries.forgot_pass, {
                email: email,
            }, sequelize_1.QueryTypes.SELECT);
            const getLink = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.forgetQueries.InsertLink, {
                email: email,
                link: link,
                expire_time: expire_time,
            }, sequelize_1.QueryTypes.INSERT);
            return forgotPaasword;
        });
    }
    /**verifyLink services
     * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
     * @description: Get verifyLink from database & match verifyLink which is user enterd
     * @returns: success msg
     */
    static verify_link(verifyLink) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            const Link = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.forgetQueries.getLink, {
                verifyLink,
                is_called: false,
            }, sequelize_1.QueryTypes.SELECT);
            if (Link[0] &&
                Link[0].length > 0 &&
                verifyLink === Link[0][0].reset_password_url &&
                Link[0][0].expire_time > Date.now()) {
                const Verified = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.forgetQueries.verify_link, {
                    verifyLink,
                    is_called: true,
                }, sequelize_1.QueryTypes.UPDATE);
                return Verified;
            }
        });
    }
    /** create new password
     * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
     * @description: using mail link user redirect to reset password page & add his new password
     * @returns: new password
     */
    static newPass(email, encryptPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // send response from here
                const newPaasword = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.forgetQueries.new_pass, {
                    email: email,
                    encryptPassword: encryptPassword,
                }, sequelize_1.QueryTypes.UPDATE);
                return newPaasword;
            }
            catch (err) {
                index_1.logger.info(err, 'error');
                return null;
            }
        });
    }
}
exports["default"] = PasswordService;


/***/ }),

/***/ "./src/api/forgotPassword/mail.ts":
/*!****************************************!*\
  !*** ./src/api/forgotPassword/mail.ts ***!
  \****************************************/
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
exports.sendMailOtp = void 0;
/** send mail for otp
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: using nodemailer send mail with html design.
 */
const nodemailer_1 = __webpack_require__(/*! nodemailer */ "nodemailer");
const transporter = (0, nodemailer_1.createTransport)({
    service: 'gmail',
    auth: {
        user: 'dummy.test@dataprophets.in',
        pass: 'Dptest@123',
    },
});
/** send mail with html data
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: using nodemailer send mail with html data, add user mail & passord
 */
function sendMailOtp(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const info = yield transporter.sendMail({
                from: 'dummy.test@dataprophets.in',
                to: params.to,
                subject: 'Welcome to Advance Health System',
                html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the Advance Health System.</h2>
        <p style="margin-bottom: 30px;">Your OTP for verification is  <b>${params.otp}</b>. Please do not share your OTP with anyone .</p>
        <p style="margin-top:50px;">This is a system generated e - mail and please do not reply .For Any queries Contact info@dataprophets.in. </p>
        <tr>
              <td class="td_pen">
                <p>Cheers,<br />Advance Health System Team.</p>
              </td>
            </tr>
      </div>
    `,
            });
            return info;
        }
        catch (error) {
            return false;
        }
    });
}
exports.sendMailOtp = sendMailOtp;


/***/ }),

/***/ "./src/api/helpers/api.helper.ts":
/*!***************************************!*\
  !*** ./src/api/helpers/api.helper.ts ***!
  \***************************************/
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
const express_promise_wrap_1 = __webpack_require__(/*! express-promise-wrap */ "express-promise-wrap");
class ApiHelper {
    static wrapHandler(handler, forceNext = false) {
        return (0, express_promise_wrap_1.wrap)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let nextCalled = false;
            const result = yield Promise.resolve(handler(req, res, () => {
                nextCalled = true;
                return next();
            }));
            if (nextCalled)
                return;
            if (forceNext)
                return next();
            return result;
        }));
    }
}
exports["default"] = ApiHelper;


/***/ }),

/***/ "./src/api/helpers/query.ts":
/*!**********************************!*\
  !*** ./src/api/helpers/query.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**Reset user sign-in Password queries
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Get old password from user table and update new added password in user table.
 */
const resetQueries = {
    get_pass: `select password from "user" where "id"= :id;`,
    reset_pass: `UPDATE public."user" SET "password"= :encryptPassword where "id"= :id;`,
};
/**forgot Password queries
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: Forgot Password query for send mail , get OTP, verify OTP, get email , forgot password link, new password
 */
const forgetQueries = {
    forgot: `SELECT "email" from public."user" where "email"= :email`,
    getOtp: `INSERT INTO "otp"("email","otp","expire_time") VALUES (:email,:otpGenerated,:expire_time);`,
    resendOtp: `UPDATE public."otp" SET  "otp"=:otpGenerated,"is_verified"= :is_verified,"expire_time" = :expire_time where "email"= :email`,
    Otp: `SELECT "otp", "is_verified" ,"expire_time" from public."otp" where "otp"= :verifyOtp and "email" = :email order by "createdAt" desc limit 1 ;`,
    Email: `SELECT "email" from public."commomn" where "uuid"= :uuid`,
    Verified: `UPDATE public."otp" SET is_verified= :is_verified WHERE "otp" = :verifyOtp;`,
    forgot_pass: `SELECT "email" from public."user" where "email"= :email;`,
    new_pass: `UPDATE public."user" SET "password"= :encryptPassword where "email"= :email`,
    verify_link: `UPDATE public."reset_password_url" SET is_called= :is_called WHERE "reset_password_url" = :verifyLink;`,
    getLink: `SELECT "reset_password_url", "expire_time" from public."reset_password_url" where "reset_password_url"= :verifyLink and "is_called" = :is_called;`,
    InsertLink: `INSERT INTO "reset_password_url"("email","reset_password_url","expire_time") VALUES (:email, :link, :expire_time);`,
};
/**users Related queries
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Get user profile details using select query, update users details using update query & view family member list in user profile using select query.
 */
const userQueries = {
    get_user: `SELECT id, uuid, name, email, phone, profile_url as "profileUrl"
  FROM public."user" 
  WHERE "id"= :id;`,
    user_update: `UPDATE public."user" SET "profile_url" = :files WHERE "id"= :id;`,
    update_user_with_image: `UPDATE public."user"
	SET name=:name, phone=:phone, profile_url = :profile where "id"= :userId;`,
    update_user: `UPDATE public."user"
	SET name=:name, phone=:phone where "id"= :userId;`,
    view_family: `SELECT relation.relation, user.first_name, user.middle_name, user.last_name, user.user_unique_id FROM public."user_relation" as relation INNER JOIN public."user" as user ON relation.family_member_id = user.user_unique_id where relation.user_id= :user_id 
  ORDER BY user_id DESC
  limit :page_size OFFSET :page_no;`,
    select_user_uuid: `select "uuid" from public."user" where "user_unique_id"= :userId; `,
    link_family: `INSERT INTO public."user_relation"(uuid, relation, "user_id", "family_member_id", created_by, updated_by)
        VALUES (:relation, :user_id, :family_id, :created_by, :updated_by); `,
    update_family: `UPDATE public."user_relation" SET "relation" = :relation where "user_id" = :user_id and "family_member_id" = :family_id;`,
    find_linked_family_member: `select * from public."user_relation" where "relation"=:relation and "user_id"=:user_id and "family_member_id" = :family_id;`,
    find_family_member: `select "user_unique_id", "first_name", "middle_name", "last_name" from "user" where LOWER("user_unique_id") = LOWER(:user_unique_id) ;`,
    find_last_unique_id: `SELECT max(user_unique_id) as last_unique_id FROM public.user where LOWER("state") = LOWER(:state);`,
    find_state: `select state_code from public."state" where LOWER("state_name")= LOWER(:state)`,
    get_users: `select * from user where id = :id;`,
    get_user_by_mail: 'select id, role_id, name, email, phone, password from public."user" where email = :email',
    get_user_by_username: 'select * from public."user" where username = :username',
    find_linked_member: 'select exists(select * from "user_relation" where "user_id"= :userId and "family_member_id"= :familyId)',
    delete_user_detail: `DELETE FROM public."user" WHERE id = :id`,
    add_user_detail: 'INSERT INTO public."user"("role_id","name", "email", "phone", "password") VALUES(2, :name, :email, :phone, :password)',
    add_client_detail: `INSERT INTO public."user"("role_id", "name", "email", "phone", "password","createdAt") VALUES(2, :name, :email, :phone, :password, :createdAt)`,
    get_access_token: `select * from access_tokens WHERE access_token = :token`,
    update_access_token: `UPDATE access_tokens SET "access_token" = :token,expired_on = :exp WHERE user_id = :id`,
    insert_access_token: `INSERT INTO public."access_tokens"("access_token","user_id","expired_on") VALUES(:token,:id,:exp)`,
    userList: `SELECT uuid, role_id, name, email, phone, profile_url
	FROM public."user" where role_id = 2 and is_delete = false and is_active = true;`,
    userDetail: `SELECT uuid, role_id, name, email, phone, profile_url
	FROM public."user" where role_id = 2 and uuid = :userId;`,
    userUpdate: `UPDATE public."user"
	SET name=:name, phone=:phone
	WHERE role_id = 2 and uuid = :userId;`,
    userDelete: `UPDATE public."user"
	SET is_delete=:is_delete, is_active=:is_active
	WHERE role_id = 2 and uuid = :userId;`,
    insert_document: `INSERT INTO public.document(
    file_name, file_type, file_key, location, user_id, created_by)
   VALUES (:fileName, :fileType, :key, :location, :userId, :userId)
   returning file_name;`,
    find_documents: `SELECT file_key as "Key"
	FROM public.document
    where user_id = :userId;`,
    removeFile: `DELETE FROM public.document
    WHERE user_id = :userId;`,
};
const employeeQueries = {
    get_employee: `select * from employee where id = :id`,
};
exports["default"] = { userQueries, forgetQueries, employeeQueries, resetQueries };


/***/ }),

/***/ "./src/api/helpers/validation/forgot.validation.ts":
/*!*********************************************************!*\
  !*** ./src/api/helpers/validation/forgot.validation.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.new_password = exports.forgotPassword = void 0;
/**forgotpassword validation using joi
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: add forgotpassword validation in forgot password controller.create this validation using joi.
 */
const joi_1 = __importDefault(__webpack_require__(/*! joi */ "joi"));
const { object, string } = joi_1.default.types();
exports.forgotPassword = object.keys({
    email: string
        .email()
        .lowercase()
        .required()
        .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i),
});
exports.new_password = object.keys({
    email: string
        .email()
        .lowercase()
        .required()
        .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i),
    newPassword: string
        .required()
        .min(8)
        .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)
        .label('password')
        .messages({
        'string.min': 'Must have at least 8 characters',
        'object.regex': 'Must have at least 8 characters(User#@123)',
        'string.pattern.base': 'Password must have at least 8 character that include at least 1 Uppercase character,1 lowercase character,1 number and 1 special character(!@#$%^&*) in',
    }),
});


/***/ }),

/***/ "./src/api/public/public.controller.ts":
/*!*********************************************!*\
  !*** ./src/api/public/public.controller.ts ***!
  \*********************************************/
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
const success_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/success */ "./src/lang/handlers/success.ts"));
const welcome = () => {
    return;
};
/**welcome to AHS
 * @auther JD9898<jaydeep.malaviya@dataprophets.in>
 * @description:Welcome to Advance health care system.
 *
 */
class publicController {
    static welcome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            welcome();
            return (0, success_1.default)(res, 200, `Welcome to the ${process.env.APP_NAME}, running on port ${process.env.PORT}!`);
        });
    }
}
exports["default"] = publicController;


/***/ }),

/***/ "./src/api/public/public.router.ts":
/*!*****************************************!*\
  !*** ./src/api/public/public.router.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const api_swagger_1 = __importDefault(__webpack_require__(/*! ../api.swagger */ "./src/api/api.swagger.ts"));
const public_controller_1 = __importDefault(__webpack_require__(/*! ./public.controller */ "./src/api/public/public.controller.ts"));
const router = (0, express_1.Router)();
router.route('/welcome').get(public_controller_1.default.welcome);
router.use('/docs', api_swagger_1.default.getMiddlewares());
exports["default"] = router;


/***/ }),

/***/ "./src/api/resetPassword/reset.controller.ts":
/*!***************************************************!*\
  !*** ./src/api/resetPassword/reset.controller.ts ***!
  \***************************************************/
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
const reset_service_1 = __importDefault(__webpack_require__(/*! ./reset.service */ "./src/api/resetPassword/reset.service.ts"));
const bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ "bcrypt"));
const success_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/success */ "./src/lang/handlers/success.ts"));
const message_1 = __importDefault(__webpack_require__(/*! ../../lang/message */ "./src/lang/message.ts"));
const error_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/error */ "./src/lang/handlers/error.ts"));
class EmployeeController {
    constructor() {
        this.resetPassword = this.resetPassword.bind(this);
    }
    /**Reset Password services
     * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
     * @description: Create ResetPassword services,first get ols password than match old password & newly added password, if new password same as ols password you get error, old password & new password must be uniqe, encript new password and store in database .
     * @return: updated new Password.
     */
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const oldPassword = req.body.old_password;
                const newPassword = req.body.newPassword;
                // const validate = await update_password.validateAsync(req.body);
                const encryptPassword = yield bcrypt_1.default.hash(newPassword, 10);
                const result = yield reset_service_1.default.resetPassword(encryptPassword, req);
                if (result[1].rowCount > 0) {
                    return (0, success_1.default)(res, 200, message_1.default.success.getPasswordResetSuccessfully);
                }
                return (0, error_1.default)(res, 401, message_1.default.error.wrongPasswordError);
            }
            catch (err) {
                return (0, error_1.default)(res, 404, message_1.default.error.somethingWentWrongError);
            }
        });
    }
}
exports["default"] = EmployeeController;


/***/ }),

/***/ "./src/api/resetPassword/reset.router.ts":
/*!***********************************************!*\
  !*** ./src/api/resetPassword/reset.router.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**Reset patient sign-in Password routers
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Create ResetPassword routers is here.
 */
const express_1 = __webpack_require__(/*! express */ "express");
const reset_controller_1 = __importDefault(__webpack_require__(/*! ./reset.controller */ "./src/api/resetPassword/reset.controller.ts"));
const passwordController = new reset_controller_1.default();
const router = (0, express_1.Router)({ mergeParams: true });
router.route('/reset_password').put(passwordController.resetPassword);
exports["default"] = router;


/***/ }),

/***/ "./src/api/resetPassword/reset.service.ts":
/*!************************************************!*\
  !*** ./src/api/resetPassword/reset.service.ts ***!
  \************************************************/
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
/**Reset patient sign-in Password services
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Create ResetPassword services.
 */
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const db_connection_1 = __webpack_require__(/*! ../../db/db.connection */ "./src/db/db.connection.ts");
const query_1 = __importDefault(__webpack_require__(/*! ../helpers/query */ "./src/api/helpers/query.ts"));
class PasswordService {
    /**Reset Password services
     * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
     * @description: Create ResetPassword services,first get ols password than match old password & newly added password, if new password same as ols password you get error, old password & new password must be uniqe, encript new password and store in database .
     * @return: updated new Password.
     */
    static resetPassword(
    // oldPassword: string,
    encryptPassword, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // send response from here
                // const old_password: any = await DBConnection.executeSampleQuery(
                //   resetQueries.resetQueries.get_pass,
                //   {
                //     id: req.user.id,
                //   },
                // );
                // if (await bcrypt.compare(oldPassword, old_password[0][0].password)) {
                const updatePassword = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.resetQueries.reset_pass, {
                    id: req.user.id,
                    // oldPassword: oldPassword,
                    encryptPassword: encryptPassword,
                }, sequelize_1.QueryTypes.UPDATE);
                return updatePassword;
            }
            catch (err) {
                return null;
            }
        });
    }
}
exports["default"] = PasswordService;


/***/ }),

/***/ "./src/api/s3bucket/s3controller.ts":
/*!******************************************!*\
  !*** ./src/api/s3bucket/s3controller.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**Patient profile photo update controller
 * @auther  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Patient Profile photo add-update controller functions
 */
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
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
// import convert from '../../helpers/file';
const s3services_1 = __importDefault(__webpack_require__(/*! ./s3services */ "./src/api/s3bucket/s3services.ts"));
const upload_service_1 = __importDefault(__webpack_require__(/*! ../../helpers/documentUpload/upload.service */ "./src/helpers/documentUpload/upload.service.ts"));
const success_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/success */ "./src/lang/handlers/success.ts"));
const message_1 = __importDefault(__webpack_require__(/*! ../../lang/message */ "./src/lang/message.ts"));
const error_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/error */ "./src/lang/handlers/error.ts"));
const aws_sdk_1 = __importDefault(__webpack_require__(/*! aws-sdk */ "aws-sdk"));
const index_1 = __webpack_require__(/*! ../../helpers/utils/index */ "./src/helpers/utils/index.ts");
class s3controller {
    constructor() {
        this.uploads = this.uploads.bind(this);
    }
    /**Update Patient profile photo controller
     * @auther  JD9898<jaydeep.malaviya@dataprophets.in>
     * @description:Update Patient Profile photo in s3 bucket using aws accounts, this controller for update photo.
     * @return: updated profile photo.
     */
    uploads(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.files;
                index_1.logger.info(file);
                // const files = req.files.filename;
                // logger.info(file);
                let folder = '';
                if (file.mimetype === 'application/pdf') {
                    folder = 'Documents';
                }
                else {
                    folder = 'Images';
                }
                const accessKeyId = process.env.S3_ACCESS_KEY_ID;
                const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
                const bucketName = process.env.AWS_S3_BUCKET;
                const region = process.env.S3_REGION;
                const folderName = `${process.env.AWS_S3_FOLDER}/${req.user.id}/${folder}`;
                const result = yield (0, upload_service_1.default)(file, accessKeyId, secretAccessKey, bucketName, folderName, region);
                index_1.logger.info(result);
                const results = yield s3services_1.default.DocumentUpload(result, req, file);
                // if (!result) {
                //   return errorHandler(res, 400, message.error.somethingWentWrongError);
                // }
                fs_1.default.unlink(file.path, function (err) {
                    if (err)
                        throw err;
                });
                if (!results[1]) {
                    return (0, error_1.default)(res, 400, message_1.default.error.patientNoteUpdate);
                }
                return (0, success_1.default)(res, 200, message_1.default.success.docUploadSuccessFully, result);
            }
            catch (err) {
                index_1.logger.info(err, 'error');
                return (0, error_1.default)(res, 400, message_1.default.error.somethingWentWrongError);
            }
        });
    }
    // async convertDocToPdf(docPath: string, pdfPath: string): Promise<void> {
    //   // Convert the DOC file to PDF using libreoffice-convert
    //   const docData = await promisify(fs.readFile)(docPath);
    //   const convert: any = promisify(libreofficeConvert.convert);
    //   await convert(docData, '.pdf', { format: 'pdf' });
    //   const pdfData = await promisify(fs.readFile)('.pdf');
    //   await promisify(fs.writeFile)(pdfPath, pdfData);
    //   // Delete the temporary PDF file
    //   // await promisify(fs.unlink)('.pdf');
    //   return;
    // }
    // Usage
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = req.files;
                index_1.logger.info(JSON.stringify(files));
                const accessKeyId = process.env.S3_ACCESS_KEY_ID;
                const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
                const bucketName = process.env.AWS_S3_BUCKET;
                const region = process.env.S3_REGION;
                const results = yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                    let folder = '';
                    // if (
                    //   file.mimetype ===
                    //     'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                    //   file.mimetype === 'application/msword'
                    // ) {
                    //   const input = `${file.filename}`;
                    //   const output = `${path.parse(file.filename).name}`;
                    //   await convert.fileCnovert(input, output).catch(function (err: any) {
                    //     console.log(`Error converting file: ${err}`);
                    //   });
                    // }
                    // logger.info(file);
                    index_1.logger.info(file.mimetype);
                    if (file.mimetype === 'application/pdf' ||
                        file.mimetype ===
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                        file.mimetype === 'application/msword')
                        folder = 'Documents';
                    else {
                        folder = 'Images';
                    }
                    // logger.info(folder);
                    const folderName = `${process.env.AWS_S3_FOLDER}/${req.user.id}/${folder}`;
                    // console.log(file);
                    // if (
                    //   file.mimetype ===
                    //     'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                    //   file.mimetype === 'application/msword'
                    // ) {
                    //   console.log('in', path.parse(file.filename).name);
                    //   const input = `${file.filename}`;
                    //   const output = `${path.parse(file.filename).name}.pdf`;
                    //   // await ImageService.convertDocToPdf(input, output);
                    //   await convertDocToPdf(input, output);
                    //   // .then(() => console.log('Conversion completed successfully.'))
                    //   // .catch((error) => console.error('Conversion failed:', error));
                    //   return successHandler(
                    //     res,
                    //     200,
                    //     message.success.ClientAddSuccessFully,
                    //   );
                    // }
                    const result = yield (0, upload_service_1.default)(file, accessKeyId, secretAccessKey, bucketName, folderName, region);
                    // console.log(result);
                    // logger.info(result);
                    const data = yield s3services_1.default.DocumentUpload(result, req, file);
                    aws_sdk_1.default.config.update({
                        region: region,
                        accessKeyId: accessKeyId,
                        secretAccessKey: secretAccessKey,
                    });
                    const s3 = new aws_sdk_1.default.S3();
                    const params = {
                        Bucket: bucketName,
                        Key: result.Key,
                        Expires: 3600,
                        // ACL: 'public-read',
                        // ResponseContentDisposition: `attachment;filename="${result.Key}"`, // URL expiration time in seconds
                    };
                    // const url = s3.getSignedUrl('getObject', params);
                    const fileUrl = s3.getSignedUrl('getObject', params);
                    console.log(fileUrl);
                    index_1.logger.info(fileUrl);
                    // logger.info(url);
                    // logger.info(result.key);
                    return {
                        key: result.key,
                        url: result.Location,
                        name: data.file_name,
                        fileurl: fileUrl,
                        type: file.mimetype,
                    };
                })));
                // logger.info(results);
                // const successResults: any = results
                //   .filter((r) => {
                //     logger.info(r);
                //     if (!r[1]) {
                //       logger.info(`Failed to upload file: ${r[0].key}`);
                //     }
                //     return r[1];
                //   })
                //   .map((r) => r[0]);
                files.forEach((file) => {
                    fs_1.default.unlink(file.path, function (err) {
                        if (err)
                            throw err;
                    });
                });
                if (!results.length) {
                    return (0, error_1.default)(res, 400, message_1.default.error.patientNoteUpdate);
                }
                return (0, success_1.default)(res, 200, message_1.default.success.docUploadSuccessFully, results);
            }
            catch (err) {
                console.log(err);
                index_1.logger.info(err, 'error');
                return (0, error_1.default)(res, 400, message_1.default.error.somethingWentWrongError);
            }
        });
    }
    ImageUpload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = req.files;
                index_1.logger.info(files);
                const accessKeyId = process.env.S3_ACCESS_KEY_ID;
                const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
                const bucketName = process.env.AWS_S3_BUCKET;
                const region = process.env.S3_REGION;
                const results = yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                    // let folder = '';
                    // logger.info(file);
                    index_1.logger.info(file.mimetype);
                    // logger.info(folder);
                    const folderName = `${process.env.AWS_S3_FOLDER}/${req.user.id}/Images`;
                    const result = yield (0, upload_service_1.default)(file, accessKeyId, secretAccessKey, bucketName, folderName, region);
                    return {
                        key: result.key,
                    };
                })));
                files.forEach((file) => {
                    fs_1.default.unlink(file.path, function (err) {
                        if (err)
                            throw err;
                    });
                });
                let result = '';
                results.forEach((obj) => {
                    result += obj.key + ',';
                });
                result = result.slice(0, -1); // remove the last comma
                console.log(result);
                const data = yield axios_1.default.post(`${process.env.AI_URL}`, {
                    message: `OCR | ${result}`,
                    sender: req.user.email,
                });
                // console.log(data);
                if (data.data[0].text === 'No text Found in the Image') {
                    return (0, error_1.default)(res, 400, message_1.default.error.imageNotProper);
                }
                console.log(data.data);
                const datas = yield data.data[0];
                console.log(datas);
                aws_sdk_1.default.config.update({
                    region: region,
                    accessKeyId: accessKeyId,
                    secretAccessKey: secretAccessKey,
                });
                const s3 = new aws_sdk_1.default.S3();
                const params = {
                    Bucket: bucketName,
                    Key: datas.text,
                    Expires: 3600,
                    // ACL: 'public-read',
                    // ResponseContentDisposition: `attachment;filename="${result.Key}"`, // URL expiration time in seconds
                };
                // const url = s3.getSignedUrl('getObject', params);
                const fileUrl = s3.getSignedUrl('getObject', params);
                console.log(fileUrl);
                index_1.logger.info(fileUrl);
                const Response = [
                    {
                        name: path_1.default.basename(datas.text),
                        fileurl: fileUrl,
                        type: 'application/pdf',
                        key: datas.text,
                    },
                ];
                if (!fileUrl) {
                    return (0, error_1.default)(res, 400, message_1.default.error.patientNoteUpdate);
                }
                // console.log(results);
                return (0, success_1.default)(res, 200, message_1.default.success.docUploadSuccessFully, Response);
            }
            catch (err) {
                console.log(err);
                index_1.logger.info(err, 'error');
                return (0, error_1.default)(res, 400, message_1.default.error.somethingWentWrongError);
            }
        });
    }
    chat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield s3services_1.default.chat(req);
                index_1.logger.info(results);
                // if (!result) {
                //   return errorHandler(res, 400, message.error.somethingWentWrongError);
                // }
                const s3 = new aws_sdk_1.default.S3({
                    accessKeyId: process.env.S3_ACCESS_KEY_ID,
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                    region: process.env.S3_REGION,
                });
                const params = {
                    Bucket: process.env.AWS_S3_BUCKET,
                    Delete: {
                        Objects: results,
                    },
                };
                const result = s3
                    .deleteObjects(params, function (err, data) {
                    if (err) {
                        index_1.logger.info('Error deleting objects:', err);
                    }
                    else {
                        // logger.info('Successfully deleted objects:', data.Deleted);
                        return data;
                    }
                })
                    .promise();
                if (yield result) {
                    const data = yield s3services_1.default.removeFile(req);
                    if (data[1].rowCount > 0) {
                        return (0, success_1.default)(res, 200, message_1.default.success.docDeleteSuccessFully);
                    }
                    return (0, error_1.default)(res, 400, message_1.default.error.fileNotFoundError);
                }
                return (0, error_1.default)(res, 400, message_1.default.error.somethingWentWrongError);
            }
            catch (err) {
                index_1.logger.info(err, 'error');
                return (0, error_1.default)(res, 400, message_1.default.error.somethingWentWrongError);
            }
        });
    }
}
exports["default"] = s3controller;


/***/ }),

/***/ "./src/api/s3bucket/s3router.ts":
/*!**************************************!*\
  !*** ./src/api/s3bucket/s3router.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/** Patient profile photo router
 * @auther  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description:Patient Profile photo in s3 bucket using aws accounts routers is here.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const multer_1 = __importDefault(__webpack_require__(/*! multer */ "multer"));
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const s3controller_1 = __importDefault(__webpack_require__(/*! ./s3controller */ "./src/api/s3bucket/s3controller.ts"));
const S3controller = new s3controller_1.default();
const router = (0, express_1.Router)({ mergeParams: true });
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (!fs_1.default.existsSync(`${__dirname}/../uploads`)) {
            fs_1.default.mkdirSync(`${__dirname}/../uploads`);
        }
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
// const upload = multer({ storage });
const uploading = (0, multer_1.default)({
    storage,
    limits: { fieldSize: 30 * 1024 * 1024 },
}).array('files', 10);
router.route('/upload').post(uploading, S3controller.upload);
router.route('/deleteFile').delete(uploading, S3controller.chat);
router.route('/image').post(uploading, S3controller.ImageUpload);
exports["default"] = router;


/***/ }),

/***/ "./src/api/s3bucket/s3services.ts":
/*!****************************************!*\
  !*** ./src/api/s3bucket/s3services.ts ***!
  \****************************************/
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
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const index_1 = __webpack_require__(/*! ../../helpers/utils/index */ "./src/helpers/utils/index.ts");
const db_connection_1 = __webpack_require__(/*! ../../db/db.connection */ "./src/db/db.connection.ts");
const query_1 = __importDefault(__webpack_require__(/*! ../helpers/query */ "./src/api/helpers/query.ts"));
class SuperAdminService {
    static DocumentUpload(data, req, file) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            // logger.info(files);
            const update = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.insert_document, {
                fileName: file.filename,
                fileType: file.mimetype,
                key: data.Key,
                location: data.Location,
                userId: req.user.id,
            }, sequelize_1.QueryTypes.UPDATE);
            index_1.logger.info(update[0][0]);
            // logger.info(update);
            if (update[1] > 0) {
                return update[0][0];
            }
            return null;
        });
    }
    static chat(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            // logger.info(files);
            const [update] = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.find_documents, {
                userId: req.user.id,
            }, sequelize_1.QueryTypes.UPDATE);
            index_1.logger.info(update);
            return update;
        });
    }
    // static async convertDocToPdf(docFilePath: any, pdfFilePath: any) {
    //   const inputStream = fs.createReadStream(docFilePath);
    //   const outputStream = fs.createWriteStream(pdfFilePath);
    //   const conversionOptions = {
    //     format: 'pdf',
    //     output: outputStream,
    //   };
    //   await officeConverter(inputStream, conversionOptions);
    // }
    static removeFile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            // logger.info(files);
            const deletes = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.removeFile, {
                userId: req.user.id,
            }, sequelize_1.QueryTypes.UPDATE);
            index_1.logger.info(deletes);
            return deletes;
        });
    }
}
exports["default"] = SuperAdminService;


/***/ }),

/***/ "./src/api/users/users.controller.ts":
/*!*******************************************!*\
  !*** ./src/api/users/users.controller.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**patient controller
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Patient Profile controlle functions
 */
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
const users_service_1 = __importDefault(__webpack_require__(/*! ./users.service */ "./src/api/users/users.service.ts"));
const success_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/success */ "./src/lang/handlers/success.ts"));
const error_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/error */ "./src/lang/handlers/error.ts"));
const message_1 = __importDefault(__webpack_require__(/*! ../../lang/message */ "./src/lang/message.ts"));
const upload_service_1 = __importDefault(__webpack_require__(/*! ../../helpers/documentUpload/upload.service */ "./src/helpers/documentUpload/upload.service.ts"));
const aws_sdk_1 = __importDefault(__webpack_require__(/*! aws-sdk */ "aws-sdk"));
const index_1 = __webpack_require__(/*! ../../helpers/utils/index */ "./src/helpers/utils/index.ts");
class UserController {
    constructor() {
        this.detail = this.detail.bind(this);
        this.ProfileUpdate = this.ProfileUpdate.bind(this);
    }
    /**Get patientdetails controller
     * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
     * @description:GET Patient Profile details using Email.
     *  @return: all the patients details you need.
     *
     */
    detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessKeyId = process.env.S3_ACCESS_KEY_ID;
                const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
                const bucketName = process.env.AWS_S3_BUCKET;
                const region = process.env.S3_REGION;
                aws_sdk_1.default.config.update({
                    region: region,
                    accessKeyId: accessKeyId,
                    secretAccessKey: secretAccessKey,
                });
                const s3 = new aws_sdk_1.default.S3();
                // const url = s3.getSignedUrl('getObject', params);
                const result = yield users_service_1.default.detail(req);
                if (result.profileUrl) {
                    const params = {
                        Bucket: bucketName,
                        Key: result.profileUrl,
                        Expires: 3600,
                        // ACL: 'public-read',
                        // ResponseContentDisposition: `attachment;filename="${result.Key}"`, // URL expiration time in seconds
                    };
                    const fileUrl = yield s3.getSignedUrl('getObject', params);
                    index_1.logger.info(fileUrl);
                    result.profileUrl = fileUrl;
                    index_1.logger.info(result);
                    if (!result) {
                        return (0, error_1.default)(res, 400, message_1.default.error.somethingWentWrongError);
                    }
                    return (0, success_1.default)(res, 200, message_1.default.success.getUserDataRetriveSuccessFully, result);
                }
                if (!result) {
                    return (0, error_1.default)(res, 400, message_1.default.error.somethingWentWrongError);
                }
                return (0, success_1.default)(res, 200, message_1.default.success.getUserDataRetriveSuccessFully, result);
            }
            catch (err) {
                index_1.logger.info(err, 'error');
                return (0, error_1.default)(res, 400, message_1.default.error.somethingWentWrongError);
            }
        });
    }
    /**Update patientdetails controller
     * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
     * @description:Update Patient Profile details using Email,Update the details with PUT method.
     * @return: updated row with data.
     */
    ProfileUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    name: req.body.name || '',
                    phone: req.body.phone || '',
                    userId: req.user.id || '',
                    profile: req.file || '',
                };
                if (req.file) {
                    console.log(data.profile.mimetype);
                    if (!data.profile.mimetype.startsWith('image/')) {
                        return (0, error_1.default)(res, 400, message_1.default.error.fileIsMissingError);
                    }
                    const accessKeyId = process.env.S3_ACCESS_KEY_ID;
                    const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
                    const bucketName = process.env.AWS_S3_BUCKET;
                    const region = process.env.S3_REGION;
                    const folderName = `${process.env.AWS_S3_FOLDER}/Profiles`;
                    const results = yield (0, upload_service_1.default)(req.file, accessKeyId, secretAccessKey, bucketName, folderName, region);
                    index_1.logger.info(results);
                    const result = yield users_service_1.default.ProfileUpdateWithImage(data, results.Key);
                    if (!result.rowCount) {
                        return (0, error_1.default)(res, 400, message_1.default.error.somethingWentWrongError);
                    }
                    return (0, success_1.default)(res, 200, message_1.default.success.userEditSuccessFully);
                }
                const result = yield users_service_1.default.ProfileUpdate(data);
                if (!result.rowCount) {
                    return (0, error_1.default)(res, 400, message_1.default.error.somethingWentWrongError);
                }
                return (0, success_1.default)(res, 200, message_1.default.success.userEditSuccessFully);
            }
            catch (err) {
                index_1.logger.info(err, 'error');
                return (0, error_1.default)(res, 400, message_1.default.error.somethingWentWrongError);
            }
        });
    }
}
exports["default"] = UserController;


/***/ }),

/***/ "./src/api/users/users.router.ts":
/*!***************************************!*\
  !*** ./src/api/users/users.router.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**patientdetails routers
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description:Add all routers for Patient Profile details with show family member is here.
 */
const multer_1 = __importDefault(__webpack_require__(/*! multer */ "multer"));
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const express_1 = __webpack_require__(/*! express */ "express");
const users_controller_1 = __importDefault(__webpack_require__(/*! ./users.controller */ "./src/api/users/users.controller.ts"));
const userController = new users_controller_1.default();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (!fs_1.default.existsSync(`${__dirname}/../../../../uploads`)) {
            fs_1.default.mkdirSync(`${__dirname}/../../../../uploads`);
        }
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
// const upload = multer({ storage });
const uploading = (0, multer_1.default)({
    storage,
    limits: { fieldSize: 30 * 1024 * 1024 },
}).single('file');
const router = (0, express_1.Router)({ mergeParams: true });
router.route('/detail').post(userController.detail);
router.route('/update_profile').put(uploading, userController.ProfileUpdate);
exports["default"] = router;


/***/ }),

/***/ "./src/api/users/users.service.ts":
/*!****************************************!*\
  !*** ./src/api/users/users.service.ts ***!
  \****************************************/
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
/** userdetails services
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description:user Profile details services is here.
 */
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const config_1 = __importStar(__webpack_require__(/*! ../../config/config */ "./src/config/config.ts"));
const db_connection_1 = __webpack_require__(/*! ../../db/db.connection */ "./src/db/db.connection.ts");
const query_1 = __importDefault(__webpack_require__(/*! ../helpers/query */ "./src/api/helpers/query.ts"));
class UsersService {
    /**Get userdetails services
     * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
     * @description:GET user Profile details using Email.
     * @return: all the users details you need.
     */
    static detail(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            // logger.info('req.user.id', req.user.id);
            const bucket_name = config_1.default.get(config_1.ConfigKey.AWS_S3_BUCKET);
            const folder_name = config_1.default.get(config_1.ConfigKey.AWS_S3_FOLDER);
            const base_url = config_1.default.get(config_1.ConfigKey.AWS_BASE_URL);
            const [result] = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.get_user, { id: req.user.id, base_url, bucket_name, folder_name }, sequelize_1.QueryTypes.SELECT);
            return result[0];
        });
    }
    /**Update userdetails controller
     * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
     * @description:Update user Profile details with update query.
     * @return: updated row with data.
     */
    static ProfileUpdateWithImage(data, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            const update = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.update_user_with_image, {
                name: data.name,
                phone: data.phone,
                userId: data.userId,
                profile: profile,
            }, sequelize_1.QueryTypes.UPDATE);
            return update[1];
        });
    }
    static ProfileUpdate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // send response from here
            const update = yield db_connection_1.DBConnection.executeSampleQuery(query_1.default.userQueries.update_user, {
                name: data.name,
                phone: data.phone,
                userId: data.userId,
            }, sequelize_1.QueryTypes.UPDATE);
            return update[1];
        });
    }
}
exports["default"] = UsersService;


/***/ }),

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

/***/ "./src/helpers/documentUpload/upload.service.ts":
/*!******************************************************!*\
  !*** ./src/helpers/documentUpload/upload.service.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
(__webpack_require__(/*! dotenv */ "dotenv").config)();
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const error_1 = __importDefault(__webpack_require__(/*! ../../lang/handlers/error */ "./src/lang/handlers/error.ts"));
const message_1 = __importDefault(__webpack_require__(/*! ../../lang/message */ "./src/lang/message.ts"));
const s3_1 = __importDefault(__webpack_require__(/*! aws-sdk/clients/s3 */ "aws-sdk/clients/s3"));
function uploadFile(file, accessKeyId, secretAccessKey, bucketName, folderName, region) {
    const fileStream = fs_1.default.createReadStream(__dirname + `/../uploads/${file.filename}`);
    try {
        const s3 = new s3_1.default({
            accessKeyId,
            secretAccessKey,
            region,
        });
        console.log(file);
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: folderName + '/' + file.filename,
        };
        return s3.upload(uploadParams).promise();
    }
    catch (err) {
        return (0, error_1.default)(file.path, 404, message_1.default.error.fileNotFoundError);
    }
}
exports["default"] = uploadFile;


/***/ }),

/***/ "./src/helpers/middlewares/httpLogger.ts":
/*!***********************************************!*\
  !*** ./src/helpers/middlewares/httpLogger.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const morgan_1 = __importDefault(__webpack_require__(/*! morgan */ "morgan"));
const utils_1 = __webpack_require__(/*! ../utils */ "./src/helpers/utils/index.ts");
utils_1.logger.stream = {
    write: (message) => utils_1.logger.info(message.substring(0, message.lastIndexOf('\n'))),
};
exports["default"] = (0, morgan_1.default)(':method :url :status :response-time ms - :res[content-length]', { stream: utils_1.logger.stream });


/***/ }),

/***/ "./src/helpers/middlewares/index.ts":
/*!******************************************!*\
  !*** ./src/helpers/middlewares/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const httpLogger_1 = __importDefault(__webpack_require__(/*! ./httpLogger */ "./src/helpers/middlewares/httpLogger.ts"));
exports["default"] = httpLogger_1.default;


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

/***/ "./src/lang/handlers/error.ts":
/*!************************************!*\
  !*** ./src/lang/handlers/error.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const errorHandler = (res, code, message) => {
    const errMessage = {
        title: 'Error',
        message,
    };
    const objResponse = {
        success: false,
        error: errMessage,
    };
    return res.status(code).send(objResponse);
};
exports["default"] = errorHandler;


/***/ }),

/***/ "./src/lang/handlers/success.ts":
/*!**************************************!*\
  !*** ./src/lang/handlers/success.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const successHandler = (res, code, message, data) => {
    const objResponse = {
        success: true,
        message,
        data,
    };
    return res.status(code).send(objResponse);
};
exports["default"] = successHandler;


/***/ }),

/***/ "./src/lang/message.ts":
/*!*****************************!*\
  !*** ./src/lang/message.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const success = {
    getPatientDetailRetriveSuccessFully: 'Patient details retrieved successfully.',
    getUserDataRetriveSuccessFully: 'User data retrieved successfully.',
    signInSuccessFully: 'User login successfully.',
    signUpSuccessFully: 'User register successfully.',
    ClientAddSuccessFully: 'Client Add successfully.',
    viewProfileSuccessFully: 'User profile detail retrieved successesfully.',
    otpVerifySuccessFully: 'OTP verify successesfully.',
    LinkVerifySuccessFully: 'Link verify successesfully.',
    userEditSuccessFully: 'Profile update successfully.',
    docUploadSuccessFully: 'Document upload successfully.',
    docDeleteSuccessFully: 'Document delete successfully.',
    userDeletSuccessFully: 'User Deleted successesfully.',
    getPasswordResetSuccessfully: 'Password reset successfully.',
    forgetPasswordSuccessfully: 'Email sent to this Email adress for reset Password.',
    relationDataSuccessfully: 'Relation types retrived',
    relationUpdateSuccessfully: 'Relation with family member is updated successfully',
    familyLinkSuccessfully: 'Family member link successfull',
    familymemberSuccessfully: 'Family member find successfull',
    showFamily: 'Show Patient family member Successfully.',
    sendMail: 'Mail send Successfully.',
    resendMail: 'Please check your Mail for resend OTP Successfully.',
};
const error = {
    somethingWentWrongError: 'Oops! Something went wrong, Please try again.',
    fileIsMissingError: 'File is missing!',
    imageNotProper: 'Please provide proper image.',
    relationNotFoundError: 'Relations not find!!',
    familyMemberLinkedAlready: 'Family member is linked already',
    familyLinkError: 'Family member is not linked!',
    relationUpdateError: 'Relation with family member is not updated.',
    memberNotFoundError: 'Family member is not found',
    relationFamilyNotFoundError: 'Relation with family member is not found',
    fileNotFoundError: 'File not found!',
    otpNotFound: 'Please Enter the OTP.',
    UrlNotFound: 'Please Enter the URL.',
    bodyMissingError: 'Body is missing, please enter values',
    otpNotVerify: 'Your Entered OTP is not verfiy.',
    unauthorizedError: 'You are not authorized',
    signupError: 'Registration was failed due to a technical issue, Please try again after some time.',
    notRegisteredError: 'You are not registered user. Please register yourself to access.',
    wrongPasswordError: 'The password you have entered was wrong. Please try with correct password.',
    wrongOtpError: 'The OTP you have entered was wrong. Please try with correct OTP.',
    wrongUrlError: 'The URL you have entered was wrong. Please try with correct URL.',
    newPasswordEmpty: 'New Password can not be empty.',
    alreadyExistsError: 'The mail you have entered was already Registered. Please try another mail id.',
    usernamealreadyExistsError: 'The username you have entered was already Registered. Please try another username.',
    passwordCannotBeSameError: 'You can not set new password same as old password.',
    passwordNotFoundError: 'You can not set new password Please set your Password.',
    emailNotFoundError: 'User does not exists with this email! Please enter valid Email',
    uuidNotFoundError: 'Your UUID not found',
    emailRequiredError: 'Email is Required',
    tokenNotFound: 'Something went wrong, Please try after some time.',
    invalidAuthorizationToken: 'Invalid Authorization Token',
    unauthorizedaccess: 'You do not have any authorization to access this file',
    tokenIsRequired: 'Authorization token is required',
    invalidAuthorizationSchema: 'Invalid Authorization Token schema',
    patientNoteUpdate: 'Document is not uploaded.',
    wrongOldPasswordError: 'Please Enter correct OldPassword',
    familyLinkNotSameError: 'Patinent id and family member id will not be same',
    sameSearchError: 'You can not link your self as family member',
    UserNotFound: 'User detail not found.',
};
const subject = {
    welcomeToAHS: 'Welcome.',
};
const smsContent = {
    welcome: `Hello #CUSTOMER_NAME,
  Your password is #PASSWORD
  Please use above credentials to login in Advance Health System site #ADVANCE_HEALTH_SYSYTEM_PATIENT_SITE_URL. If you have any queries, please connect with us on #GOOGLE_FORM_LINK.
  
  Cheers,
  Advance Health System Team.`,
};
exports["default"] = {
    success,
    error,
    subject,
    smsContent,
};


/***/ }),

/***/ "./src/view/client.mail.helper.ts":
/*!****************************************!*\
  !*** ./src/view/client.mail.helper.ts ***!
  \****************************************/
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
/** mail send function
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: send mail using nodemailer
 */
const nodemailer_1 = __importDefault(__webpack_require__(/*! nodemailer */ "nodemailer"));
const ejs_1 = __importDefault(__webpack_require__(/*! ejs */ "ejs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const forgot_config_1 = __webpack_require__(/*! ../api/forgotPassword/forgot.config */ "./src/api/forgotPassword/forgot.config.ts");
const index_1 = __webpack_require__(/*! ../helpers/utils/index */ "./src/helpers/utils/index.ts");
/** create mail Transporter
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: this a mail transporter for sending mail
 */
const mailTransporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: forgot_config_1.forgotConfig.userMail,
        pass: forgot_config_1.forgotConfig.password,
    },
});
/** send mail function
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: this is send mail function for mail send using ejs template and mail data
 */
const sendMail = (mailData, fileName, subject, otpdata) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredPath = path_1.default.join(__dirname, `..//src/view/${fileName}`);
    const data = yield ejs_1.default.renderFile(requiredPath, mailData, subject, otpdata);
    const mainOptions = {
        from: forgot_config_1.forgotConfig.userMail,
        to: mailData.email,
        subject,
        html: data,
    };
    mailTransporter.sendMail(mainOptions, (err, info) => {
        if (err)
            index_1.logger.info(err);
        else
            console.info(`Message sent: ${info.response}`);
    });
});
exports["default"] = sendMail;


/***/ }),

/***/ "./src/view/mail.helper.ts":
/*!*********************************!*\
  !*** ./src/view/mail.helper.ts ***!
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/** mail send function
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: send mail using nodemailer
 */
const nodemailer_1 = __importDefault(__webpack_require__(/*! nodemailer */ "nodemailer"));
const ejs_1 = __importDefault(__webpack_require__(/*! ejs */ "ejs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const forgot_config_1 = __webpack_require__(/*! ../api/forgotPassword/forgot.config */ "./src/api/forgotPassword/forgot.config.ts");
const index_1 = __webpack_require__(/*! ../helpers/utils/index */ "./src/helpers/utils/index.ts");
/** create mail Transporter
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: this a mail transporter for sending mail
 */
const mailTransporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: forgot_config_1.forgotConfig.userMail,
        pass: forgot_config_1.forgotConfig.password,
    },
});
/** send mail function
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: this is send mail function for mail send using ejs template and mail data
 */
const sendMail = (mailData, fileName, subject) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredPath = path_1.default.join(__dirname, `..//src/view/${fileName}`);
    const data = yield ejs_1.default.renderFile(requiredPath, mailData, subject);
    const mainOptions = {
        from: forgot_config_1.forgotConfig.userMail,
        to: mailData.email,
        subject,
        html: data,
    };
    mailTransporter.sendMail(mainOptions, (err, info) => {
        if (err)
            index_1.logger.info(err);
        else
            console.info(`Message sent: ${info.response}`);
    });
});
exports["default"] = sendMail;


/***/ }),

/***/ "@sentry/node":
/*!*******************************!*\
  !*** external "@sentry/node" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@sentry/node");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ "aws-sdk/clients/s3":
/*!*************************************!*\
  !*** external "aws-sdk/clients/s3" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("aws-sdk/clients/s3");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("ejs");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-promise-wrap":
/*!***************************************!*\
  !*** external "express-promise-wrap" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("express-promise-wrap");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "generate-password":
/*!************************************!*\
  !*** external "generate-password" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("generate-password");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "http-status-codes":
/*!************************************!*\
  !*** external "http-status-codes" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("http-status-codes");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "minimist":
/*!***************************!*\
  !*** external "minimist" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("minimist");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("moment");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "otp-generator":
/*!********************************!*\
  !*** external "otp-generator" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("otp-generator");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),

/***/ "swagger-ui-express":
/*!*************************************!*\
  !*** external "swagger-ui-express" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("swagger-ui-express");

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

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cyI6WyJ3ZWJwYWNrOi8vc2FtcGxlLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2FwaS9hcGkuY29uc3RhbnRzLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9hcGkvYXBpLmp3dC50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvYXBpL2FwaS5yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2FwaS9hcGkuc3dhZ2dlci50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvYXBpL2FwaS50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvYXBpL2F1dGgvYXV0aC5jb250cm9sbGVyLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9hcGkvYXV0aC9hdXRoLm1pZGRsZXdhcmVzLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9hcGkvYXV0aC9hdXRoLnJvdXRlci50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvYXBpL2F1dGgvYXV0aC5zZXJ2aWNlLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9hcGkvY2xpZW50L2NsaWVudC5jb250cm9sbGVyLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9hcGkvY2xpZW50L2NsaWVudC5yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2FwaS9jbGllbnQvY2xpZW50LnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2FwaS9mb3Jnb3RQYXNzd29yZC9jcmVhdGUudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2FwaS9mb3Jnb3RQYXNzd29yZC9mb3Jnb3QuY29uZmlnLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9hcGkvZm9yZ290UGFzc3dvcmQvZm9yZ290LmNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2FwaS9mb3Jnb3RQYXNzd29yZC9mb3Jnb3Qucm91dGVyLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9hcGkvZm9yZ290UGFzc3dvcmQvZm9yZ290LnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2FwaS9mb3Jnb3RQYXNzd29yZC9tYWlsLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9hcGkvaGVscGVycy9hcGkuaGVscGVyLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9hcGkvaGVscGVycy9xdWVyeS50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvYXBpL2hlbHBlcnMvdmFsaWRhdGlvbi9mb3Jnb3QudmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvYXBpL3B1YmxpYy9wdWJsaWMuY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvYXBpL3B1YmxpYy9wdWJsaWMucm91dGVyLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9hcGkvcmVzZXRQYXNzd29yZC9yZXNldC5jb250cm9sbGVyLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9hcGkvcmVzZXRQYXNzd29yZC9yZXNldC5yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2FwaS9yZXNldFBhc3N3b3JkL3Jlc2V0LnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2FwaS9zM2J1Y2tldC9zM2NvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2FwaS9zM2J1Y2tldC9zM3JvdXRlci50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvYXBpL3MzYnVja2V0L3Mzc2VydmljZXMudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2FwaS91c2Vycy91c2Vycy5jb250cm9sbGVyLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9hcGkvdXNlcnMvdXNlcnMucm91dGVyLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9hcGkvdXNlcnMvdXNlcnMuc2VydmljZS50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvY29uZmlnL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvZGIvZGIuY29ubmVjdGlvbi50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvZGIvZGIuY29uc3RhbnRzLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9oZWxwZXJzL2FwcC50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvaGVscGVycy9jb25zb2xlLm92ZXJyaWRlcy50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvaGVscGVycy9kb2N1bWVudFVwbG9hZC91cGxvYWQuc2VydmljZS50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvaGVscGVycy9taWRkbGV3YXJlcy9odHRwTG9nZ2VyLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9oZWxwZXJzL21pZGRsZXdhcmVzL2luZGV4LnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9oZWxwZXJzL3NlbnRyeS5oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2hlbHBlcnMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2hlbHBlcnMvdXRpbHMvbG9nZ2VyLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9sYW5nL2hhbmRsZXJzL2Vycm9yLnRzIiwid2VicGFjazovL3NhbXBsZS8uL3NyYy9sYW5nL2hhbmRsZXJzL3N1Y2Nlc3MudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL2xhbmcvbWVzc2FnZS50cyIsIndlYnBhY2s6Ly9zYW1wbGUvLi9zcmMvdmlldy9jbGllbnQubWFpbC5oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLy4vc3JjL3ZpZXcvbWFpbC5oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwiQHNlbnRyeS9ub2RlXCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwiYXdzLXNka1wiIiwid2VicGFjazovL3NhbXBsZS9leHRlcm5hbCBjb21tb25qcyBcImF3cy1zZGsvY2xpZW50cy9zM1wiIiwid2VicGFjazovL3NhbXBsZS9leHRlcm5hbCBjb21tb25qcyBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwiYmNyeXB0XCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly9zYW1wbGUvZXh0ZXJuYWwgY29tbW9uanMgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwiZWpzXCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwiZXhwcmVzc1wiIiwid2VicGFjazovL3NhbXBsZS9leHRlcm5hbCBjb21tb25qcyBcImV4cHJlc3MtcHJvbWlzZS13cmFwXCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2s6Ly9zYW1wbGUvZXh0ZXJuYWwgY29tbW9uanMgXCJnZW5lcmF0ZS1wYXNzd29yZFwiIiwid2VicGFjazovL3NhbXBsZS9leHRlcm5hbCBjb21tb25qcyBcImhlbG1ldFwiIiwid2VicGFjazovL3NhbXBsZS9leHRlcm5hbCBjb21tb25qcyBcImh0dHAtc3RhdHVzLWNvZGVzXCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwiam9pXCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwibWluaW1pc3RcIiIsIndlYnBhY2s6Ly9zYW1wbGUvZXh0ZXJuYWwgY29tbW9uanMgXCJtb21lbnRcIiIsIndlYnBhY2s6Ly9zYW1wbGUvZXh0ZXJuYWwgY29tbW9uanMgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly9zYW1wbGUvZXh0ZXJuYWwgY29tbW9uanMgXCJtdWx0ZXJcIiIsIndlYnBhY2s6Ly9zYW1wbGUvZXh0ZXJuYWwgY29tbW9uanMgXCJub2RlbWFpbGVyXCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwib3RwLWdlbmVyYXRvclwiIiwid2VicGFjazovL3NhbXBsZS9leHRlcm5hbCBjb21tb25qcyBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovL3NhbXBsZS9leHRlcm5hbCBjb21tb25qcyBcInN3YWdnZXItdWktZXhwcmVzc1wiIiwid2VicGFjazovL3NhbXBsZS9leHRlcm5hbCBjb21tb25qcyBcInV0aWxcIiIsIndlYnBhY2s6Ly9zYW1wbGUvZXh0ZXJuYWwgY29tbW9uanMgXCJ3aW5zdG9uXCIiLCJ3ZWJwYWNrOi8vc2FtcGxlL2V4dGVybmFsIGNvbW1vbmpzIFwid2luc3Rvbi1kYWlseS1yb3RhdGUtZmlsZVwiIiwid2VicGFjazovL3NhbXBsZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwicGF0aFwiIiwid2VicGFjazovL3NhbXBsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zYW1wbGUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zYW1wbGUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3NhbXBsZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi9zcmMvYXBpL2FwaSc7XG5pbXBvcnQgJy4vc3JjL2hlbHBlcnMvY29uc29sZS5vdmVycmlkZXMnO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9zcmMvaGVscGVycy9hcHAnO1xuXG5jbGFzcyBTYW1wbGVBcHAgZXh0ZW5kcyBBcHAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih0cnVlKTtcbiAgfVxuXG4gIGFzeW5jIGluaXQoKSB7XG4gICAgQXBpLmluaXQoKTtcbiAgfVxufVxuXG5BcHAucnVuKFNhbXBsZUFwcCk7XG4iLCJpbXBvcnQgY29uZmlnLCB7IENvbmZpZ0tleSB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcnO1xuXG5leHBvcnQgY29uc3QgQVBJX1BPUlQgPSBjb25maWcuZ2V0PG51bWJlcj4oQ29uZmlnS2V5LlBPUlQpIHx8IDgwMDA7XG5leHBvcnQgY29uc3QgQVBJX1NFQ1JFVCA9IGNvbmZpZy5nZXQ8c3RyaW5nPihDb25maWdLZXkuQVBJX1NFQ1JFVCk7XG5leHBvcnQgY29uc3QgQVBJX1RPS0VOX1ZBTElESVRZID0gMjQgKiA2MCAqIDYwOyAvLyAyNGggaW4gc2Vjb25kc1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuZXhwb3J0IGNvbnN0IEFQSV9VVUlEX1JFR0VYID0gbmV3IFJlZ0V4cChcbiAgL15bMC05QS1GXXs4fS1bMC05QS1GXXs0fS00WzAtOUEtRl17M30tWzg5QUJdWzAtOUEtRl17M30tWzAtOUEtRl17MTJ9JC9pLFxuKTtcbiIsIi8qKlxuICogQGF1dGhvciBhbmlrZXQudHJhcGFzaXlhIDxhbmlrZXQudHJhcGFzaXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIGNyZWF0ZWQgSldUIHRva2VuOiB3ZSB1c2UgdG9rZW5kYXRhLFNFQ1JFVF9LRVkgYW5kIFRPS0VOIFZBTElESVRZIGluIGVudiBmaWxlLCB1c2luZyB0aGlzIGRhdGEgdG9rZW4gd2FzIGNyZWF0ZWRcbiAqIEByZXR1cm5zIHRva2VuXG4gKi9cblxuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuXG5jbGFzcyBKV1Qge1xuICBzdGF0aWMgY3JlYXRlVG9rZW4odG9rZW5EYXRhOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGp3dC5zaWduKFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6IHRva2VuRGF0YSxcbiAgICAgICAgfSxcbiAgICAgICAgcHJvY2Vzcy5lbnYuQVBJX1NFQ1JFVCxcbiAgICAgICAge1xuICAgICAgICAgIGV4cGlyZXNJbjogcHJvY2Vzcy5lbnYuVE9LRU5fVkFMSURJVFksXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IEpXVDtcbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgYXV0aGVudGljYXRlIH0gZnJvbSAnLi9hdXRoL2F1dGgubWlkZGxld2FyZXMnO1xuaW1wb3J0IHVzZXJzUm91dGVyIGZyb20gJy4vdXNlcnMvdXNlcnMucm91dGVyJztcbmltcG9ydCBjbGllbnRSb3V0ZXIgZnJvbSAnLi9jbGllbnQvY2xpZW50LnJvdXRlcic7XG5pbXBvcnQgYXV0aFJvdXRlciBmcm9tICcuL2F1dGgvYXV0aC5yb3V0ZXInO1xuaW1wb3J0IGZvcmdvdFJvdXRlciBmcm9tICcuL2ZvcmdvdFBhc3N3b3JkL2ZvcmdvdC5yb3V0ZXInO1xuaW1wb3J0IFMzUm91dGVyIGZyb20gJy4vczNidWNrZXQvczNyb3V0ZXInO1xuaW1wb3J0IHBhc3N3b3JkUm91dGVyIGZyb20gJy4vcmVzZXRQYXNzd29yZC9yZXNldC5yb3V0ZXInO1xuaW1wb3J0IHB1YmxpY1JvdXRlciBmcm9tICcuL3B1YmxpYy9wdWJsaWMucm91dGVyJztcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKHsgbWVyZ2VQYXJhbXM6IHRydWUgfSk7XG5cbnJvdXRlci51c2UoJy9hdXRoJywgZm9yZ290Um91dGVyKTtcbnJvdXRlci51c2UoJy9haHMnLCBwdWJsaWNSb3V0ZXIpO1xucm91dGVyLnVzZSgnL2F1dGgnLCBhdXRoUm91dGVyKTtcbnJvdXRlci51c2UoYXV0aGVudGljYXRlKTtcblxucm91dGVyLnVzZSgnL3VzZXInLCB1c2Vyc1JvdXRlcik7XG5yb3V0ZXIudXNlKCcvY2xpZW50JywgY2xpZW50Um91dGVyKTtcbnJvdXRlci51c2UoJy91cGxvYWQnLCBTM1JvdXRlcik7XG5yb3V0ZXIudXNlKCcvcGFzc3dvcmQnLCBwYXNzd29yZFJvdXRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsImltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgc3dhZ2dlclVJIGZyb20gJ3N3YWdnZXItdWktZXhwcmVzcyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IHN3YWdnZXJEb2NQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3NyYy9hcGkvYXBpLnN3YWdnZXIuanNvbicpO1xuY29uc3Qgc3dhZ2dlckRvYyA9IEpTT04ucGFyc2UoXG4gIGZzLnJlYWRGaWxlU3luYyhzd2FnZ2VyRG9jUGF0aCwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KSxcbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN3YWdnZXIge1xuICBzdGF0aWMgZ2V0TWlkZGxld2FyZXMoKTogUmVxdWVzdEhhbmRsZXJbXSB7XG4gICAgcmV0dXJuIFsuLi5zd2FnZ2VyVUkuc2VydmUsIHN3YWdnZXJVSS5zZXR1cChzd2FnZ2VyRG9jKV07XG4gIH1cbn1cbiIsImltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xuLy8gaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgZXhwcmVzcywgeyBOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG4vLyBpbXBvcnQgZmlsZVVwbG9hZCBmcm9tICdleHByZXNzLWZpbGV1cGxvYWQnO1xuaW1wb3J0IGhlbG1ldCBmcm9tICdoZWxtZXQnO1xuaW1wb3J0IHsgU3RhdHVzQ29kZXMgfSBmcm9tICdodHRwLXN0YXR1cy1jb2Rlcyc7XG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRXJyb3IsIERhdGFiYXNlRXJyb3IgfSBmcm9tICdzZXF1ZWxpemUnO1xuaW1wb3J0IHsgQ29uc29sZUNvbG9yLCBsb2dDb2xvciB9IGZyb20gJy4uL2hlbHBlcnMvY29uc29sZS5vdmVycmlkZXMnO1xuaW1wb3J0IFNlbnRyeUhlbHBlciBmcm9tICcuLi9oZWxwZXJzL3NlbnRyeS5oZWxwZXInO1xuaW1wb3J0IHsgQVBJX1BPUlQgfSBmcm9tICcuL2FwaS5jb25zdGFudHMnO1xuaW1wb3J0IGFwaVJvdXRlciBmcm9tICcuL2FwaS5yb3V0ZXInO1xuaW1wb3J0IGZvcmdvdFJvdXRlciBmcm9tICcuL2ZvcmdvdFBhc3N3b3JkL2ZvcmdvdC5yb3V0ZXInO1xuaW1wb3J0IHB1YmxpY1JvdXRlciBmcm9tICcuL3B1YmxpYy9wdWJsaWMucm91dGVyJztcbmltcG9ydCBodHRwTG9nZ2VyIGZyb20gJy4uL2hlbHBlcnMvbWlkZGxld2FyZXMvaW5kZXgnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vaGVscGVycy91dGlscy9pbmRleCc7XG5cbmNvbnN0IHsgU2VudHJ5IH0gPSBTZW50cnlIZWxwZXI7XG5cbmV4cG9ydCBjbGFzcyBBcGkge1xuICBwcml2YXRlIHN0YXRpYyBhcHAgPSBleHByZXNzKCk7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc2V0dXBBcGkoKSB7XG4gICAgdGhpcy5hcHAudXNlKGhlbG1ldCgpKTtcbiAgICB0aGlzLmFwcC51c2UoY29ycygpKTtcbiAgICB0aGlzLmFwcC51c2UobW9yZ2FuKCdkZXYnKSk7XG4gICAgdGhpcy5hcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbiAgICB0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuICAgIHRoaXMuYXBwLnVzZShodHRwTG9nZ2VyKTtcbiAgICB0aGlzLmFwcC51c2UoXG4gICAgICBib2R5UGFyc2VyLnVybGVuY29kZWQoe1xuICAgICAgICBsaW1pdDogJzUwbWInLFxuICAgICAgICBleHRlbmRlZDogZmFsc2UsXG4gICAgICAgIHBhcmFtZXRlckxpbWl0OiA1MDAwMCxcbiAgICAgIH0pLFxuICAgICk7XG4gICAgdGhpcy5hcHAudXNlKFNlbnRyeS5IYW5kbGVycy5yZXF1ZXN0SGFuZGxlcigpKTtcbiAgICB0aGlzLmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2VqcycpO1xuICB9XG4gIHN0YXRpYyBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuc2V0dXBBcGkoKTtcbiAgICB0aGlzLnNldHVwQ3VzdG9tTWlkZGxld2FyZXMoKTtcbiAgICAvLyB0aGlzLnNldHVwRmlsZVVwbG9hZCgpO1xuICAgIHRoaXMuc2V0dXBSb3V0ZXMoKTtcbiAgICB0aGlzLmVycm9ySGFuZGxpbmcoKTtcbiAgICBhd2FpdCB0aGlzLmxpc3RlbigpO1xuICB9XG4gIC8vIHByaXZhdGUgc3RhdGljIHNldHVwRmlsZVVwbG9hZCgpIHtcbiAgLy8gICB0aGlzLmFwcC51c2UoXG4gIC8vICAgICBmaWxlVXBsb2FkKHtcbiAgLy8gICAgICAgdXNlVGVtcEZpbGVzOiB0cnVlLFxuICAvLyAgICAgICB0ZW1wRmlsZURpcjogcGF0aC5yZXNvbHZlKCd1cGxvYWRzJyksXG4gIC8vICAgICB9KSxcbiAgLy8gICApO1xuICAvLyB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc2V0dXBDdXN0b21NaWRkbGV3YXJlcygpIHtcbiAgICB0aGlzLmFwcC51c2UoKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICBuZXh0KCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBlcnJvckhhbmRsaW5nKCkge1xuICAgIHRoaXMuYXBwLnVzZShTZW50cnkuSGFuZGxlcnMuZXJyb3JIYW5kbGVyKCkpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICB0aGlzLmFwcC51c2UoXG4gICAgICAoZXJyOiBFcnJvciwgcmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgICAgbG9nZ2VyLmluZm8oZXJyKTtcbiAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgIHJlcy5zdGF0dXMoU3RhdHVzQ29kZXMuVU5QUk9DRVNTQUJMRV9FTlRJVFkpLmpzb24oe1xuICAgICAgICAgICAgbWVzc2FnZTogZXJyPy5lcnJvcnM/LlswXT8ubWVzc2FnZSA/PyBlcnIubWVzc2FnZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIERhdGFiYXNlRXJyb3IpIHtcbiAgICAgICAgICByZXMuc3RhdHVzKFN0YXR1c0NvZGVzLlVOUFJPQ0VTU0FCTEVfRU5USVRZKS5qc29uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXMuc2VuZFN0YXR1cyhTdGF0dXNDb2Rlcy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc2V0dXBSb3V0ZXMoKSB7XG4gICAgdGhpcy5hcHAudXNlKCcvcHVibGljJywgcHVibGljUm91dGVyKTtcbiAgICB0aGlzLmFwcC51c2UoJy9hcGkvdjEnLCBhcGlSb3V0ZXIpO1xuICAgIHRoaXMuYXBwLnVzZSgnL2ZvcmdldCcsIGZvcmdvdFJvdXRlcik7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBsaXN0ZW4oKSB7XG4gICAgLy8gdGhpcyBpcyBmb3IgQkUgdGVhbSdzIHJlZmVyZW5jZSB0aGF0IGV4ZWN1dGUgcXVlcnkgaXMgd29ya2luZyBwcm9wZXJseS5cbiAgICAvLyB1bmNvbW1lbnQgYmVsb3cgbGluZSBhbmQgeW91IHdpbGwgZ2V0IHJlc3VsdCBvZiBwb3N0Z3Jlc3FsIGluIHRlcm1pbmFsXG4gICAgLy8gYXdhaXQgVXNlcnNTZXJ2aWNlLmRldGFpbChudWxsKTtcbiAgICB0aGlzLmFwcC5saXN0ZW4oQVBJX1BPUlQsICgpID0+XG4gICAgICBsb2dDb2xvcihcbiAgICAgICAgQ29uc29sZUNvbG9yLkZnQmx1ZSxcbiAgICAgICAgYEFQSSBydW5uaW5nIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JHtBUElfUE9SVH1gLFxuICAgICAgKSxcbiAgICApO1xuICB9XG59XG4iLCIvKipcbiAqIEBhdXRob3IgYW5pa2V0LnRyYXBhc2l5YSA8YW5pa2V0LnRyYXBhc2l5YUBkYXRhcHJvcGhldHMuaW4+XG4gKiBAZGVzY3JpcHRpb24gUGF0aWVudCBBdXRoIGNvbnRyb2xsZXIgZmlsZVxuICovXG5cbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBiY3J5cHQgZnJvbSAnYmNyeXB0JztcbmltcG9ydCB7IERCQ29ubmVjdGlvbiB9IGZyb20gJy4uLy4uL2RiL2RiLmNvbm5lY3Rpb24nO1xuaW1wb3J0IHN1Y2Nlc3NIYW5kbGVyIGZyb20gJy4uLy4uL2xhbmcvaGFuZGxlcnMvc3VjY2Vzcyc7XG5pbXBvcnQgbWVzc2FnZSBmcm9tICcuLi8uLi9sYW5nL21lc3NhZ2UnO1xuaW1wb3J0IGVycm9ySGFuZGxlciBmcm9tICcuLi8uLi9sYW5nL2hhbmRsZXJzL2Vycm9yJztcbmltcG9ydCBBdXRoU2VydmljZSBmcm9tICcuL2F1dGguc2VydmljZSc7XG5pbXBvcnQgcXVlcnkgZnJvbSAnLi4vaGVscGVycy9xdWVyeSc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3V0aWxzL2luZGV4JztcblxuY29uc3QgSldUID0gcmVxdWlyZSgnLi4vLi4vYXBpL2FwaS5qd3QnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0aENvbnRyb2xsZXIge1xuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIHNpZ25JbiBmdW5jdGlvbjogZmluZCB1c2VyIHdpdGggZW1haWwgYW5kIGNoZWNrIHBhc3N3b3JkIGFyZSBzYW1lIG9yIG5vdFxuICAgKiBAcmV0dXJuIHBhdGllbnQgZGF0YSB3aXRoIHRva2VuXG4gICAqL1xuXG4gIGFzeW5jIHNpZ25JbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICAgICAgLy8gY29uc3QgcmVzdWx0ID0gQXV0aFNlcnZpY2Uuc2lnbmluU2NoZW1hLmJsb2cudmFsaWRhdGUocmVxLmJvZHkpO1xuICAgICAgLy8gaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgLy8gICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCByZXN1bHQuZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlKTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b2tlbkRhdGEgPSBhd2FpdCBBdXRoU2VydmljZS5zaWduSW4oZW1haWwsIHBhc3N3b3JkKTtcbiAgICAgIGlmICh0b2tlbkRhdGEpIHtcbiAgICAgICAgaWYgKGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB0b2tlbkRhdGEucGFzc3dvcmQpKSB7XG4gICAgICAgICAgY29uc3QgeyBpZCB9ID0gdG9rZW5EYXRhO1xuXG4gICAgICAgICAgY29uc3QgdG9rZW4gPSBKV1QuY3JlYXRlVG9rZW4oaWQpO1xuICAgICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgdG9rZW5EYXRhLnRva2VuID0gdG9rZW47XG4gICAgICAgICAgICBjb25zdCBleHBpcmVkX29uID0gTWF0aC5mbG9vcihEYXRlLm5vdygpKSArIDI0ICogNjAgKiA2MCAqIDEwMDA7XG4gICAgICAgICAgICBjb25zdCBzdHIgPSBuZXcgRGF0ZShleHBpcmVkX29uKS50b1VUQ1N0cmluZygpO1xuICAgICAgICAgICAgY29uc3Qgc2F2ZUFjY2Vzc3Rva2VuOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgICAgICAgICBxdWVyeS51c2VyUXVlcmllcy51cGRhdGVfYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICAgICAgICAgIGV4cDogc3RyLFxuICAgICAgICAgICAgICAgIGlkOiB0b2tlbkRhdGEuaWQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICd1cGRhdGUnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzSGFuZGxlcihcbiAgICAgICAgICAgICAgcmVzLFxuICAgICAgICAgICAgICAyMDAsXG4gICAgICAgICAgICAgIG1lc3NhZ2Uuc3VjY2Vzcy5zaWduSW5TdWNjZXNzRnVsbHksXG4gICAgICAgICAgICAgIHRva2VuRGF0YSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDAsIG1lc3NhZ2UuZXJyb3IudG9rZW5Ob3RGb3VuZCk7XG4gICAgICAgIH0gZWxzZSByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAxLCBtZXNzYWdlLmVycm9yLndyb25nUGFzc3dvcmRFcnJvcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDA0LCBtZXNzYWdlLmVycm9yLmVtYWlsTm90Rm91bmRFcnJvcik7XG4gICAgICAvLyB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDAsIG1lc3NhZ2UuZXJyb3IudG9rZW5Ob3RGb3VuZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBzaWduVXAgZnVuY3Rpb246IGNyZWF0ZSBuZXcgdXNlciBhbmQgY3JlYXRlIHRva2VuIHRoZW4gc2F2ZSBkZXRhaWxzIGludG8gRGF0YWJhc2VcbiAgICogQHJldHVybiBuZXcgcGF0aWVudCBkYXRhIHdpdGggdG9rZW5cbiAgICovXG5cbiAgYXN5bmMgc2lnblVwKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBBdXRoU2VydmljZS5jcmVhdGVVc2VyU2NoZW1hLmJsb2cudmFsaWRhdGUocmVxLmJvZHkpO1xuICAgICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCByZXN1bHQuZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVtYWlsVmFsaWQgPSBhd2FpdCBBdXRoU2VydmljZS5lbWFpbChyZXEpO1xuICAgICAgICBsb2dnZXIuaW5mbyhlbWFpbFZhbGlkLCAnZW1haWwnKTtcbiAgICAgICAgaWYgKGVtYWlsVmFsaWQgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCBtZXNzYWdlLmVycm9yLmFscmVhZHlFeGlzdHNFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc3QgVmFsaWRVc2VybmFtZSA9IGF3YWl0IEF1dGhTZXJ2aWNlLnVzZXJuYW1lKHJlcSk7XG4gICAgICAgIC8vIGxvZ2dlci5pbmZvKFZhbGlkVXNlcm5hbWUpO1xuICAgICAgICAvLyBpZiAoVmFsaWRVc2VybmFtZSA9PT0gbnVsbCkge1xuICAgICAgICAvLyAgIHJldHVybiBlcnJvckhhbmRsZXIoXG4gICAgICAgIC8vICAgICByZXMsXG4gICAgICAgIC8vICAgICA0MDAsXG4gICAgICAgIC8vICAgICBtZXNzYWdlLmVycm9yLnVzZXJuYW1lYWxyZWFkeUV4aXN0c0Vycm9yLFxuICAgICAgICAvLyAgICk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgY29uc3QgdG9rZW5EYXRhID0gYXdhaXQgQXV0aFNlcnZpY2Uuc2lnblVwKHJlcywgcmVxKTtcbiAgICAgICAgLy8gbG9nZ2VyLmluZm8odG9rZW5EYXRhKTtcbiAgICAgICAgaWYgKHRva2VuRGF0YSkge1xuICAgICAgICAgIHJldHVybiBzdWNjZXNzSGFuZGxlcihcbiAgICAgICAgICAgIHJlcyxcbiAgICAgICAgICAgIDIwMCxcbiAgICAgICAgICAgIG1lc3NhZ2Uuc3VjY2Vzcy5zaWduVXBTdWNjZXNzRnVsbHksXG4gICAgICAgICAgICB0b2tlbkRhdGEsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiAodG9rZW5EYXRhKSB7XG4gICAgICAgIC8vICAgY29uc3QgaWQgPSB0b2tlbkRhdGEuaWQ7XG4gICAgICAgIC8vICAgY29uc3QgdG9rZW4gPSBKV1QuY3JlYXRlVG9rZW4oe1xuICAgICAgICAvLyAgICAgaWQsXG4gICAgICAgIC8vICAgfSk7XG4gICAgICAgIC8vIGlmICh0b2tlbikge1xuICAgICAgICAvLyAgIHRva2VuRGF0YS50b2tlbiA9IHRva2VuO1xuICAgICAgICAvLyAgIGNvbnN0IGV4cGlyZWRfb24gPSBNYXRoLmZsb29yKERhdGUubm93KCkpICsgMjQgKiA2MCAqIDYwICogMTAwMDtcbiAgICAgICAgLy8gICBjb25zdCBzdHIgPSBuZXcgRGF0ZShleHBpcmVkX29uKS50b1VUQ1N0cmluZygpO1xuICAgICAgICAvLyAgIGNvbnN0IHNhdmVBY2Nlc3N0b2tlbiA9IGF3YWl0IERCQ29ubmVjdGlvbi5leGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgICAgIC8vICAgICBxdWVyeS51c2VyUXVlcmllcy5pbnNlcnRfYWNjZXNzX3Rva2VuLFxuICAgICAgICAvLyAgICAge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICB0b2tlbjogdG9rZW4sXG4gICAgICAgIC8vICAgICAgIGlkOiB0b2tlbkRhdGEuaWQsXG4gICAgICAgIC8vICAgICAgIGV4cDogc3RyLFxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgICdpbnNlcnQnLFxuICAgICAgICAvLyAgICk7XG4gICAgICAgIC8vICAgcmV0dXJuIHN1Y2Nlc3NIYW5kbGVyKFxuICAgICAgICAvLyAgICAgcmVzLFxuICAgICAgICAvLyAgICAgMjAwLFxuICAgICAgICAvLyAgICAgbWVzc2FnZS5zdWNjZXNzLnNpZ25VcFN1Y2Nlc3NGdWxseSxcbiAgICAgICAgLy8gICAgIHRva2VuRGF0YSxcbiAgICAgICAgLy8gICApO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGF3YWl0IERCQ29ubmVjdGlvbi5leGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgICAgIC8vICAgcXVlcnkudXNlclF1ZXJpZXMuZGVsZXRlX3VzZXJfZGV0YWlsLFxuICAgICAgICAvLyAgIHsgaWQ6IHRva2VuRGF0YS5pZCB9LFxuICAgICAgICAvLyAgICdkZWxldGUnLFxuICAgICAgICAvLyApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmluZm8oJ2Vycm9yJywgZXJyKTtcbiAgICAgIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci50b2tlbk5vdEZvdW5kKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24gfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBlcnJvckhhbmRsZXIgZnJvbSAnLi4vLi4vbGFuZy9oYW5kbGVycy9lcnJvcic7XG5pbXBvcnQgbWVzc2FnZSBmcm9tICcuLi8uLi9sYW5nL21lc3NhZ2UnO1xuaW1wb3J0IHsgREJDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vZGIvZGIuY29ubmVjdGlvbic7XG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgcXVlcnkgZnJvbSAnLi4vaGVscGVycy9xdWVyeSc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3V0aWxzL2luZGV4JztcblxuaW50ZXJmYWNlIGlkIHtcbiAgaWQ6IG51bWJlcjtcbn1cbi8qKlxuICogQGF1dGhvciBhbmlrZXQudHJhcGFzaXlhIDxhbmlrZXQudHJhcGFzaXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbiBhdXRoZW50aWNhdGUgZnVuY3Rpb246IGdldCBCZWFyZXIgdG9rZW4gaW4gaGVhZGVyIHRoZW4gYXV0aGVudGljYXRlIHRva2VuIGlzIHZhbGlkIG9yIG5vdCBmb3IgcGFydGljdWxhciB1c2VyXG4gKiBpZiB2YWxpZCB0aGVuIHdlIGhhdmUgYWNjZXNzIGZvciByZXNvdXJjZXMgb3IgZWxzZSB3ZSBkb24ndCBoYXZlIGF1dGhvcml6YXRpb25cbiAqIEByZXR1cm4gdXNlciBkZXRhaWxzXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhdXRoZW50aWNhdGUoXG4gIHJlcTogYW55LFxuICByZXM6IFJlc3BvbnNlLFxuICBuZXh0OiBOZXh0RnVuY3Rpb24sXG4pIHtcbiAgdHJ5IHtcbiAgICBsZXQgdG9rZW4gPSByZXEuaGVhZGVycy5hdXRob3JpemF0aW9uO1xuICAgIGlmICh0b2tlbikge1xuICAgICAgbGV0IHNjaGVtZTogc3RyaW5nO1xuICAgICAgW3NjaGVtZSwgdG9rZW5dID0gcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbi5zcGxpdCgnICcpO1xuICAgICAgaWYgKHNjaGVtZSAhPT0gJ0JlYXJlcicpIHtcbiAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMywgbWVzc2FnZS5lcnJvci5pbnZhbGlkQXV0aG9yaXphdGlvblNjaGVtYSk7XG4gICAgICB9XG4gICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDMsIG1lc3NhZ2UuZXJyb3IuaW52YWxpZEF1dGhvcml6YXRpb25Ub2tlbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0b2tlblZhbGlkYXRlOiBhbnkgPSBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5BUElfU0VDUkVUKTtcbiAgICAgICAgLy8gbG9nZ2VyLmluZm8odG9rZW5WYWxpZGF0ZSk7XG4gICAgICAgIGlmICh0b2tlblZhbGlkYXRlKSB7XG4gICAgICAgICAgY29uc3QgeyBpZCB9ID0gdG9rZW5WYWxpZGF0ZTtcbiAgICAgICAgICAvLyBsb2dnZXIuaW5mbygnaW4nLCBpZCk7XG4gICAgICAgICAgY29uc3QgW3VzZXJdOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgICAgICAgcXVlcnkudXNlclF1ZXJpZXMuZ2V0X3VzZXIsXG4gICAgICAgICAgICB7IGlkIH0sXG4gICAgICAgICAgICAnc2VsZWN0JyxcbiAgICAgICAgICApO1xuICAgICAgICAgIGxvZ2dlci5pbmZvKHVzZXIpO1xuICAgICAgICAgIGlmICh1c2VyKSByZXEudXNlciA9IHVzZXJbMF07XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgIHJldHVybiBlcnJvckhhbmRsZXIoXG4gICAgICAgICAgICByZXMsXG4gICAgICAgICAgICA0MDEsXG4gICAgICAgICAgICBtZXNzYWdlLmVycm9yLmludmFsaWRBdXRob3JpemF0aW9uVG9rZW4sXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMSwgbWVzc2FnZS5lcnJvci50b2tlbklzUmVxdWlyZWQpO1xuICAgIG5leHQoKTtcbiAgfSBjYXRjaCB7XG4gICAgZXJyb3JIYW5kbGVyKHJlcywgNDAxLCBtZXNzYWdlLmVycm9yLmludmFsaWRBdXRob3JpemF0aW9uVG9rZW4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBBcGlIZWxwZXIgZnJvbSAnLi4vaGVscGVycy9hcGkuaGVscGVyJztcbmltcG9ydCBBdXRoQ29udHJvbGxlciBmcm9tICcuL2F1dGguY29udHJvbGxlcic7XG5cbmNvbnN0IGF1dGhDb250cm9sbGVyID0gbmV3IEF1dGhDb250cm9sbGVyKCk7XG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcbi8qKlxuICogc2lnbkluIGFuZCBzaWduVXAgcm91dGVyXG4gKi9cbnJvdXRlci5wb3N0KCcvc2lnbmluJywgQXBpSGVscGVyLndyYXBIYW5kbGVyKGF1dGhDb250cm9sbGVyLnNpZ25JbikpO1xucm91dGVyLnBvc3QoJy9zaWdudXAnLCBBcGlIZWxwZXIud3JhcEhhbmRsZXIoYXV0aENvbnRyb2xsZXIuc2lnblVwKSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsIi8qKlxuICogQGF1dGhvciBhbmlrZXQudHJhcGFzaXlhIDxhbmlrZXQudHJhcGFzaXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbiBQYXRpZW50IEF1dGggc2VydmljZSBmaWxlXG4gKi9cblxuaW1wb3J0IEpvaSBmcm9tICdqb2knO1xuaW1wb3J0IHsgREJDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vZGIvZGIuY29ubmVjdGlvbic7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdCc7XG5pbXBvcnQgZXJyb3JIYW5kbGVyIGZyb20gJy4uLy4uL2xhbmcvaGFuZGxlcnMvZXJyb3InO1xuaW1wb3J0IG1lc3NhZ2UgZnJvbSAnLi4vLi4vbGFuZy9tZXNzYWdlJztcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgcXVlcnkgZnJvbSAnLi4vaGVscGVycy9xdWVyeSc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3V0aWxzL2luZGV4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuICAvKipcbiAgICogc2lnbkluIGF1dGhzZXJ2aWNlIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBlbWFpbCAtIHRvIGNoZWNrIHVzZXIgZXhpc3RzIG9yIG5vdFxuICAgKiBAcmV0dXJucyB1c2VyIGRhdGFcbiAgICovXG4gIHN0YXRpYyBhc3luYyBzaWduSW4oXG4gICAgZW1haWw6IHN0cmluZyxcbiAgICBwYXNzd29yZDogc3RyaW5nLFxuICAgIGV4cGlyeURhdGU/OiBEYXRlLFxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IFt1c2VyXTogYW55ID0gYXdhaXQgREJDb25uZWN0aW9uLmV4ZWN1dGVTYW1wbGVRdWVyeShcbiAgICAgIHF1ZXJ5LnVzZXJRdWVyaWVzLmdldF91c2VyX2J5X21haWwsXG4gICAgICB7XG4gICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgIH0sXG4gICAgICAnc2VsZWN0JyxcbiAgICApO1xuICAgIGlmICh1c2VyICYmIHVzZXJbMF0pIHtcbiAgICAgIHJldHVybiB1c2VyWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogc2lnblVwIGF1dGhzZXJ2aWNlIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSByZXEuYm9keS5lbWFpbCAtIHRvIGNoZWNrIHVzZXIgZXhpc3RzIG9yIG5vdFxuICAgKiBAcmV0dXJucyBhZGRlZCBkYXRhIG9mIHVzZXJcbiAgICovXG5cbiAgc3RhdGljIHNpZ25VcCA9IGFzeW5jIChyZXM6IFJlc3BvbnNlLCByZXE6IFJlcXVlc3QpID0+IHtcbiAgICBjb25zdCBoYXNoID0gYXdhaXQgYmNyeXB0Lmhhc2gocmVxLmJvZHkucGFzc3dvcmQsIDEwKTtcbiAgICBjb25zdCBtYWlsID0gcmVxLmJvZHkuZW1haWw7XG4gICAgLy8gY29uc3QgZ2VuZGVyID0gcmVxLmJvZHkuZ2VuZGVyPy50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gY29uc3QgZG9iID0gbW9tZW50KFxuICAgIC8vICAgYCR7cmVxLmJvZHkuZG9ifSAwMDowMDowMC4wMGAsXG4gICAgLy8gICAnTU0vREQvWVlZWSBoaDptbTpzcy5tcycsXG4gICAgLy8gKS5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW06c3MubXMnKTtcblxuICAgIGNvbnN0IHNhdmV1c2VyOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgcXVlcnkudXNlclF1ZXJpZXMuYWRkX3VzZXJfZGV0YWlsLFxuICAgICAge1xuICAgICAgICBuYW1lOiByZXEuYm9keS5uYW1lLFxuICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWwsXG4gICAgICAgIHBob25lOiByZXEuYm9keS5waG9uZSxcbiAgICAgICAgcGFzc3dvcmQ6IGhhc2gsXG4gICAgICB9LFxuICAgICAgJ2luc2VydCcsXG4gICAgKTtcbiAgICAvLyBsb2dnZXIuaW5mbyhzYXZldXNlcik7XG5cbiAgICBjb25zdCBbbmV3VXNlcl06IGFueSA9IGF3YWl0IERCQ29ubmVjdGlvbi5leGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgICBxdWVyeS51c2VyUXVlcmllcy5nZXRfdXNlcl9ieV9tYWlsLFxuICAgICAge1xuICAgICAgICBlbWFpbDogbWFpbCxcbiAgICAgIH0sXG4gICAgICAnc2VsZWN0JyxcbiAgICApO1xuICAgIGxvZ2dlci5pbmZvKG5ld1VzZXIpO1xuICAgIGlmIChuZXdVc2VyWzBdKSB7XG4gICAgICByZXR1cm4gbmV3VXNlclswXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgc3RhdGljIGFzeW5jIGVtYWlsKHJlcTogUmVxdWVzdCkge1xuICAgIGNvbnN0IFt1c2Vyc106IGFueSA9IGF3YWl0IERCQ29ubmVjdGlvbi5leGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgICBxdWVyeS51c2VyUXVlcmllcy5nZXRfdXNlcl9ieV9tYWlsLFxuICAgICAgeyBlbWFpbDogcmVxLmJvZHkuZW1haWwgfSxcbiAgICApO1xuXG4gICAgaWYgKCF1c2Vyc1swXSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIHVzZXJuYW1lKHJlcTogUmVxdWVzdCkge1xuICAgIGNvbnN0IFt1c2Vyc106IGFueSA9IGF3YWl0IERCQ29ubmVjdGlvbi5leGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgICBxdWVyeS51c2VyUXVlcmllcy5nZXRfdXNlcl9ieV91c2VybmFtZSxcbiAgICAgIHsgdXNlcm5hbWU6IHJlcS5ib2R5LnVzZXJuYW1lIH0sXG4gICAgKTtcblxuICAgIGlmICghdXNlcnNbMF0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVVc2VyU2NoZW1hID0ge1xuICAgIGJsb2c6IEpvaS5vYmplY3QoKVxuICAgICAgLmtleXMoe1xuICAgICAgICBuYW1lOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgIC5yZWdleCgvXihbYS16QS1aIF0pezIsMzB9JC8pLFxuICAgICAgICBwaG9uZTogSm9pLnN0cmluZygpLnJlZ2V4KC9eWzAtOV17OSwxNH0kLyksXG4gICAgICAgIGVtYWlsOiBKb2kuc3RyaW5nKClcbiAgICAgICAgICAuZW1haWwoKVxuICAgICAgICAgIC5sb3dlcmNhc2UoKVxuICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgLnJlZ2V4KC9eW0EtWjAtOS5fJSstXStAW0EtWjAtOS4tXStcXC5bQS1aXXsyLDZ9JC9pKSxcbiAgICAgICAgcGFzc3dvcmQ6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgICAgLm1pbig4KVxuICAgICAgICAgIC5yZWdleChcbiAgICAgICAgICAgIC9eKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qWzAtOV0pKD89LipbIUAjXFwkJVxcXiZcXCpdKSg/PS57OCwxNX0pLyxcbiAgICAgICAgICApXG4gICAgICAgICAgLmxhYmVsKCdwYXNzd29yZCcpXG4gICAgICAgICAgLm1lc3NhZ2VzKHtcbiAgICAgICAgICAgICdzdHJpbmcubWluJzogJ011c3QgaGF2ZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMnLFxuICAgICAgICAgICAgJ29iamVjdC5yZWdleCc6ICdNdXN0IGhhdmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzKFVzZXIjQDEyMyknLFxuICAgICAgICAgICAgJ3N0cmluZy5wYXR0ZXJuLmJhc2UnOiAnUGFzc3dvcmQgZm9ybWF0IGlzIGluY29ycmVjdCcsXG4gICAgICAgICAgfSksXG4gICAgICB9KVxuICAgICAgLndpdGgoJ25hbWUnLCAnZW1haWwnKSxcbiAgfTtcblxuICBzdGF0aWMgc2lnbmluU2NoZW1hID0ge1xuICAgIGJsb2c6IEpvaS5vYmplY3QoKS5rZXlzKHtcbiAgICAgIGVtYWlsOiBKb2kuc3RyaW5nKClcbiAgICAgICAgLmVtYWlsKClcbiAgICAgICAgLmxvd2VyY2FzZSgpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5yZWdleCgvXltBLVowLTkuXyUrLV0rQFtBLVowLTkuLV0rXFwuW0EtWl17Miw2fSQvaSksXG4gICAgICBwYXNzd29yZDogSm9pLnN0cmluZygpXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC5taW4oOClcbiAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgIC9eKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qWzAtOV0pKD89LipbIUAjXFwkJVxcXiZcXCpdKSg/PS57OCwxNX0pLyxcbiAgICAgICAgKVxuICAgICAgICAubGFiZWwoJ3Bhc3N3b3JkJylcbiAgICAgICAgLm1lc3NhZ2VzKHtcbiAgICAgICAgICAnc3RyaW5nLm1pbic6ICdNdXN0IGhhdmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzJyxcbiAgICAgICAgICAnb2JqZWN0LnJlZ2V4JzogJ011c3QgaGF2ZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMoVXNlciNAMTIzKScsXG4gICAgICAgICAgJ3N0cmluZy5wYXR0ZXJuLmJhc2UnOlxuICAgICAgICAgICAgJ1Bhc3N3b3JkIG11c3QgaGF2ZSBhdCBsZWFzdCA4IGNoYXJhY3RlciB0aGF0IGluY2x1ZGUgYXQgbGVhc3QgMSBVcHBlcmNhc2UgY2hhcmFjdGVyLDEgbG93ZXJjYXNlIGNoYXJhY3RlciwxIG51bWJlciBhbmQgMSBzcGVjaWFsIGNoYXJhY3RlcighQCMkJV4mKikgaW4nLFxuICAgICAgICB9KSxcbiAgICB9KSxcbiAgfTtcbn1cbiIsIi8qKnBhdGllbnQgY29udHJvbGxlclxuICogQGF1dGhvcjogIEpEOTg5ODxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbjogUGF0aWVudCBQcm9maWxlIGNvbnRyb2xsZSBmdW5jdGlvbnNcbiAqL1xuXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IENsaWVudFNlcnZpY2UgZnJvbSAnLi9jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgc3VjY2Vzc0hhbmRsZXIgZnJvbSAnLi4vLi4vbGFuZy9oYW5kbGVycy9zdWNjZXNzJztcbmltcG9ydCBlcnJvckhhbmRsZXIgZnJvbSAnLi4vLi4vbGFuZy9oYW5kbGVycy9lcnJvcic7XG5pbXBvcnQgbWVzc2FnZSBmcm9tICcuLi8uLi9sYW5nL21lc3NhZ2UnO1xuaW1wb3J0IFVwZGF0ZURhdGEgZnJvbSAnLi4vYXBpLmRlZmluaXRpb25zJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uLy4uL2hlbHBlcnMvdXRpbHMvaW5kZXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnRDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcy5kZXRhaWwgPSB0aGlzLmRldGFpbC5iaW5kKHRoaXMpO1xuICAgIC8vIHRoaXMuUHJvZmlsZVVwZGF0ZSA9IHRoaXMuUHJvZmlsZVVwZGF0ZS5iaW5kKHRoaXMpO1xuICAgIC8vIHRoaXMuVmlld0ZhbWlseSA9IHRoaXMuVmlld0ZhbWlseS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgYXN5bmMgdXNlckxpc3QocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXNlckxpc3QgPSBhd2FpdCBDbGllbnRTZXJ2aWNlLnVzZXJMaXN0KHJlcSk7XG4gICAgICBpZiAodXNlckxpc3QpXG4gICAgICAgIHJldHVybiBzdWNjZXNzSGFuZGxlcihcbiAgICAgICAgICByZXMsXG4gICAgICAgICAgMjAwLFxuICAgICAgICAgIG1lc3NhZ2Uuc3VjY2Vzcy5nZXRVc2VyRGF0YVJldHJpdmVTdWNjZXNzRnVsbHksXG4gICAgICAgICAgdXNlckxpc3QsXG4gICAgICAgICk7XG4gICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCBtZXNzYWdlLmVycm9yLlVzZXJOb3RGb3VuZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAxLCBtZXNzYWdlLmVycm9yLnNvbWV0aGluZ1dlbnRXcm9uZ0Vycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyB1c2VyRGV0YWlsKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXJEZXRhaWwgPSBhd2FpdCBDbGllbnRTZXJ2aWNlLnVzZXJEZXRhaWwocmVxKTtcbiAgICAgIGlmICh1c2VyRGV0YWlsKVxuICAgICAgICByZXR1cm4gc3VjY2Vzc0hhbmRsZXIoXG4gICAgICAgICAgcmVzLFxuICAgICAgICAgIDIwMCxcbiAgICAgICAgICBtZXNzYWdlLnN1Y2Nlc3MuZ2V0VXNlckRhdGFSZXRyaXZlU3VjY2Vzc0Z1bGx5LFxuICAgICAgICAgIHVzZXJEZXRhaWxbMF0sXG4gICAgICAgICk7XG4gICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCBtZXNzYWdlLmVycm9yLlVzZXJOb3RGb3VuZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAxLCBtZXNzYWdlLmVycm9yLnNvbWV0aGluZ1dlbnRXcm9uZ0Vycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyB1c2VyVXBkYXRlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgZGF0YTogYW55ID0ge1xuICAgICAgbmFtZTogcmVxLmJvZHkubmFtZSB8fCAnJyxcbiAgICAgIHBob25lOiByZXEuYm9keS5waG9uZSB8fCAnJyxcbiAgICAgIHVzZXJJZDogcmVxLmJvZHkudXNlcklkIHx8ICcnLFxuICAgIH07XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgQ2xpZW50U2VydmljZS51c2VyVXBkYXRlKGRhdGEpO1xuICAgIGlmIChyZXN1bHQucm93Q291bnQgPiAwKSB7XG4gICAgICByZXR1cm4gc3VjY2Vzc0hhbmRsZXIocmVzLCAyMDAsIG1lc3NhZ2Uuc3VjY2Vzcy51c2VyRWRpdFN1Y2Nlc3NGdWxseSk7XG4gICAgfVxuICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDAsIG1lc3NhZ2UuZXJyb3Iuc29tZXRoaW5nV2VudFdyb25nRXJyb3IpO1xuICB9XG5cbiAgYXN5bmMgdXNlckRlbGV0ZShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGRhdGE6IGFueSA9IHtcbiAgICAgIHVzZXJJZDogcmVxLnF1ZXJ5LnVzZXJJZCxcbiAgICAgIGlzX2FjdGl2ZTogZmFsc2UsXG4gICAgICBpc19kZWxldGU6IHRydWUsXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBDbGllbnRTZXJ2aWNlLnVzZXJEZWxldGUoZGF0YSk7XG4gICAgaWYgKCFyZXN1bHQucm93Q291bnQpIHtcbiAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDAsIG1lc3NhZ2UuZXJyb3Iuc29tZXRoaW5nV2VudFdyb25nRXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gc3VjY2Vzc0hhbmRsZXIocmVzLCAyMDAsIG1lc3NhZ2Uuc3VjY2Vzcy51c2VyRGVsZXRTdWNjZXNzRnVsbHkpO1xuICB9XG5cbiAgYXN5bmMgYWRkQ2xpZW50KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBDbGllbnRTZXJ2aWNlLmNyZWF0ZUNsaWVudFNjaGVtYS5ibG9nLnZhbGlkYXRlKHJlcS5ib2R5KTtcbiAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgcmVzdWx0LmVycm9yLmRldGFpbHNbMF0ubWVzc2FnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlbWFpbFZhbGlkID0gYXdhaXQgQ2xpZW50U2VydmljZS5lbWFpbChyZXEpO1xuICAgICAgICBsb2dnZXIuaW5mbyhlbWFpbFZhbGlkKTtcbiAgICAgICAgaWYgKGVtYWlsVmFsaWQgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCBtZXNzYWdlLmVycm9yLmFscmVhZHlFeGlzdHNFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc3QgVmFsaWRVc2VybmFtZSA9IGF3YWl0IENsaWVudFNlcnZpY2UudXNlcm5hbWUocmVxKTtcbiAgICAgICAgLy8gbG9nZ2VyLmluZm8oVmFsaWRVc2VybmFtZSk7XG4gICAgICAgIC8vIGlmIChWYWxpZFVzZXJuYW1lID09PSBudWxsKSB7XG4gICAgICAgIC8vICAgcmV0dXJuIGVycm9ySGFuZGxlcihcbiAgICAgICAgLy8gICAgIHJlcyxcbiAgICAgICAgLy8gICAgIDQwMCxcbiAgICAgICAgLy8gICAgIG1lc3NhZ2UuZXJyb3IudXNlcm5hbWVhbHJlYWR5RXhpc3RzRXJyb3IsXG4gICAgICAgIC8vICAgKTtcbiAgICAgICAgLy8gfVxuICAgICAgICBjb25zdCB0b2tlbkRhdGEgPSBhd2FpdCBDbGllbnRTZXJ2aWNlLmFkZENsaWVudChyZXMsIHJlcSk7XG4gICAgICAgIGlmICh0b2tlbkRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gc3VjY2Vzc0hhbmRsZXIoXG4gICAgICAgICAgICByZXMsXG4gICAgICAgICAgICAyMDAsXG4gICAgICAgICAgICBtZXNzYWdlLnN1Y2Nlc3MuQ2xpZW50QWRkU3VjY2Vzc0Z1bGx5LFxuICAgICAgICAgICAgdG9rZW5EYXRhLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmluZm8odG9rZW5EYXRhKTtcbiAgICAgICAgLy8gaWYgKHRva2VuRGF0YSkge1xuICAgICAgICAvLyAgIGNvbnN0IGlkID0gdG9rZW5EYXRhLmlkO1xuICAgICAgICAvLyAgIGNvbnN0IHRva2VuID0gSldULmNyZWF0ZVRva2VuKHtcbiAgICAgICAgLy8gICAgIGlkLFxuICAgICAgICAvLyAgIH0pO1xuICAgICAgICAvLyBpZiAodG9rZW4pIHtcbiAgICAgICAgLy8gICB0b2tlbkRhdGEudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgLy8gICBjb25zdCBleHBpcmVkX29uID0gTWF0aC5mbG9vcihEYXRlLm5vdygpKSArIDI0ICogNjAgKiA2MCAqIDEwMDA7XG4gICAgICAgIC8vICAgY29uc3Qgc3RyID0gbmV3IERhdGUoZXhwaXJlZF9vbikudG9VVENTdHJpbmcoKTtcbiAgICAgICAgLy8gICBjb25zdCBzYXZlQWNjZXNzdG9rZW4gPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgICAvLyAgICAgcXVlcnkudXNlclF1ZXJpZXMuaW5zZXJ0X2FjY2Vzc190b2tlbixcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICAvLyAgICAgICBpZDogdG9rZW5EYXRhLmlkLFxuICAgICAgICAvLyAgICAgICBleHA6IHN0cixcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICAnaW5zZXJ0JyxcbiAgICAgICAgLy8gICApO1xuICAgICAgICAvLyAgIHJldHVybiBzdWNjZXNzSGFuZGxlcihcbiAgICAgICAgLy8gICAgIHJlcyxcbiAgICAgICAgLy8gICAgIDIwMCxcbiAgICAgICAgLy8gICAgIG1lc3NhZ2Uuc3VjY2Vzcy5zaWduVXBTdWNjZXNzRnVsbHksXG4gICAgICAgIC8vICAgICB0b2tlbkRhdGEsXG4gICAgICAgIC8vICAgKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgICAvLyAgIHF1ZXJ5LnVzZXJRdWVyaWVzLmRlbGV0ZV91c2VyX2RldGFpbCxcbiAgICAgICAgLy8gICB7IGlkOiB0b2tlbkRhdGEuaWQgfSxcbiAgICAgICAgLy8gICAnZGVsZXRlJyxcbiAgICAgICAgLy8gKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5pbmZvKCdlcnJvcicsIGVycik7XG4gICAgICBlcnJvckhhbmRsZXIocmVzLCA0MDAsIG1lc3NhZ2UuZXJyb3IudG9rZW5Ob3RGb3VuZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqdmlldyBwYXRpZW50IGZhbWlseSBkZXRhaWxzIGNvbnRyb2xsZXJcbiAgICogQGF1dGhvcjogIEpEOTg5ODxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAgICogQGRlc2NyaXB0aW9uOnZpZXcgUGF0aWVudCBmYW1pbHkgZGV0YWlscyB3aGljaCBpcyBhbHJlYWR5IGFkZCBieSBwYXRpZW50cyAmIHJlZ2lzdGVyIGluIG91ciBzaWRlLCB0aGlzIGRldGFpbHMgc2hvdyBpbiBwYXRpZW50IHByb2ZpbGUuXG4gICAqICBAcmV0dXJuOiBmYW1pbHkgbWVtYmVyIGxpc3QuXG4gICAqL1xuICAvLyBhc3luYyBWaWV3RmFtaWx5KHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSk6IFByb21pc2U8YW55PiB7XG4gIC8vICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgQ2xpZW50U2VydmljZS5WaWV3RmFtaWx5KHJlcSk7XG4gIC8vICAgaWYgKCFyZXN1bHQpIHtcbiAgLy8gICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDAsIG1lc3NhZ2UuZXJyb3Iuc29tZXRoaW5nV2VudFdyb25nRXJyb3IpO1xuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gc3VjY2Vzc0hhbmRsZXIocmVzLCAyMDAsIG1lc3NhZ2Uuc3VjY2Vzcy5zaG93RmFtaWx5LCByZXN1bHQpO1xuICAvLyB9XG59XG4iLCIvKipwYXRpZW50ZGV0YWlscyByb3V0ZXJzXG4gKiBAYXV0aG9yOiAgSkQ5ODk4PGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICogQGRlc2NyaXB0aW9uOkFkZCBhbGwgcm91dGVycyBmb3IgUGF0aWVudCBQcm9maWxlIGRldGFpbHMgd2l0aCBzaG93IGZhbWlseSBtZW1iZXIgaXMgaGVyZS5cbiAqL1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCBDbGllbnRDb250cm9sbGVyIGZyb20gJy4vY2xpZW50LmNvbnRyb2xsZXInO1xuXG5jb25zdCBjbGllbnRDb250cm9sbGVyID0gbmV3IENsaWVudENvbnRyb2xsZXIoKTtcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKHsgbWVyZ2VQYXJhbXM6IHRydWUgfSk7XG5yb3V0ZXIucm91dGUoJy9jbGllbnRMaXN0JykuZ2V0KGNsaWVudENvbnRyb2xsZXIudXNlckxpc3QpO1xucm91dGVyLnJvdXRlKCcvY2xpZW50RGV0YWlsJykuZ2V0KGNsaWVudENvbnRyb2xsZXIudXNlckRldGFpbCk7XG5yb3V0ZXIucm91dGUoJy91cGRhdGVDbGllbnQnKS5wdXQoY2xpZW50Q29udHJvbGxlci51c2VyVXBkYXRlKTtcbnJvdXRlci5yb3V0ZSgnL2RlbGV0ZUNsaWVudCcpLmRlbGV0ZShjbGllbnRDb250cm9sbGVyLnVzZXJEZWxldGUpO1xucm91dGVyLnJvdXRlKCcvYWRkQ2xpZW50JykucG9zdChjbGllbnRDb250cm9sbGVyLmFkZENsaWVudCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsIi8qKiB1c2VyZGV0YWlscyBzZXJ2aWNlc1xuICogQGF1dGhvcjogIEpEOTg5ODxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbjp1c2VyIFByb2ZpbGUgZGV0YWlscyBzZXJ2aWNlcyBpcyBoZXJlLlxuICovXG5pbXBvcnQgeyBRdWVyeVR5cGVzIH0gZnJvbSAnc2VxdWVsaXplJztcbmltcG9ydCBjb25maWcsIHsgQ29uZmlnS2V5IH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZyc7XG5pbXBvcnQgeyBEQkNvbm5lY3Rpb24gfSBmcm9tICcuLi8uLi9kYi9kYi5jb25uZWN0aW9uJztcbmltcG9ydCBxdWVyaWVzIGZyb20gJy4uL2hlbHBlcnMvcXVlcnknO1xuaW1wb3J0IFVwZGF0ZURhdGEgZnJvbSAnLi4vYXBpLmRlZmluaXRpb25zJztcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBKb2kgZnJvbSAnam9pJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0JztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmNvbnN0IGdlbmVyYXRvciA9IHJlcXVpcmUoJ2dlbmVyYXRlLXBhc3N3b3JkJyk7XG5pbXBvcnQgc2VuZENsaWVudE1haWwgZnJvbSAnLi4vLi4vdmlldy9jbGllbnQubWFpbC5oZWxwZXInO1xuaW1wb3J0IG1lc3NhZ2UgZnJvbSAnLi4vLi4vbGFuZy9tZXNzYWdlJztcbmltcG9ydCB7IGZvcmdvdENvbmZpZyB9IGZyb20gJy4uL2ZvcmdvdFBhc3N3b3JkL2ZvcmdvdC5jb25maWcnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vaGVscGVycy91dGlscy9pbmRleCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnRTZXJ2aWNlIHtcbiAgLyoqR2V0IHVzZXJkZXRhaWxzIHNlcnZpY2VzXG4gICAqIEBhdXRob3I6ICBKRDk4OTg8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gICAqIEBkZXNjcmlwdGlvbjpHRVQgdXNlciBQcm9maWxlIGRldGFpbHMgdXNpbmcgRW1haWwuXG4gICAqIEByZXR1cm46IGFsbCB0aGUgdXNlcnMgZGV0YWlscyB5b3UgbmVlZC5cbiAgICovXG5cbiAgc3RhdGljIGFzeW5jIGVtYWlsKHJlcTogUmVxdWVzdCkge1xuICAgIGNvbnN0IFt1c2Vyc106IGFueSA9IGF3YWl0IERCQ29ubmVjdGlvbi5leGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgICBxdWVyaWVzLnVzZXJRdWVyaWVzLmdldF91c2VyX2J5X21haWwsXG4gICAgICB7IGVtYWlsOiByZXEuYm9keS5lbWFpbCB9LFxuICAgICk7XG5cbiAgICBpZiAoIXVzZXJzWzBdKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgdXNlcm5hbWUocmVxOiBSZXF1ZXN0KSB7XG4gICAgY29uc3QgW3VzZXJzXTogYW55ID0gYXdhaXQgREJDb25uZWN0aW9uLmV4ZWN1dGVTYW1wbGVRdWVyeShcbiAgICAgIHF1ZXJpZXMudXNlclF1ZXJpZXMuZ2V0X3VzZXJfYnlfdXNlcm5hbWUsXG4gICAgICB7IHVzZXJuYW1lOiByZXEuYm9keS51c2VybmFtZSB9LFxuICAgICk7XG5cbiAgICBpZiAoIXVzZXJzWzBdKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgdXNlckxpc3Q8VERldGFpbCA9IGFueT4ocmVxOiBhbnkpOiBQcm9taXNlPFREZXRhaWw+IHtcbiAgICB0cnkge1xuICAgICAgLy8gbG9nZ2VyLmluZm8oJ3VzZXJpZCcsIHJlcS51c2VyLmlkKTtcbiAgICAgIGNvbnN0IFt1c2VyTGlzdF06IGFueSA9IGF3YWl0IERCQ29ubmVjdGlvbi5leGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgICAgIHF1ZXJpZXMudXNlclF1ZXJpZXMudXNlckxpc3QsXG4gICAgICAgIHt9LFxuICAgICAgKTtcbiAgICAgIGlmICh1c2VyTGlzdCkgcmV0dXJuIHVzZXJMaXN0O1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgdXNlckRldGFpbDxURGV0YWlsID0gYW55PihyZXE6IGFueSk6IFByb21pc2U8VERldGFpbD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBbdXNlckRldGFpbF06IGFueSA9IGF3YWl0IERCQ29ubmVjdGlvbi5leGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgICAgIHF1ZXJpZXMudXNlclF1ZXJpZXMudXNlckRldGFpbCxcbiAgICAgICAge1xuICAgICAgICAgIHVzZXJJZDogcmVxLnF1ZXJ5LnVzZXJJZCxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICBpZiAodXNlckRldGFpbCkgcmV0dXJuIHVzZXJEZXRhaWw7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhc3luYyB1c2VyVXBkYXRlPFREZXRhaWwgPSBVcGRhdGVEYXRhPihcbiAgICBkYXRhOiBVcGRhdGVEYXRhLFxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIHNlbmQgcmVzcG9uc2UgZnJvbSBoZXJlXG4gICAgY29uc3QgdXBkYXRlOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgcXVlcmllcy51c2VyUXVlcmllcy51c2VyVXBkYXRlLFxuICAgICAgeyAuLi5kYXRhIH0sXG4gICAgICBRdWVyeVR5cGVzLlVQREFURSxcbiAgICApO1xuICAgIHJldHVybiB1cGRhdGVbMV07XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgdXNlckRlbGV0ZTxURGV0YWlsID0gVXBkYXRlRGF0YT4oXG4gICAgZGF0YTogVXBkYXRlRGF0YSxcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBzZW5kIHJlc3BvbnNlIGZyb20gaGVyZVxuICAgIGNvbnN0IHVwZGF0ZTogYW55ID0gYXdhaXQgREJDb25uZWN0aW9uLmV4ZWN1dGVTYW1wbGVRdWVyeShcbiAgICAgIHF1ZXJpZXMudXNlclF1ZXJpZXMudXNlckRlbGV0ZSxcbiAgICAgIHsgLi4uZGF0YSxcbiAgICAgICAgdXNlcklkOiBkYXRhLnVzZXJJZCB9LFxuICAgICAgUXVlcnlUeXBlcy5ERUxFVEUsXG4gICAgKTtcbiAgICByZXR1cm4gdXBkYXRlWzFdO1xuICB9XG5cbiAgLyoqVXBkYXRlIHVzZXJkZXRhaWxzIGNvbnRyb2xsZXJcbiAgICogQGF1dGhvcjogIEpEOTg5ODxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAgICogQGRlc2NyaXB0aW9uOlVwZGF0ZSB1c2VyIFByb2ZpbGUgZGV0YWlscyB3aXRoIHVwZGF0ZSBxdWVyeS5cbiAgICogQHJldHVybjogdXBkYXRlZCByb3cgd2l0aCBkYXRhLlxuICAgKi9cblxuICBzdGF0aWMgYXN5bmMgUHJvZmlsZVVwZGF0ZTxURGV0YWlsID0gVXBkYXRlRGF0YT4oXG4gICAgZGF0YTogVXBkYXRlRGF0YSxcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBzZW5kIHJlc3BvbnNlIGZyb20gaGVyZVxuICAgIGNvbnN0IHVwZGF0ZTogYW55ID0gYXdhaXQgREJDb25uZWN0aW9uLmV4ZWN1dGVTYW1wbGVRdWVyeShcbiAgICAgIHF1ZXJpZXMudXNlclF1ZXJpZXMudXBkYXRlX3VzZXIsXG4gICAgICB7IC4uLmRhdGEgfSxcbiAgICAgIFF1ZXJ5VHlwZXMuVVBEQVRFLFxuICAgICk7XG4gICAgcmV0dXJuIHVwZGF0ZVsxXTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRDbGllbnQgPSBhc3luYyAocmVzOiBhbnksIHJlcTogYW55KSA9PiB7XG4gICAgLy8gY29uc3QgaGFzaCA9IGF3YWl0IGJjcnlwdC5oYXNoKHJlcS5ib2R5LnBhc3N3b3JkLCAxMCk7XG4gICAgY29uc3QgZW1haWwgPSByZXEuYm9keS5lbWFpbC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgY29uc3QgZ2VuZGVyID0gcmVxLmJvZHkuZ2VuZGVyPy50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGdlblNpbmdsZVBhc3N3b3JkID0gZ2VuZXJhdG9yLmdlbmVyYXRlKHtcbiAgICAgIGxlbmd0aDogMTAsXG4gICAgICBudW1iZXJzOiB0cnVlLFxuICAgICAgbG93ZXJjYXNlOiB0cnVlLFxuICAgICAgdXBwZXJjYXNlOiB0cnVlLFxuICAgICAgc3ltYm9sczogdHJ1ZSxcbiAgICAgIGV4Y2x1ZGU6ICcuLz9+KCl7fV1bfC1fKz1gOzpcIl48PicsXG4gICAgICBleGNsdWRlU2ltaWxhckNoYXJhY3RlcnM6IHRydWUsXG4gICAgICBzdHJpY3Q6IHRydWUsXG4gICAgfSk7XG4gICAgY29uc3QgcGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChnZW5TaW5nbGVQYXNzd29yZCwgMTApO1xuICAgIGNvbnN0IGRvYiA9IG1vbWVudChcbiAgICAgIGAke3JlcS5ib2R5LmRvYn0gMDA6MDA6MDAuMDBgLFxuICAgICAgJ01NL0REL1lZWVkgaGg6bW06c3MubXMnLFxuICAgICkuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tOnNzLm1zJyk7XG5jb25zb2xlLmxvZyhyZXEuYm9keSk7XG5cbiAgICBjb25zdCBzYXZldXNlcjogYW55ID0gYXdhaXQgREJDb25uZWN0aW9uLmV4ZWN1dGVTYW1wbGVRdWVyeShcbiAgICAgIHF1ZXJpZXMudXNlclF1ZXJpZXMuYWRkX2NsaWVudF9kZXRhaWwsXG4gICAgICB7XG4gICAgICAgIG5hbWU6IHJlcS5ib2R5Lm5hbWUsXG4gICAgICAgIGVtYWlsOiByZXEuYm9keS5lbWFpbCxcbiAgICAgICAgcGhvbmU6IHJlcS5ib2R5LnBob25lLFxuICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgfSxcbiAgICAgICdpbnNlcnQnLFxuICAgICk7XG4gICAgaWYgKHNhdmV1c2VyKSB7XG4gICAgICBhd2FpdCBzZW5kQ2xpZW50TWFpbChcbiAgICAgICAge1xuICAgICAgICAgIGVtYWlsOiByZXEuYm9keS5lbWFpbC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgIHBhc3N3b3JkOiBnZW5TaW5nbGVQYXNzd29yZCxcbiAgICAgICAgICBtYWlsTGluazogZm9yZ290Q29uZmlnLm1haWxMaW5rLFxuICAgICAgICAgIGdvb2dsZUxpbms6IGZvcmdvdENvbmZpZy5nb29nbGVGb3JtTGluayxcbiAgICAgICAgfSxcbiAgICAgICAgJ0FkZENsaWVudC5lanMnLFxuICAgICAgICB7IGVtYWlsOiByZXEuYm9keS5lbWFpbC50b0xvd2VyQ2FzZSgpLCBwYXNzd29yZDogZ2VuU2luZ2xlUGFzc3dvcmQgfSxcbiAgICAgICAgbWVzc2FnZS5zdWJqZWN0LndlbGNvbWVUb0FIUyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgW25ld1VzZXJdOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgcXVlcmllcy51c2VyUXVlcmllcy5nZXRfdXNlcl9ieV9tYWlsLFxuICAgICAge1xuICAgICAgICBlbWFpbDogcmVxLmJvZHkuZW1haWwsXG4gICAgICB9LFxuICAgICAgJ3NlbGVjdCcsXG4gICAgKTtcbiAgICBsb2dnZXIuaW5mbyhuZXdVc2VyKTtcbiAgICBpZiAobmV3VXNlclswXSkge1xuICAgICAgcmV0dXJuIG5ld1VzZXJbMF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIHN0YXRpYyBjcmVhdGVVc2VyU2NoZW1hID0ge1xuICAgIGJsb2c6IEpvaS5vYmplY3QoKVxuICAgICAgLmtleXMoe1xuICAgICAgICB1c2VybmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgICAgIC8vIHBhdGllbnRfdW5pcXVlX2lkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICAgICAgZmlyc3RfbmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAucmVnZXgoL14oW2EtekEtWiBdKXsyLDMwfSQvKSxcbiAgICAgICAgLy8gbWlkZGxlX25hbWU6IEpvaS5zdHJpbmcoKVxuICAgICAgICAvLyAgIC5yZXF1aXJlZCgpXG4gICAgICAgIC8vICAgLnJlZ2V4KC9eKFthLXpBLVogXSl7MSwzMH0kLyksXG4gICAgICAgIGxhc3RfbmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAucmVnZXgoL14oW2EtekEtWiBdKXsyLDMwfSQvKSxcbiAgICAgICAgc3RyZWV0OiBKb2kuc3RyaW5nKCksXG4gICAgICAgIHBob25lOiBKb2kuc3RyaW5nKCkucmVnZXgoL15bMC05XXs5LDE0fSQvKSxcbiAgICAgICAgZW1haWw6IEpvaS5zdHJpbmcoKVxuICAgICAgICAgIC5lbWFpbCgpXG4gICAgICAgICAgLmxvd2VyY2FzZSgpXG4gICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAucmVnZXgoL15bQS1aMC05Ll8lKy1dK0BbQS1aMC05Li1dK1xcLltBLVpdezIsNn0kL2kpLFxuICAgICAgICBwYXNzd29yZDogSm9pLnN0cmluZygpXG4gICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAubWluKDgpXG4gICAgICAgICAgLnJlZ2V4KFxuICAgICAgICAgICAgL14oPz0uKlthLXpdKSg/PS4qW0EtWl0pKD89LipbMC05XSkoPz0uKlshQCNcXCQlXFxeJlxcKl0pKD89Lns4LDE1fSkvLFxuICAgICAgICAgIClcbiAgICAgICAgICAubGFiZWwoJ3Bhc3N3b3JkJylcbiAgICAgICAgICAubWVzc2FnZXMoe1xuICAgICAgICAgICAgJ3N0cmluZy5taW4nOiAnTXVzdCBoYXZlIGF0IGxlYXN0IDggY2hhcmFjdGVycycsXG4gICAgICAgICAgICAnb2JqZWN0LnJlZ2V4JzogJ011c3QgaGF2ZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMoVXNlciNAMTIzKScsXG4gICAgICAgICAgICAnc3RyaW5nLnBhdHRlcm4uYmFzZSc6ICdQYXNzd29yZCBmb3JtYXQgaXMgaW5jb3JyZWN0JyxcbiAgICAgICAgICB9KSxcbiAgICAgIH0pXG4gICAgICAud2l0aCgnZmlyc3ROYW1lJywgJ2VtYWlsJyksXG4gIH07XG5cbiAgc3RhdGljIGNyZWF0ZUNsaWVudFNjaGVtYSA9IHtcbiAgICBibG9nOiBKb2kub2JqZWN0KClcbiAgICAgIC5rZXlzKHtcbiAgICAgICAgbmFtZTogSm9pLnN0cmluZygpXG4gICAgICAgICAgLnJlcXVpcmVkKClcbiAgICAgICAgICAucmVnZXgoL14oW2EtekEtWiBdKXsyLDMwfSQvKSxcbiAgICAgICAgcGhvbmU6IEpvaS5zdHJpbmcoKS5yZWdleCgvXlswLTldezksMTR9JC8pLFxuICAgICAgICBlbWFpbDogSm9pLnN0cmluZygpXG4gICAgICAgICAgLmVtYWlsKClcbiAgICAgICAgICAubG93ZXJjYXNlKClcbiAgICAgICAgICAucmVxdWlyZWQoKVxuICAgICAgICAgIC5yZWdleCgvXltBLVowLTkuXyUrLV0rQFtBLVowLTkuLV0rXFwuW0EtWl17Miw2fSQvaSksXG4gICAgICB9KVxuICAgICAgLndpdGgoJ25hbWUnLCAnZW1haWwnKSxcbiAgfTtcblxuICAvKip2aWV3IHVzZXIgcHJvZmlsZSBkZXRhaWxzIHNlcnZpY2VzXG4gICAqIEBhdXRob3I6ICBKRDk4OTg8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gICAqIEBkZXNjcmlwdGlvbjp2aWV3IGZhbWlseSBtZW1iZXIgaW4gdXNlciBQcm9maWxlIHVzaW5nIHVzZXJfaWQuXG4gICAqIEByZXR1cm46IGZhbWlseSBtZW1iZXIgbGlzdC5cbiAgICovXG5cbiAgLy8gc3RhdGljIGFzeW5jIFZpZXdGYW1pbHk8VERldGFpbCA9IGFueT4ocmVxOiBSZXF1ZXN0KTogUHJvbWlzZTxhbnk+IHtcbiAgLy8gICAvLyBzZW5kIHJlc3BvbnNlIGZyb20gaGVyZVxuICAvLyAgIGNvbnN0IGlkOiBhbnkgPSByZXEucXVlcnkudXNlcl9pZDtcbiAgLy8gICBjb25zdCBsaXN0OiBhbnkgPSByZXEucXVlcnkucGFnZV9zaXplO1xuICAvLyAgIGNvbnN0IHBhZ2Vfbm86IGFueSA9IHJlcS5xdWVyeS5wYWdlX25vO1xuICAvLyAgIGNvbnN0IGxpbWl0OiBhbnkgPSBsaXN0ID4gMCA/IGxpc3QgOiAxMDtcbiAgLy8gICBjb25zdCBvZmZzZXQ6IG51bWJlciA9IHBhZ2Vfbm8gKiBsaW1pdCA+IDAgPyBwYWdlX25vICogbGltaXQgOiAwO1xuICAvLyAgIGNvbnN0IHJlc3VsdDogYW55ID0gYXdhaXQgREJDb25uZWN0aW9uLmV4ZWN1dGVTYW1wbGVRdWVyeShcbiAgLy8gICAgIHF1ZXJpZXMudXNlclF1ZXJpZXMudmlld19mYW1pbHksXG4gIC8vICAgICB7IHVzZXJfaWQ6IGlkLCBwYWdlX3NpemU6IGxpbWl0LCBwYWdlX25vOiBvZmZzZXQgfSxcbiAgLy8gICAgIFF1ZXJ5VHlwZXMuU0VMRUNULFxuICAvLyAgICk7XG4gIC8vICAgcmV0dXJuIHJlc3VsdFswXTtcbiAgLy8gfVxufVxuIiwiLyoqIGNyZWF0ZSBPVFBcbiAqIEBhdXRob3I6IEpEOTg5OCA8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gKiBAZGVzY3JpcHRpb246IHVzaW5nIG90cC1nZW5lcmF0b3IgY3JlYXRlIG5ldyBvdHAgZm9yIHNlbmRpbmcgbWFpbFxuICovXG5pbXBvcnQgb3RwR2VuZXJhdG9yIGZyb20gJ290cC1nZW5lcmF0b3InO1xuXG5jb25zdCBnZW5lcmF0ZU9UUDogYW55ID0gKCkgPT4ge1xuICBjb25zdCBPVFAgPSBvdHBHZW5lcmF0b3IuZ2VuZXJhdGUoNiwge1xuICAgIHVwcGVyQ2FzZUFscGhhYmV0czogZmFsc2UsXG4gICAgbG93ZXJDYXNlQWxwaGFiZXRzOiBmYWxzZSxcbiAgICBzcGVjaWFsQ2hhcnM6IGZhbHNlLFxuICB9KTtcblxuICByZXR1cm4gT1RQO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlT1RQO1xuIiwiLyoqIHNlbmQgbWFpbCBjb25maWcgZmlsZVxuICogQGF1dGhvcjogSkQ5ODk4IDxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbjogbWFpbCBzZW5kIHVzaW5nIG11bHRlciwgYWRkIGNvbmZpZyBpbiB0aGlzIGZpbGUuXG4gKi9cbmV4cG9ydCBjb25zdCBmb3Jnb3RDb25maWcgPSB7XG4gIGFjY2Vzc0tleUlkOiBTdHJpbmcocHJvY2Vzcy5lbnYuUzNfQUNDRVNTX0tFWV9JRCksXG4gIHNlY3JldEFjY2Vzc0tleTogU3RyaW5nKHByb2Nlc3MuZW52LlMzX1NFQ1JFVF9BQ0NFU1NfS0VZKSxcbiAgYnVja2V0TmFtZTogU3RyaW5nKHByb2Nlc3MuZW52LkFXU19TM19CVUNLRVQpLFxuICBSZWdpb246IFN0cmluZyhwcm9jZXNzLmVudi5TM19SRUdJT04pLFxuICBmb2xkZXJOYW1lOiBTdHJpbmcocHJvY2Vzcy5lbnYuQVdTX1MzX0ZPTERFUiksXG4gIEZpbGVzQUNMOiBTdHJpbmcocHJvY2Vzcy5lbnYuUzNfQUNMKSxcbiAgdXNlck1haWw6IFN0cmluZyhwcm9jZXNzLmVudi5VU0VSX01BSUwpLFxuICBwYXNzd29yZDogU3RyaW5nKHByb2Nlc3MuZW52LlBBU1NXT1JEKSxcbiAgc2lkOiBTdHJpbmcocHJvY2Vzcy5lbnYuU0lEKSxcbiAgYXV0aFRva2VuOiBTdHJpbmcocHJvY2Vzcy5lbnYuQVVUSF9UT0tFTiksXG4gIHR3aWxpb01vOiBTdHJpbmcocHJvY2Vzcy5lbnYuVFdJTElPX01PKSxcbiAgbG9naW5MaW5rOiBTdHJpbmcocHJvY2Vzcy5lbnYuTE9HSU5fTElOSyksXG4gIGZvcmdldExpbms6IFN0cmluZyhwcm9jZXNzLmVudi5GT1JHRVRfTElOSyksXG4gIG1haWxMaW5rOiBTdHJpbmcocHJvY2Vzcy5lbnYuTUFJTF9MSU5LKSxcbiAgZ29vZ2xlRm9ybUxpbms6IFN0cmluZyhwcm9jZXNzLmVudi5HT09HTEVfRk9STV9MSU5LKSxcbn07XG4iLCIvKipmb3Jnb3QgUGFzc3dvcmQgd2l0aCBzZW5kIG1haWwgZnVuY3Rpb24gY29udHJvbGxlclxuICogQGF1dGhlciBKRDk4OTggPGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICogQGRlc2NyaXB0aW9uOiBGb3Jnb3QgUGFzc3dvcmQgZnVuY3Rpb24gY29udHJvbGxlclxuICovXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IEZvcmdvdFNlcnZpY2UgZnJvbSAnLi9mb3Jnb3Quc2VydmljZSc7XG5pbXBvcnQgc3VjY2Vzc0hhbmRsZXIgZnJvbSAnLi4vLi4vbGFuZy9oYW5kbGVycy9zdWNjZXNzJztcbmltcG9ydCB7IGZvcmdvdENvbmZpZyB9IGZyb20gJy4vZm9yZ290LmNvbmZpZyc7XG5pbXBvcnQgbWVzc2FnZSBmcm9tICcuLi8uLi9sYW5nL21lc3NhZ2UnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQnO1xuaW1wb3J0IGVycm9ySGFuZGxlciBmcm9tICcuLi8uLi9sYW5nL2hhbmRsZXJzL2Vycm9yJztcbmltcG9ydCB7IHNlbmRNYWlsT3RwIH0gZnJvbSAnLi9tYWlsJztcbmltcG9ydCBzZW5kTWFpbCBmcm9tICcuLi8uLi92aWV3L21haWwuaGVscGVyJztcbmltcG9ydCBnZW5lcmF0ZU9UUCBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgeyBuZXdfcGFzc3dvcmQgfSBmcm9tICcuLi9oZWxwZXJzL3ZhbGlkYXRpb24vZm9yZ290LnZhbGlkYXRpb24nO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vaGVscGVycy91dGlscy9pbmRleCc7XG5cbmZ1bmN0aW9uIEFkZE1pbnV0ZXNUb0RhdGUoZGF0ZSwgbWludXRlcykge1xuICByZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkgKyBtaW51dGVzICogNjAgKiAxMDAwKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmdvdENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZvcmdvdCA9IHRoaXMuZm9yZ290LmJpbmQodGhpcyk7XG4gICAgdGhpcy52ZXJpZmljYXRpb24gPSB0aGlzLnZlcmlmaWNhdGlvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmV3UGFzc3dvcmQgPSB0aGlzLm5ld1Bhc3N3b3JkLmJpbmQodGhpcyk7XG4gIH1cbiAgLy8gZm9yZ290IFBhc3N3b3JkIFJlcXVlc3QgLy9cbiAgLyoqc2VuZCBNYWlsICYgT1RQIEdlbmVyYXRlXG4gICAqIEBhdXRoZXIgSkQ5ODk4IDxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAgICogQGRlc2NyaXB0aW9uOiBzZW5kIG1haWwgZm9yIGdldCBPVFBcbiAgICogQHJldHVybnM6IHNlbmQgT1RQIGluIG1haWxcbiAgICovXG4gIGFzeW5jIGZvcmdvdChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHsgZW1haWwgfSA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IG90cEdlbmVyYXRlZCA9IGdlbmVyYXRlT1RQKCk7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBleHBpcmVfdGltZSA9IEFkZE1pbnV0ZXNUb0RhdGUobm93LCAxNSk7XG5cbiAgICBpZiAoIWVtYWlsKSByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCBtZXNzYWdlLmVycm9yLmVtYWlsUmVxdWlyZWRFcnJvcik7XG4gICAgY29uc3QgZW1haWxWYWxpZCA9IGF3YWl0IEZvcmdvdFNlcnZpY2UuZW1haWwocmVxKTtcbiAgICAvLyBsb2dnZXIuaW5mbyhlbWFpbFZhbGlkKTtcbiAgICBpZiAoZW1haWxWYWxpZCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci5ub3RSZWdpc3RlcmVkRXJyb3IpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBGb3Jnb3RTZXJ2aWNlLmZvcmdvdChlbWFpbCwgb3RwR2VuZXJhdGVkLCBleHBpcmVfdGltZSk7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBhd2FpdCBzZW5kTWFpbChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgIG90cDogb3RwR2VuZXJhdGVkLFxuICAgICAgICAgICAgbWFpbExpbms6IGZvcmdvdENvbmZpZy5tYWlsTGluayxcbiAgICAgICAgICAgIGdvb2dsZUxpbms6IGZvcmdvdENvbmZpZy5nb29nbGVGb3JtTGluayxcbiAgICAgICAgICB9LFxuICAgICAgICAgICdmb3JnZXQuZWpzJyxcbiAgICAgICAgICBtZXNzYWdlLnN1YmplY3Qud2VsY29tZVRvQUhTLFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBzdWNjZXNzSGFuZGxlcihyZXMsIDIwMCwgbWVzc2FnZS5zdWNjZXNzLnNlbmRNYWlsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDEsIG1lc3NhZ2UuZXJyb3IuZW1haWxOb3RGb3VuZEVycm9yKTtcbiAgICAgIC8vIG90aGVyd2lzZSB3ZSBuZWVkIHRvIGNyZWF0ZSBhIHRlbXBvcmFyeSB0b2tlbiB0aGF0IGV4cGlyZXMgaW4gMTAgbWluc1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmluZm8oZXJyKTtcbiAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDQsIG1lc3NhZ2UuZXJyb3Iuc29tZXRoaW5nV2VudFdyb25nRXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlc2VuZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHsgZW1haWwgfSA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IG90cEdlbmVyYXRlZCA9IGdlbmVyYXRlT1RQKCk7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBleHBpcmVfdGltZSA9IEFkZE1pbnV0ZXNUb0RhdGUobm93LCAxNSk7XG5cbiAgICBpZiAoIWVtYWlsKSByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCBtZXNzYWdlLmVycm9yLmVtYWlsUmVxdWlyZWRFcnJvcik7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgRm9yZ290U2VydmljZS5yZXNlbmQoZW1haWwsIG90cEdlbmVyYXRlZCwgZXhwaXJlX3RpbWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgYXdhaXQgc2VuZE1haWxPdHAoe1xuICAgICAgICAgIHRvOiBlbWFpbCxcbiAgICAgICAgICBvdHA6IG90cEdlbmVyYXRlZCxcbiAgICAgICAgICBleHBpcmVfdGltZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHN1Y2Nlc3NIYW5kbGVyKHJlcywgMjAwLCBtZXNzYWdlLnN1Y2Nlc3MucmVzZW5kTWFpbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAxLCBtZXNzYWdlLmVycm9yLmVtYWlsTm90Rm91bmRFcnJvcik7XG4gICAgICAvLyBvdGhlcndpc2Ugd2UgbmVlZCB0byBjcmVhdGUgYSB0ZW1wb3JhcnkgdG9rZW4gdGhhdCBleHBpcmVzIGluIDEwIG1pbnNcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5pbmZvKGVycik7XG4gICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDA0LCBtZXNzYWdlLmVycm9yLnNvbWV0aGluZ1dlbnRXcm9uZ0Vycm9yKTtcbiAgICB9XG4gIH1cblxuICAvLyBvdHAgdmVyaWZpY2F0aW9uIC8vXG4gIC8qKk9UUCB2ZXJpZnkgZnVuY3Rpb25cbiAgICogQGF1dGhlciBKRDk4OTggPGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICAgKiBAZGVzY3JpcHRpb246IEdldCBvdHAgZnJvbSBkYXRhYmFzZSAmIG1hdGNoIE9UUCB3aGljaCBpcyB1c2VyIGVudGVyZFxuICAgKiBAcmV0dXJuczogc3VjY2VzcyBtc2dcbiAgICovXG4gIGFzeW5jIHZlcmlmaWNhdGlvbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHZlcmlmeU90cCA9IHBhcnNlSW50KHJlcS5ib2R5Lm90cCk7XG4gICAgbG9nZ2VyLmluZm8odmVyaWZ5T3RwKTtcbiAgICBjb25zdCB7IGVtYWlsIH0gPSByZXEuYm9keTtcbiAgICBpZiAoIWVtYWlsKSByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCBtZXNzYWdlLmVycm9yLmVtYWlsUmVxdWlyZWRFcnJvcik7XG5cbiAgICBpZiAoIXZlcmlmeU90cCkge1xuICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci5vdHBOb3RGb3VuZCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmICh2ZXJpZnlPdHApIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBhbnkgPSBhd2FpdCBGb3Jnb3RTZXJ2aWNlLnZlcmlmeSh2ZXJpZnlPdHAsIGVtYWlsKTtcblxuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHN1Y2Nlc3NIYW5kbGVyKFxuICAgICAgICAgICAgcmVzLFxuICAgICAgICAgICAgMjAwLFxuICAgICAgICAgICAgbWVzc2FnZS5zdWNjZXNzLm90cFZlcmlmeVN1Y2Nlc3NGdWxseSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci53cm9uZ090cEVycm9yKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDQsIG1lc3NhZ2UuZXJyb3Iuc29tZXRoaW5nV2VudFdyb25nRXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNlbmQgbWFpbCBmb3IgRm9yZ290IFBhc3N3b3JkIC8vXG4gIC8qKnNlbmQgTWFpbCAmIHNlbmQgZHluYW1pYyBVUkxcbiAgICogQGF1dGhlciBKRDk4OTggPGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICAgKiBAZGVzY3JpcHRpb246SUYgT1RQIHZlcmlmaWVkIHRoYW4gc2VuZCBtYWlsIGZvciBmb3Jnb3QgcGFzc3dvcmQgd2l0aCBkeW5hbWljIFVSTFxuICAgKiBAcmV0dXJuczogc2VuZCBkeW5hbWljIFVSTCBpbiBtYWlsXG4gICAqL1xuICBhc3luYyBmb3JnZXQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB7IGVtYWlsIH0gPSByZXEuYm9keTtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGV4cGlyZV90aW1lID0gQWRkTWludXRlc1RvRGF0ZShub3csIDE1KTtcbiAgICBjb25zdCBlbmNyeXB0ZWQgPSBhd2FpdCBiY3J5cHQuaGFzaChlbWFpbCwgMTApO1xuXG4gICAgY29uc3QgQmFzZVVSTCA9IGZvcmdvdENvbmZpZy5mb3JnZXRMaW5rO1xuICAgIGNvbnN0IG1haW5VUkwgPSBgJHtlbmNyeXB0ZWR9YDtcblxuICAgIGNvbnN0IGxpbmsgPSBgJHtCYXNlVVJMfS9mb3JnZXRwYXNzd29yZC8ke21haW5VUkx9YDtcbiAgICBpZiAoIWVtYWlsKSB7XG4gICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAxLCBtZXNzYWdlLmVycm9yLmVtYWlsUmVxdWlyZWRFcnJvcik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSBhd2FpdCBGb3Jnb3RTZXJ2aWNlLmZvcmdldChlbWFpbCwgbGluaywgZXhwaXJlX3RpbWUpO1xuICAgIHRyeSB7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIGF3YWl0IHNlbmRNYWlsKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgbGluayxcbiAgICAgICAgICAgIG1haWxMaW5rOiBmb3Jnb3RDb25maWcubWFpbExpbmssXG4gICAgICAgICAgICBnb29nbGVMaW5rOiBmb3Jnb3RDb25maWcuZ29vZ2xlRm9ybUxpbmssXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnZm9yZ2V0LmVqcycsXG4gICAgICAgICAgbWVzc2FnZS5zdWJqZWN0LndlbGNvbWVUb0FIUyxcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gc3VjY2Vzc0hhbmRsZXIocmVzLCAyMDAsIG1lc3NhZ2Uuc3VjY2Vzcy5zZW5kTWFpbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDIsIG1lc3NhZ2UuZXJyb3IuZW1haWxOb3RGb3VuZEVycm9yKTtcbiAgICAgIC8vIG90aGVyd2lzZSB3ZSBuZWVkIHRvIGNyZWF0ZSBhIHRlbXBvcmFyeSB0b2tlbiB0aGF0IGV4cGlyZXMgaW4gMTAgbWluc1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwNCwgbWVzc2FnZS5lcnJvci5zb21ldGhpbmdXZW50V3JvbmdFcnJvcik7XG4gICAgfVxuICB9XG4gIC8vIExpbmsgdmVyaWZpY2F0aW9uIC8vXG4gIC8qKkxpbmsgdmVyaWZ5IGZ1bmN0aW9uXG4gICAqIEBhdXRoZXIgSkQ5ODk4IDxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAgICogQGRlc2NyaXB0aW9uOiBHZXQgdmVyaWZ5bGluayBmcm9tIGRhdGFiYXNlICYgbWF0Y2ggTGluayB3aGljaCBpcyB1c2VyIGNhbGxlZFxuICAgKiBAcmV0dXJuczogc3VjY2VzcyBtc2dcbiAgICovXG4gIGFzeW5jIHZlcmlmeShyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHZlcmlmeUxpbmsgPSByZXEuYm9keS5MaW5rO1xuXG4gICAgaWYgKCF2ZXJpZnlMaW5rKSB7XG4gICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAyLCBtZXNzYWdlLmVycm9yLlVybE5vdEZvdW5kKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKHZlcmlmeUxpbmspIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBhbnkgPSBhd2FpdCBGb3Jnb3RTZXJ2aWNlLnZlcmlmeV9saW5rKHZlcmlmeUxpbmspO1xuXG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gc3VjY2Vzc0hhbmRsZXIoXG4gICAgICAgICAgICByZXMsXG4gICAgICAgICAgICAyMDAsXG4gICAgICAgICAgICBtZXNzYWdlLnN1Y2Nlc3MuTGlua1ZlcmlmeVN1Y2Nlc3NGdWxseSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMSwgbWVzc2FnZS5lcnJvci53cm9uZ1VybEVycm9yKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDQsIG1lc3NhZ2UuZXJyb3Iuc29tZXRoaW5nV2VudFdyb25nRXJyb3IpO1xuICAgIH1cbiAgfVxuICAvLyBTZXQgTmV3cGFzc3dvcmQgLy9cbiAgLyoqIGNyZWF0ZSBuZXcgcGFzc3dvcmRcbiAgICogQGF1dGhlciBKRDk4OTggPGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICAgKiBAZGVzY3JpcHRpb246IHVzaW5nIG1haWwgbGluayB1c2VyIHJlZGlyZWN0IHRvIHJlc2V0IHBhc3N3b3JkIHBhZ2UgJiBhZGQgaGlzIG5ldyBwYXNzd29yZFxuICAgKiBAcmV0dXJuczogbmV3IHBhc3N3b3JkXG4gICAqL1xuICBhc3luYyBuZXdQYXNzd29yZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHsgZW1haWwgfSA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IHsgbmV3UGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IHZhbGlkYXRlID0gYXdhaXQgbmV3X3Bhc3N3b3JkLnZhbGlkYXRlQXN5bmMocmVxLmJvZHkpO1xuICAgIGNvbnN0IGVuY3J5cHRQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKG5ld1Bhc3N3b3JkLCAxMCk7XG4gICAgaWYgKCFlbWFpbCkgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci5lbWFpbFJlcXVpcmVkRXJyb3IpO1xuICAgIGNvbnN0IGVtYWlsVmFsaWQgPSBhd2FpdCBGb3Jnb3RTZXJ2aWNlLmVtYWlsKHJlcSk7XG4gICAgLy8gbG9nZ2VyLmluZm8oZW1haWxWYWxpZCk7XG4gICAgaWYgKGVtYWlsVmFsaWQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDAsIG1lc3NhZ2UuZXJyb3Iubm90UmVnaXN0ZXJlZEVycm9yKTtcbiAgICB9XG4gICAgaWYgKG5ld1Bhc3N3b3JkKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBGb3Jnb3RTZXJ2aWNlLm5ld1Bhc3MoZW1haWwsIGVuY3J5cHRQYXNzd29yZCk7XG4gICAgICBsb2dnZXIuaW5mbyhyZXN1bHQpO1xuICAgICAgaWYgKHJlc3VsdFsxXS5yb3dDb3VudCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHN1Y2Nlc3NIYW5kbGVyKFxuICAgICAgICAgIHJlcyxcbiAgICAgICAgICAyMDAsXG4gICAgICAgICAgbWVzc2FnZS5zdWNjZXNzLmdldFBhc3N3b3JkUmVzZXRTdWNjZXNzZnVsbHksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCBtZXNzYWdlLmVycm9yLm5vdFJlZ2lzdGVyZWRFcnJvcik7XG4gICAgfVxuICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDEsIG1lc3NhZ2UuZXJyb3IucGFzc3dvcmROb3RGb3VuZEVycm9yKTtcbiAgfVxufVxuIiwiLyoqZm9yZ290IFBhc3N3b3JkIHdpdGggc2VuZCBtYWlsIGZ1bmN0aW9uIHJvdXRlcnNcbiAqIEBhdXRoZXIgSkQ5ODk4IDxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbjogRm9yZ290IFBhc3N3b3JkIHJvdXRlcnMgd2l0aCBoaXMgcGFyYW1zXG4gKi9cbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuXG5pbXBvcnQgRm9yZ290Q29udHJvbGxlciBmcm9tICcuL2ZvcmdvdC5jb250cm9sbGVyJztcblxuY29uc3QgZm9yZ290Q29udHJvbGxlciA9IG5ldyBGb3Jnb3RDb250cm9sbGVyKCk7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcih7IG1lcmdlUGFyYW1zOiB0cnVlIH0pO1xuXG5yb3V0ZXIucm91dGUoJy9mb3JnZXQnKS5wb3N0KGZvcmdvdENvbnRyb2xsZXIuZm9yZ290KTtcbnJvdXRlci5yb3V0ZSgnL3Jlc2VuZE90cCcpLnB1dChmb3Jnb3RDb250cm9sbGVyLnJlc2VuZCk7XG5yb3V0ZXIucm91dGUoJy92ZXJpZnknKS5wdXQoZm9yZ290Q29udHJvbGxlci52ZXJpZmljYXRpb24pO1xucm91dGVyLnJvdXRlKCcvZm9yZ290JykucG9zdChmb3Jnb3RDb250cm9sbGVyLmZvcmdldCk7XG5yb3V0ZXIucm91dGUoJy92ZXJpZnlMaW5rJykucHV0KGZvcmdvdENvbnRyb2xsZXIudmVyaWZ5KTtcbnJvdXRlci5yb3V0ZSgnL25ld1Bhc3N3b3JkJykucHV0KGZvcmdvdENvbnRyb2xsZXIubmV3UGFzc3dvcmQpO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iLCIvKipmb3Jnb3QgUGFzc3dvcmQgd2l0aCBzZW5kIG1haWwgZnVuY3Rpb24gc2VydmljZXNcbiAqIEBhdXRoZXIgSkQ5ODk4IDxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbjogRm9yZ290IFBhc3N3b3JkIHNlcnZpY2VzXG4gKi9cbmltcG9ydCB7IFF1ZXJ5VHlwZXMgfSBmcm9tICdzZXF1ZWxpemUnO1xuaW1wb3J0IHsgREJDb25uZWN0aW9uIH0gZnJvbSAnLi4vLi4vZGIvZGIuY29ubmVjdGlvbic7XG5pbXBvcnQgZm9yZ290UXVlcnkgZnJvbSAnLi4vaGVscGVycy9xdWVyeSc7XG5pbXBvcnQgcXVlcnkgZnJvbSAnLi4vaGVscGVycy9xdWVyeSc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3V0aWxzL2luZGV4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFzc3dvcmRTZXJ2aWNlIHtcbiAgLyoqc2VuZCBNYWlsICYgT1RQIEdlbmVyYXRlXG4gICAqIEBhdXRob3I6IEpEOTg5OCA8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gICAqIEBkZXNjcmlwdGlvbjogc2VuZCBtYWlsIGZvciBnZXQgT1RQXG4gICAqIEByZXR1cm5zOiBzZW5kIE9UUCBpbiBtYWlsXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZm9yZ290PFREZXRhaWwgPSBhbnk+KFxuICAgIGVtYWlsOiBzdHJpbmcsXG4gICAgb3RwR2VuZXJhdGVkOiBzdHJpbmcsXG4gICAgZXhwaXJlX3RpbWU6IERhdGUsXG4gICk6IFByb21pc2U8YW55PiB7XG4gICAgLy8gc2VuZCByZXNwb25zZSBmcm9tIGhlcmVcbiAgICB0cnkge1xuICAgICAgY29uc3QgZ2V0T3RwOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgICBmb3Jnb3RRdWVyeS5mb3JnZXRRdWVyaWVzLmdldE90cCxcbiAgICAgICAge1xuICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICBvdHBHZW5lcmF0ZWQ6IG90cEdlbmVyYXRlZCxcbiAgICAgICAgICBleHBpcmVfdGltZTogZXhwaXJlX3RpbWUsXG4gICAgICAgIH0sXG4gICAgICAgIFF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICAgKTtcbiAgICAgIHJldHVybiBnZXRPdHA7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuaW5mbyhlcnIsICdlcnJvcicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIGVtYWlsKHJlcTogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IFt1c2Vyc106IGFueSA9IGF3YWl0IERCQ29ubmVjdGlvbi5leGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgICAgIHF1ZXJ5LnVzZXJRdWVyaWVzLmdldF91c2VyX2J5X21haWwsXG4gICAgICAgIHsgZW1haWw6IHJlcS5ib2R5LmVtYWlsIH0sXG4gICAgICApO1xuXG4gICAgICBpZiAoIXVzZXJzWzBdKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuaW5mbyhlcnIsICdlcnJvcicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqc2VuZCBNYWlsICYgT1RQIEdlbmVyYXRlXG4gICAqIEBhdXRob3I6IEpEOTg5OCA8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gICAqIEBkZXNjcmlwdGlvbjogc2VuZCBtYWlsIGZvciByZXNlbmQgT1RQXG4gICAqIEByZXR1cm5zOiBzZW5kIE9UUCBpbiBtYWlsXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgcmVzZW5kPFREZXRhaWwgPSBhbnk+KFxuICAgIGVtYWlsOiBzdHJpbmcsXG4gICAgb3RwR2VuZXJhdGVkOiBzdHJpbmcsXG4gICAgZXhwaXJlX3RpbWU6IERhdGUsXG4gICk6IFByb21pc2U8YW55PiB7XG4gICAgLy8gc2VuZCByZXNwb25zZSBmcm9tIGhlcmVcblxuICAgIGNvbnN0IGZvcmdvdFBhYXN3b3JkOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgZm9yZ290UXVlcnkuZm9yZ2V0UXVlcmllcy5mb3Jnb3QsXG4gICAgICB7IGVtYWlsIH0sXG4gICAgICBRdWVyeVR5cGVzLlNFTEVDVCxcbiAgICApO1xuXG4gICAgaWYgKFxuICAgICAgZm9yZ290UGFhc3dvcmRbMF0gJiZcbiAgICAgIGZvcmdvdFBhYXN3b3JkWzBdLmxlbmd0aCA+IDAgJiZcbiAgICAgIGVtYWlsID09PSBmb3Jnb3RQYWFzd29yZFswXVswXS5lbWFpbFxuICAgICkge1xuICAgICAgY29uc3QgZ2V0T3RwOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgICBmb3Jnb3RRdWVyeS5mb3JnZXRRdWVyaWVzLnJlc2VuZE90cCxcbiAgICAgICAge1xuICAgICAgICAgIGlzX3ZlcmlmaWVkOiBmYWxzZSxcbiAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgb3RwR2VuZXJhdGVkOiBvdHBHZW5lcmF0ZWQsXG4gICAgICAgICAgZXhwaXJlX3RpbWU6IGV4cGlyZV90aW1lLFxuICAgICAgICB9LFxuICAgICAgICBRdWVyeVR5cGVzLlVQREFURSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gZ2V0T3RwO1xuICAgIH1cbiAgfVxuXG4gIC8qKk9UUCB2ZXJpZnkgZnVuY3Rpb25cbiAgICogQGF1dGhlciBKRDk4OTggPGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICAgKiBAZGVzY3JpcHRpb246IEdldCBvdHAgZnJvbSBkYXRhYmFzZSAmIG1hdGNoIE9UUCB3aGljaCBpcyB1c2VyIGVudGVyZFxuICAgKiBAcmV0dXJuczogc3VjY2VzcyBtc2dcbiAgICovXG4gIHN0YXRpYyBhc3luYyB2ZXJpZnk8VERldGFpbCA9IGFueT4oXG4gICAgdmVyaWZ5T3RwOiBudW1iZXIsXG4gICAgZW1haWw6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBzZW5kIHJlc3BvbnNlIGZyb20gaGVyZVxuICAgIGNvbnN0IE90cDogYW55ID0gYXdhaXQgREJDb25uZWN0aW9uLmV4ZWN1dGVTYW1wbGVRdWVyeShcbiAgICAgIGZvcmdvdFF1ZXJ5LmZvcmdldFF1ZXJpZXMuT3RwLFxuICAgICAge1xuICAgICAgICB2ZXJpZnlPdHAsXG4gICAgICAgIGVtYWlsLFxuICAgICAgfSxcbiAgICAgIFF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICk7XG4gICAgbG9nZ2VyLmluZm8oT3RwKTtcbiAgICBpZiAoXG4gICAgICBPdHBbMF0gJiZcbiAgICAgIE90cFswXS5sZW5ndGggPiAwICYmXG4gICAgICB2ZXJpZnlPdHAgPT09IE90cFswXVswXS5vdHAgJiZcbiAgICAgIE90cFswXVswXS5leHBpcmVfdGltZSA+IERhdGUubm93KCkgJiZcbiAgICAgIE90cFswXVswXS5pc192ZXJpZmllZCA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIGNvbnN0IFZlcmlmaWVkOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgICBmb3Jnb3RRdWVyeS5mb3JnZXRRdWVyaWVzLlZlcmlmaWVkLFxuICAgICAgICB7XG4gICAgICAgICAgdmVyaWZ5T3RwLFxuICAgICAgICAgIGlzX3ZlcmlmaWVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBRdWVyeVR5cGVzLlVQREFURSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gVmVyaWZpZWQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8qKnNlbmQgTWFpbCAmIHNlbmQgZHluYW1pYyBVUkxcbiAgICogQGF1dGhlciBKRDk4OTggPGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICAgKiBAZGVzY3JpcHRpb246SUYgT1RQIHZlcmlmaWVkIHRoYW4gc2VuZCBtYWlsIGZvciBmb3Jnb3QgcGFzc3dvcmQgd2l0aCBkeW5hbWljIFVSTFxuICAgKiBAcmV0dXJuczogc2VuZCBkeW5hbWljIFVSTCBpbiBtYWlsXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZm9yZ2V0PFREZXRhaWwgPSBhbnk+KFxuICAgIGVtYWlsOiBzdHJpbmcsXG4gICAgbGluazogc3RyaW5nLFxuICAgIGV4cGlyZV90aW1lOiBEYXRlLFxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIHNlbmQgcmVzcG9uc2UgZnJvbSBoZXJlXG4gICAgY29uc3QgZm9yZ290UGFhc3dvcmQ6IGFueSA9IGF3YWl0IERCQ29ubmVjdGlvbi5leGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgICBmb3Jnb3RRdWVyeS5mb3JnZXRRdWVyaWVzLmZvcmdvdF9wYXNzLFxuICAgICAge1xuICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICB9LFxuICAgICAgUXVlcnlUeXBlcy5TRUxFQ1QsXG4gICAgKTtcbiAgICBjb25zdCBnZXRMaW5rOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgZm9yZ290UXVlcnkuZm9yZ2V0UXVlcmllcy5JbnNlcnRMaW5rLFxuICAgICAge1xuICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgIGxpbms6IGxpbmssXG4gICAgICAgIGV4cGlyZV90aW1lOiBleHBpcmVfdGltZSxcbiAgICAgIH0sXG4gICAgICBRdWVyeVR5cGVzLklOU0VSVCxcbiAgICApO1xuXG4gICAgcmV0dXJuIGZvcmdvdFBhYXN3b3JkO1xuICB9XG4gIC8qKnZlcmlmeUxpbmsgc2VydmljZXNcbiAgICogQGF1dGhlciBKRDk4OTggPGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICAgKiBAZGVzY3JpcHRpb246IEdldCB2ZXJpZnlMaW5rIGZyb20gZGF0YWJhc2UgJiBtYXRjaCB2ZXJpZnlMaW5rIHdoaWNoIGlzIHVzZXIgZW50ZXJkXG4gICAqIEByZXR1cm5zOiBzdWNjZXNzIG1zZ1xuICAgKi9cbiAgc3RhdGljIGFzeW5jIHZlcmlmeV9saW5rPFREZXRhaWwgPSBhbnk+KHZlcmlmeUxpbms6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgLy8gc2VuZCByZXNwb25zZSBmcm9tIGhlcmVcbiAgICBjb25zdCBMaW5rOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgZm9yZ290UXVlcnkuZm9yZ2V0UXVlcmllcy5nZXRMaW5rLFxuICAgICAge1xuICAgICAgICB2ZXJpZnlMaW5rLFxuICAgICAgICBpc19jYWxsZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIFF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICk7XG4gICAgaWYgKFxuICAgICAgTGlua1swXSAmJlxuICAgICAgTGlua1swXS5sZW5ndGggPiAwICYmXG4gICAgICB2ZXJpZnlMaW5rID09PSBMaW5rWzBdWzBdLnJlc2V0X3Bhc3N3b3JkX3VybCAmJlxuICAgICAgTGlua1swXVswXS5leHBpcmVfdGltZSA+IERhdGUubm93KClcbiAgICApIHtcbiAgICAgIGNvbnN0IFZlcmlmaWVkOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgICBmb3Jnb3RRdWVyeS5mb3JnZXRRdWVyaWVzLnZlcmlmeV9saW5rLFxuICAgICAgICB7XG4gICAgICAgICAgdmVyaWZ5TGluayxcbiAgICAgICAgICBpc19jYWxsZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIFF1ZXJ5VHlwZXMuVVBEQVRFLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIFZlcmlmaWVkO1xuICAgIH1cbiAgfVxuICAvKiogY3JlYXRlIG5ldyBwYXNzd29yZFxuICAgKiBAYXV0aGVyIEpEOTg5OCA8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gICAqIEBkZXNjcmlwdGlvbjogdXNpbmcgbWFpbCBsaW5rIHVzZXIgcmVkaXJlY3QgdG8gcmVzZXQgcGFzc3dvcmQgcGFnZSAmIGFkZCBoaXMgbmV3IHBhc3N3b3JkXG4gICAqIEByZXR1cm5zOiBuZXcgcGFzc3dvcmRcbiAgICovXG4gIHN0YXRpYyBhc3luYyBuZXdQYXNzPFREZXRhaWwgPSBhbnk+KFxuICAgIGVtYWlsOiBzdHJpbmcsXG4gICAgZW5jcnlwdFBhc3N3b3JkOiBzdHJpbmcsXG4gICk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIHNlbmQgcmVzcG9uc2UgZnJvbSBoZXJlXG5cbiAgICAgIGNvbnN0IG5ld1BhYXN3b3JkOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgICBmb3Jnb3RRdWVyeS5mb3JnZXRRdWVyaWVzLm5ld19wYXNzLFxuICAgICAgICB7XG4gICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgIGVuY3J5cHRQYXNzd29yZDogZW5jcnlwdFBhc3N3b3JkLFxuICAgICAgICB9LFxuICAgICAgICBRdWVyeVR5cGVzLlVQREFURSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gbmV3UGFhc3dvcmQ7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuaW5mbyhlcnIsICdlcnJvcicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG4iLCIvKiogc2VuZCBtYWlsIGZvciBvdHBcbiAqIEBhdXRob3I6IEpEOTg5OCA8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gKiBAZGVzY3JpcHRpb246IHVzaW5nIG5vZGVtYWlsZXIgc2VuZCBtYWlsIHdpdGggaHRtbCBkZXNpZ24uXG4gKi9cbmltcG9ydCB7IGNyZWF0ZVRyYW5zcG9ydCB9IGZyb20gJ25vZGVtYWlsZXInO1xuXG5jb25zdCB0cmFuc3BvcnRlciA9IGNyZWF0ZVRyYW5zcG9ydCh7XG4gIHNlcnZpY2U6ICdnbWFpbCcsXG4gIGF1dGg6IHtcbiAgICB1c2VyOiAnZHVtbXkudGVzdEBkYXRhcHJvcGhldHMuaW4nLFxuICAgIHBhc3M6ICdEcHRlc3RAMTIzJyxcbiAgfSxcbn0pO1xuLyoqIHNlbmQgbWFpbCB3aXRoIGh0bWwgZGF0YVxuICogQGF1dGhvcjogSkQ5ODk4IDxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbjogdXNpbmcgbm9kZW1haWxlciBzZW5kIG1haWwgd2l0aCBodG1sIGRhdGEsIGFkZCB1c2VyIG1haWwgJiBwYXNzb3JkXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kTWFpbE90cChwYXJhbXMpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBpbmZvID0gYXdhaXQgdHJhbnNwb3J0ZXIuc2VuZE1haWwoe1xuICAgICAgZnJvbTogJ2R1bW15LnRlc3RAZGF0YXByb3BoZXRzLmluJyxcbiAgICAgIHRvOiBwYXJhbXMudG8sIC8vIGxpc3Qgb2YgcmVjZWl2ZXJzXG4gICAgICBzdWJqZWN0OiAnV2VsY29tZSB0byBBZHZhbmNlIEhlYWx0aCBTeXN0ZW0nLCAvLyBTdWJqZWN0IGxpbmVcbiAgICAgIGh0bWw6IGBcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjb250YWluZXJcIlxuICAgICAgICBzdHlsZT1cIm1heC13aWR0aDogOTAlOyBtYXJnaW46IGF1dG87IHBhZGRpbmctdG9wOiAyMHB4XCJcbiAgICAgID5cbiAgICAgICAgPGgyPldlbGNvbWUgdG8gdGhlIEFkdmFuY2UgSGVhbHRoIFN5c3RlbS48L2gyPlxuICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDMwcHg7XCI+WW91ciBPVFAgZm9yIHZlcmlmaWNhdGlvbiBpcyAgPGI+JHtwYXJhbXMub3RwfTwvYj4uIFBsZWFzZSBkbyBub3Qgc2hhcmUgeW91ciBPVFAgd2l0aCBhbnlvbmUgLjwvcD5cbiAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW4tdG9wOjUwcHg7XCI+VGhpcyBpcyBhIHN5c3RlbSBnZW5lcmF0ZWQgZSAtIG1haWwgYW5kIHBsZWFzZSBkbyBub3QgcmVwbHkgLkZvciBBbnkgcXVlcmllcyBDb250YWN0IGluZm9AZGF0YXByb3BoZXRzLmluLiA8L3A+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGRfcGVuXCI+XG4gICAgICAgICAgICAgICAgPHA+Q2hlZXJzLDxiciAvPkFkdmFuY2UgSGVhbHRoIFN5c3RlbSBUZWFtLjwvcD5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIH0pO1xuICAgIHJldHVybiBpbmZvO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXF1ZXN0SGFuZGxlciwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IEFzeW5jUmVxdWVzdEhhbmRsZXIsIHdyYXAgfSBmcm9tICdleHByZXNzLXByb21pc2Utd3JhcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaUhlbHBlciB7XG4gIHN0YXRpYyB3cmFwSGFuZGxlcihcbiAgICBoYW5kbGVyOiBBc3luY1JlcXVlc3RIYW5kbGVyLFxuICAgIGZvcmNlTmV4dCA9IGZhbHNlLFxuICApOiBSZXF1ZXN0SGFuZGxlciB7XG4gICAgcmV0dXJuIHdyYXAoYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICBsZXQgbmV4dENhbGxlZCA9IGZhbHNlO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICBoYW5kbGVyKHJlcSwgcmVzLCAoKSA9PiB7XG4gICAgICAgICAgbmV4dENhbGxlZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgaWYgKG5leHRDYWxsZWQpIHJldHVybjtcbiAgICAgIGlmIChmb3JjZU5leHQpIHJldHVybiBuZXh0KCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pIGFzIFJlcXVlc3RIYW5kbGVyO1xuICB9XG59XG4iLCIvKipSZXNldCB1c2VyIHNpZ24taW4gUGFzc3dvcmQgcXVlcmllc1xuICogQGF1dGhvcjogIEpEOTg5ODxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbjogR2V0IG9sZCBwYXNzd29yZCBmcm9tIHVzZXIgdGFibGUgYW5kIHVwZGF0ZSBuZXcgYWRkZWQgcGFzc3dvcmQgaW4gdXNlciB0YWJsZS5cbiAqL1xuY29uc3QgcmVzZXRRdWVyaWVzID0ge1xuICBnZXRfcGFzczogYHNlbGVjdCBwYXNzd29yZCBmcm9tIFwidXNlclwiIHdoZXJlIFwiaWRcIj0gOmlkO2AsXG4gIHJlc2V0X3Bhc3M6IGBVUERBVEUgcHVibGljLlwidXNlclwiIFNFVCBcInBhc3N3b3JkXCI9IDplbmNyeXB0UGFzc3dvcmQgd2hlcmUgXCJpZFwiPSA6aWQ7YCxcbn07XG5cbi8qKmZvcmdvdCBQYXNzd29yZCBxdWVyaWVzXG4gKiBAYXV0aG9yOiBKRDk4OTggPGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICogQGRlc2NyaXB0aW9uOiBGb3Jnb3QgUGFzc3dvcmQgcXVlcnkgZm9yIHNlbmQgbWFpbCAsIGdldCBPVFAsIHZlcmlmeSBPVFAsIGdldCBlbWFpbCAsIGZvcmdvdCBwYXNzd29yZCBsaW5rLCBuZXcgcGFzc3dvcmRcbiAqL1xuY29uc3QgZm9yZ2V0UXVlcmllcyA9IHtcbiAgZm9yZ290OiBgU0VMRUNUIFwiZW1haWxcIiBmcm9tIHB1YmxpYy5cInVzZXJcIiB3aGVyZSBcImVtYWlsXCI9IDplbWFpbGAsXG4gIGdldE90cDogYElOU0VSVCBJTlRPIFwib3RwXCIoXCJlbWFpbFwiLFwib3RwXCIsXCJleHBpcmVfdGltZVwiKSBWQUxVRVMgKDplbWFpbCw6b3RwR2VuZXJhdGVkLDpleHBpcmVfdGltZSk7YCxcbiAgcmVzZW5kT3RwOiBgVVBEQVRFIHB1YmxpYy5cIm90cFwiIFNFVCAgXCJvdHBcIj06b3RwR2VuZXJhdGVkLFwiaXNfdmVyaWZpZWRcIj0gOmlzX3ZlcmlmaWVkLFwiZXhwaXJlX3RpbWVcIiA9IDpleHBpcmVfdGltZSB3aGVyZSBcImVtYWlsXCI9IDplbWFpbGAsXG4gIE90cDogYFNFTEVDVCBcIm90cFwiLCBcImlzX3ZlcmlmaWVkXCIgLFwiZXhwaXJlX3RpbWVcIiBmcm9tIHB1YmxpYy5cIm90cFwiIHdoZXJlIFwib3RwXCI9IDp2ZXJpZnlPdHAgYW5kIFwiZW1haWxcIiA9IDplbWFpbCBvcmRlciBieSBcImNyZWF0ZWRBdFwiIGRlc2MgbGltaXQgMSA7YCxcbiAgRW1haWw6IGBTRUxFQ1QgXCJlbWFpbFwiIGZyb20gcHVibGljLlwiY29tbW9tblwiIHdoZXJlIFwidXVpZFwiPSA6dXVpZGAsXG4gIFZlcmlmaWVkOiBgVVBEQVRFIHB1YmxpYy5cIm90cFwiIFNFVCBpc192ZXJpZmllZD0gOmlzX3ZlcmlmaWVkIFdIRVJFIFwib3RwXCIgPSA6dmVyaWZ5T3RwO2AsXG4gIGZvcmdvdF9wYXNzOiBgU0VMRUNUIFwiZW1haWxcIiBmcm9tIHB1YmxpYy5cInVzZXJcIiB3aGVyZSBcImVtYWlsXCI9IDplbWFpbDtgLFxuICBuZXdfcGFzczogYFVQREFURSBwdWJsaWMuXCJ1c2VyXCIgU0VUIFwicGFzc3dvcmRcIj0gOmVuY3J5cHRQYXNzd29yZCB3aGVyZSBcImVtYWlsXCI9IDplbWFpbGAsXG4gIHZlcmlmeV9saW5rOiBgVVBEQVRFIHB1YmxpYy5cInJlc2V0X3Bhc3N3b3JkX3VybFwiIFNFVCBpc19jYWxsZWQ9IDppc19jYWxsZWQgV0hFUkUgXCJyZXNldF9wYXNzd29yZF91cmxcIiA9IDp2ZXJpZnlMaW5rO2AsXG4gIGdldExpbms6IGBTRUxFQ1QgXCJyZXNldF9wYXNzd29yZF91cmxcIiwgXCJleHBpcmVfdGltZVwiIGZyb20gcHVibGljLlwicmVzZXRfcGFzc3dvcmRfdXJsXCIgd2hlcmUgXCJyZXNldF9wYXNzd29yZF91cmxcIj0gOnZlcmlmeUxpbmsgYW5kIFwiaXNfY2FsbGVkXCIgPSA6aXNfY2FsbGVkO2AsXG4gIEluc2VydExpbms6IGBJTlNFUlQgSU5UTyBcInJlc2V0X3Bhc3N3b3JkX3VybFwiKFwiZW1haWxcIixcInJlc2V0X3Bhc3N3b3JkX3VybFwiLFwiZXhwaXJlX3RpbWVcIikgVkFMVUVTICg6ZW1haWwsIDpsaW5rLCA6ZXhwaXJlX3RpbWUpO2AsXG59O1xuLyoqdXNlcnMgUmVsYXRlZCBxdWVyaWVzXG4gKiBAYXV0aG9yOiAgSkQ5ODk4PGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICogQGRlc2NyaXB0aW9uOiBHZXQgdXNlciBwcm9maWxlIGRldGFpbHMgdXNpbmcgc2VsZWN0IHF1ZXJ5LCB1cGRhdGUgdXNlcnMgZGV0YWlscyB1c2luZyB1cGRhdGUgcXVlcnkgJiB2aWV3IGZhbWlseSBtZW1iZXIgbGlzdCBpbiB1c2VyIHByb2ZpbGUgdXNpbmcgc2VsZWN0IHF1ZXJ5LlxuICovXG5jb25zdCB1c2VyUXVlcmllcyA9IHtcbiAgZ2V0X3VzZXI6IGBTRUxFQ1QgaWQsIHV1aWQsIG5hbWUsIGVtYWlsLCBwaG9uZSwgcHJvZmlsZV91cmwgYXMgXCJwcm9maWxlVXJsXCJcbiAgRlJPTSBwdWJsaWMuXCJ1c2VyXCIgXG4gIFdIRVJFIFwiaWRcIj0gOmlkO2AsXG4gIHVzZXJfdXBkYXRlOiBgVVBEQVRFIHB1YmxpYy5cInVzZXJcIiBTRVQgXCJwcm9maWxlX3VybFwiID0gOmZpbGVzIFdIRVJFIFwiaWRcIj0gOmlkO2AsXG4gIHVwZGF0ZV91c2VyX3dpdGhfaW1hZ2U6IGBVUERBVEUgcHVibGljLlwidXNlclwiXG5cdFNFVCBuYW1lPTpuYW1lLCBwaG9uZT06cGhvbmUsIHByb2ZpbGVfdXJsID0gOnByb2ZpbGUgd2hlcmUgXCJpZFwiPSA6dXNlcklkO2AsXG4gIHVwZGF0ZV91c2VyOiBgVVBEQVRFIHB1YmxpYy5cInVzZXJcIlxuXHRTRVQgbmFtZT06bmFtZSwgcGhvbmU9OnBob25lIHdoZXJlIFwiaWRcIj0gOnVzZXJJZDtgLFxuICB2aWV3X2ZhbWlseTogYFNFTEVDVCByZWxhdGlvbi5yZWxhdGlvbiwgdXNlci5maXJzdF9uYW1lLCB1c2VyLm1pZGRsZV9uYW1lLCB1c2VyLmxhc3RfbmFtZSwgdXNlci51c2VyX3VuaXF1ZV9pZCBGUk9NIHB1YmxpYy5cInVzZXJfcmVsYXRpb25cIiBhcyByZWxhdGlvbiBJTk5FUiBKT0lOIHB1YmxpYy5cInVzZXJcIiBhcyB1c2VyIE9OIHJlbGF0aW9uLmZhbWlseV9tZW1iZXJfaWQgPSB1c2VyLnVzZXJfdW5pcXVlX2lkIHdoZXJlIHJlbGF0aW9uLnVzZXJfaWQ9IDp1c2VyX2lkIFxuICBPUkRFUiBCWSB1c2VyX2lkIERFU0NcbiAgbGltaXQgOnBhZ2Vfc2l6ZSBPRkZTRVQgOnBhZ2Vfbm87YCxcbiAgc2VsZWN0X3VzZXJfdXVpZDogYHNlbGVjdCBcInV1aWRcIiBmcm9tIHB1YmxpYy5cInVzZXJcIiB3aGVyZSBcInVzZXJfdW5pcXVlX2lkXCI9IDp1c2VySWQ7IGAsXG4gIGxpbmtfZmFtaWx5OiBgSU5TRVJUIElOVE8gcHVibGljLlwidXNlcl9yZWxhdGlvblwiKHV1aWQsIHJlbGF0aW9uLCBcInVzZXJfaWRcIiwgXCJmYW1pbHlfbWVtYmVyX2lkXCIsIGNyZWF0ZWRfYnksIHVwZGF0ZWRfYnkpXG4gICAgICAgIFZBTFVFUyAoOnJlbGF0aW9uLCA6dXNlcl9pZCwgOmZhbWlseV9pZCwgOmNyZWF0ZWRfYnksIDp1cGRhdGVkX2J5KTsgYCxcbiAgdXBkYXRlX2ZhbWlseTogYFVQREFURSBwdWJsaWMuXCJ1c2VyX3JlbGF0aW9uXCIgU0VUIFwicmVsYXRpb25cIiA9IDpyZWxhdGlvbiB3aGVyZSBcInVzZXJfaWRcIiA9IDp1c2VyX2lkIGFuZCBcImZhbWlseV9tZW1iZXJfaWRcIiA9IDpmYW1pbHlfaWQ7YCxcbiAgZmluZF9saW5rZWRfZmFtaWx5X21lbWJlcjogYHNlbGVjdCAqIGZyb20gcHVibGljLlwidXNlcl9yZWxhdGlvblwiIHdoZXJlIFwicmVsYXRpb25cIj06cmVsYXRpb24gYW5kIFwidXNlcl9pZFwiPTp1c2VyX2lkIGFuZCBcImZhbWlseV9tZW1iZXJfaWRcIiA9IDpmYW1pbHlfaWQ7YCxcbiAgZmluZF9mYW1pbHlfbWVtYmVyOiBgc2VsZWN0IFwidXNlcl91bmlxdWVfaWRcIiwgXCJmaXJzdF9uYW1lXCIsIFwibWlkZGxlX25hbWVcIiwgXCJsYXN0X25hbWVcIiBmcm9tIFwidXNlclwiIHdoZXJlIExPV0VSKFwidXNlcl91bmlxdWVfaWRcIikgPSBMT1dFUig6dXNlcl91bmlxdWVfaWQpIDtgLFxuICBmaW5kX2xhc3RfdW5pcXVlX2lkOiBgU0VMRUNUIG1heCh1c2VyX3VuaXF1ZV9pZCkgYXMgbGFzdF91bmlxdWVfaWQgRlJPTSBwdWJsaWMudXNlciB3aGVyZSBMT1dFUihcInN0YXRlXCIpID0gTE9XRVIoOnN0YXRlKTtgLFxuICBmaW5kX3N0YXRlOiBgc2VsZWN0IHN0YXRlX2NvZGUgZnJvbSBwdWJsaWMuXCJzdGF0ZVwiIHdoZXJlIExPV0VSKFwic3RhdGVfbmFtZVwiKT0gTE9XRVIoOnN0YXRlKWAsXG4gIGdldF91c2VyczogYHNlbGVjdCAqIGZyb20gdXNlciB3aGVyZSBpZCA9IDppZDtgLFxuICBnZXRfdXNlcl9ieV9tYWlsOlxuICAgICdzZWxlY3QgaWQsIHJvbGVfaWQsIG5hbWUsIGVtYWlsLCBwaG9uZSwgcGFzc3dvcmQgZnJvbSBwdWJsaWMuXCJ1c2VyXCIgd2hlcmUgZW1haWwgPSA6ZW1haWwnLFxuICBnZXRfdXNlcl9ieV91c2VybmFtZTpcbiAgICAnc2VsZWN0ICogZnJvbSBwdWJsaWMuXCJ1c2VyXCIgd2hlcmUgdXNlcm5hbWUgPSA6dXNlcm5hbWUnLFxuICBmaW5kX2xpbmtlZF9tZW1iZXI6XG4gICAgJ3NlbGVjdCBleGlzdHMoc2VsZWN0ICogZnJvbSBcInVzZXJfcmVsYXRpb25cIiB3aGVyZSBcInVzZXJfaWRcIj0gOnVzZXJJZCBhbmQgXCJmYW1pbHlfbWVtYmVyX2lkXCI9IDpmYW1pbHlJZCknLFxuICBkZWxldGVfdXNlcl9kZXRhaWw6IGBERUxFVEUgRlJPTSBwdWJsaWMuXCJ1c2VyXCIgV0hFUkUgaWQgPSA6aWRgLFxuICBhZGRfdXNlcl9kZXRhaWw6XG4gICAgJ0lOU0VSVCBJTlRPIHB1YmxpYy5cInVzZXJcIihcInJvbGVfaWRcIixcIm5hbWVcIiwgXCJlbWFpbFwiLCBcInBob25lXCIsIFwicGFzc3dvcmRcIikgVkFMVUVTKDIsIDpuYW1lLCA6ZW1haWwsIDpwaG9uZSwgOnBhc3N3b3JkKScsXG4gIGFkZF9jbGllbnRfZGV0YWlsOlxuICAgIGBJTlNFUlQgSU5UTyBwdWJsaWMuXCJ1c2VyXCIoXCJyb2xlX2lkXCIsIFwibmFtZVwiLCBcImVtYWlsXCIsIFwicGhvbmVcIiwgXCJwYXNzd29yZFwiLFwiY3JlYXRlZEF0XCIpIFZBTFVFUygyLCA6bmFtZSwgOmVtYWlsLCA6cGhvbmUsIDpwYXNzd29yZCwgOmNyZWF0ZWRBdClgLFxuICBnZXRfYWNjZXNzX3Rva2VuOiBgc2VsZWN0ICogZnJvbSBhY2Nlc3NfdG9rZW5zIFdIRVJFIGFjY2Vzc190b2tlbiA9IDp0b2tlbmAsXG4gIHVwZGF0ZV9hY2Nlc3NfdG9rZW46IGBVUERBVEUgYWNjZXNzX3Rva2VucyBTRVQgXCJhY2Nlc3NfdG9rZW5cIiA9IDp0b2tlbixleHBpcmVkX29uID0gOmV4cCBXSEVSRSB1c2VyX2lkID0gOmlkYCxcbiAgaW5zZXJ0X2FjY2Vzc190b2tlbjogYElOU0VSVCBJTlRPIHB1YmxpYy5cImFjY2Vzc190b2tlbnNcIihcImFjY2Vzc190b2tlblwiLFwidXNlcl9pZFwiLFwiZXhwaXJlZF9vblwiKSBWQUxVRVMoOnRva2VuLDppZCw6ZXhwKWAsXG4gIHVzZXJMaXN0OiBgU0VMRUNUIHV1aWQsIHJvbGVfaWQsIG5hbWUsIGVtYWlsLCBwaG9uZSwgcHJvZmlsZV91cmxcblx0RlJPTSBwdWJsaWMuXCJ1c2VyXCIgd2hlcmUgcm9sZV9pZCA9IDIgYW5kIGlzX2RlbGV0ZSA9IGZhbHNlIGFuZCBpc19hY3RpdmUgPSB0cnVlO2AsXG4gIHVzZXJEZXRhaWw6IGBTRUxFQ1QgdXVpZCwgcm9sZV9pZCwgbmFtZSwgZW1haWwsIHBob25lLCBwcm9maWxlX3VybFxuXHRGUk9NIHB1YmxpYy5cInVzZXJcIiB3aGVyZSByb2xlX2lkID0gMiBhbmQgdXVpZCA9IDp1c2VySWQ7YCxcbiAgdXNlclVwZGF0ZTogYFVQREFURSBwdWJsaWMuXCJ1c2VyXCJcblx0U0VUIG5hbWU9Om5hbWUsIHBob25lPTpwaG9uZVxuXHRXSEVSRSByb2xlX2lkID0gMiBhbmQgdXVpZCA9IDp1c2VySWQ7YCxcbiAgdXNlckRlbGV0ZTogYFVQREFURSBwdWJsaWMuXCJ1c2VyXCJcblx0U0VUIGlzX2RlbGV0ZT06aXNfZGVsZXRlLCBpc19hY3RpdmU9OmlzX2FjdGl2ZVxuXHRXSEVSRSByb2xlX2lkID0gMiBhbmQgdXVpZCA9IDp1c2VySWQ7YCxcbiAgaW5zZXJ0X2RvY3VtZW50OiBgSU5TRVJUIElOVE8gcHVibGljLmRvY3VtZW50KFxuICAgIGZpbGVfbmFtZSwgZmlsZV90eXBlLCBmaWxlX2tleSwgbG9jYXRpb24sIHVzZXJfaWQsIGNyZWF0ZWRfYnkpXG4gICBWQUxVRVMgKDpmaWxlTmFtZSwgOmZpbGVUeXBlLCA6a2V5LCA6bG9jYXRpb24sIDp1c2VySWQsIDp1c2VySWQpXG4gICByZXR1cm5pbmcgZmlsZV9uYW1lO2AsXG4gIGZpbmRfZG9jdW1lbnRzOiBgU0VMRUNUIGZpbGVfa2V5IGFzIFwiS2V5XCJcblx0RlJPTSBwdWJsaWMuZG9jdW1lbnRcbiAgICB3aGVyZSB1c2VyX2lkID0gOnVzZXJJZDtgLFxuICByZW1vdmVGaWxlOiBgREVMRVRFIEZST00gcHVibGljLmRvY3VtZW50XG4gICAgV0hFUkUgdXNlcl9pZCA9IDp1c2VySWQ7YCxcbn07XG5cbmNvbnN0IGVtcGxveWVlUXVlcmllcyA9IHtcbiAgZ2V0X2VtcGxveWVlOiBgc2VsZWN0ICogZnJvbSBlbXBsb3llZSB3aGVyZSBpZCA9IDppZGAsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7IHVzZXJRdWVyaWVzLCBmb3JnZXRRdWVyaWVzLCBlbXBsb3llZVF1ZXJpZXMsIHJlc2V0UXVlcmllcyB9O1xuIiwiLyoqZm9yZ290cGFzc3dvcmQgdmFsaWRhdGlvbiB1c2luZyBqb2lcbiAqIEBhdXRob3I6ICBKRDk4OTg8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gKiBAZGVzY3JpcHRpb246IGFkZCBmb3Jnb3RwYXNzd29yZCB2YWxpZGF0aW9uIGluIGZvcmdvdCBwYXNzd29yZCBjb250cm9sbGVyLmNyZWF0ZSB0aGlzIHZhbGlkYXRpb24gdXNpbmcgam9pLlxuICovXG5pbXBvcnQgam9pIGZyb20gJ2pvaSc7XG5jb25zdCB7IG9iamVjdCwgc3RyaW5nIH0gPSBqb2kudHlwZXMoKTtcblxuZXhwb3J0IGNvbnN0IGZvcmdvdFBhc3N3b3JkID0gb2JqZWN0LmtleXMoe1xuICBlbWFpbDogc3RyaW5nXG4gICAgLmVtYWlsKClcbiAgICAubG93ZXJjYXNlKClcbiAgICAucmVxdWlyZWQoKVxuICAgIC5yZWdleCgvXltBLVowLTkuXyUrLV0rQFtBLVowLTkuLV0rXFwuW0EtWl17Miw0fSQvaSksXG59KTtcblxuZXhwb3J0IGNvbnN0IG5ld19wYXNzd29yZCA9IG9iamVjdC5rZXlzKHtcbiAgZW1haWw6IHN0cmluZ1xuICAgIC5lbWFpbCgpXG4gICAgLmxvd2VyY2FzZSgpXG4gICAgLnJlcXVpcmVkKClcbiAgICAucmVnZXgoL15bQS1aMC05Ll8lKy1dK0BbQS1aMC05Li1dK1xcLltBLVpdezIsNH0kL2kpLFxuICBuZXdQYXNzd29yZDogc3RyaW5nXG4gICAgLnJlcXVpcmVkKClcbiAgICAubWluKDgpXG4gICAgLnJlZ2V4KC9eKD89LipbMC05XSkoPz0uKlshQCMkJV4mKl0pW2EtekEtWjAtOSFAIyQlXiYqXXs4LDE2fSQvKVxuICAgIC5sYWJlbCgncGFzc3dvcmQnKVxuICAgIC5tZXNzYWdlcyh7XG4gICAgICAnc3RyaW5nLm1pbic6ICdNdXN0IGhhdmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzJyxcbiAgICAgICdvYmplY3QucmVnZXgnOiAnTXVzdCBoYXZlIGF0IGxlYXN0IDggY2hhcmFjdGVycyhVc2VyI0AxMjMpJyxcbiAgICAgICdzdHJpbmcucGF0dGVybi5iYXNlJzpcbiAgICAgICAgJ1Bhc3N3b3JkIG11c3QgaGF2ZSBhdCBsZWFzdCA4IGNoYXJhY3RlciB0aGF0IGluY2x1ZGUgYXQgbGVhc3QgMSBVcHBlcmNhc2UgY2hhcmFjdGVyLDEgbG93ZXJjYXNlIGNoYXJhY3RlciwxIG51bWJlciBhbmQgMSBzcGVjaWFsIGNoYXJhY3RlcighQCMkJV4mKikgaW4nLFxuICAgIH0pLFxufSk7XG4iLCJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHN1Y2Nlc3NIYW5kbGVyIGZyb20gJy4uLy4uL2xhbmcvaGFuZGxlcnMvc3VjY2Vzcyc7XG5cbmNvbnN0IHdlbGNvbWUgPSAoKSA9PiB7XG4gIHJldHVybjtcbn07XG5cbi8qKndlbGNvbWUgdG8gQUhTXG4gKiBAYXV0aGVyIEpEOTg5ODxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbjpXZWxjb21lIHRvIEFkdmFuY2UgaGVhbHRoIGNhcmUgc3lzdGVtLlxuICpcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwdWJsaWNDb250cm9sbGVyIHtcbiAgc3RhdGljIGFzeW5jIHdlbGNvbWUocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICB3ZWxjb21lKCk7XG4gICAgcmV0dXJuIHN1Y2Nlc3NIYW5kbGVyKFxuICAgICAgcmVzLFxuICAgICAgMjAwLFxuICAgICAgYFdlbGNvbWUgdG8gdGhlICR7cHJvY2Vzcy5lbnYuQVBQX05BTUV9LCBydW5uaW5nIG9uIHBvcnQgJHtwcm9jZXNzLmVudi5QT1JUfSFgLFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IFN3YWdnZXIgZnJvbSAnLi4vYXBpLnN3YWdnZXInO1xuaW1wb3J0IHB1YmxpY0NvbnRyb2xsZXIgZnJvbSAnLi9wdWJsaWMuY29udHJvbGxlcic7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xucm91dGVyLnJvdXRlKCcvd2VsY29tZScpLmdldChwdWJsaWNDb250cm9sbGVyLndlbGNvbWUpO1xucm91dGVyLnVzZSgnL2RvY3MnLCBTd2FnZ2VyLmdldE1pZGRsZXdhcmVzKCkpO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iLCIvKipSZXNldCBwYXRpZW50IHNpZ24taW4gUGFzc3dvcmQgc2VydmljZXNcbiAqIEBhdXRob3I6ICBKRDk4OTg8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gKiBAZGVzY3JpcHRpb246IENyZWF0ZSBSZXNldFBhc3N3b3JkIGNvbnRyb2xsZXIuXG4gKi9cbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgUGFzc3dvcmRTZXJ2aWNlIGZyb20gJy4vcmVzZXQuc2VydmljZSc7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdCc7XG5pbXBvcnQgeyB1cGRhdGVfcGFzc3dvcmQgfSBmcm9tICcuLi9oZWxwZXJzL3ZhbGlkYXRpb24vcmVzZXQudmFsaWRhdGlvbic7XG5pbXBvcnQgc3VjY2Vzc0hhbmRsZXIgZnJvbSAnLi4vLi4vbGFuZy9oYW5kbGVycy9zdWNjZXNzJztcbmltcG9ydCBtZXNzYWdlIGZyb20gJy4uLy4uL2xhbmcvbWVzc2FnZSc7XG5pbXBvcnQgZXJyb3JIYW5kbGVyIGZyb20gJy4uLy4uL2xhbmcvaGFuZGxlcnMvZXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbXBsb3llZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlc2V0UGFzc3dvcmQgPSB0aGlzLnJlc2V0UGFzc3dvcmQuYmluZCh0aGlzKTtcbiAgfVxuICAvKipSZXNldCBQYXNzd29yZCBzZXJ2aWNlc1xuICAgKiBAYXV0aG9yOiAgSkQ5ODk4PGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICAgKiBAZGVzY3JpcHRpb246IENyZWF0ZSBSZXNldFBhc3N3b3JkIHNlcnZpY2VzLGZpcnN0IGdldCBvbHMgcGFzc3dvcmQgdGhhbiBtYXRjaCBvbGQgcGFzc3dvcmQgJiBuZXdseSBhZGRlZCBwYXNzd29yZCwgaWYgbmV3IHBhc3N3b3JkIHNhbWUgYXMgb2xzIHBhc3N3b3JkIHlvdSBnZXQgZXJyb3IsIG9sZCBwYXNzd29yZCAmIG5ldyBwYXNzd29yZCBtdXN0IGJlIHVuaXFlLCBlbmNyaXB0IG5ldyBwYXNzd29yZCBhbmQgc3RvcmUgaW4gZGF0YWJhc2UgLlxuICAgKiBAcmV0dXJuOiB1cGRhdGVkIG5ldyBQYXNzd29yZC5cbiAgICovXG4gIGFzeW5jIHJlc2V0UGFzc3dvcmQocmVxOiBhbnksIHJlczogUmVzcG9uc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBjb25zdCBvbGRQYXNzd29yZCA9IHJlcS5ib2R5Lm9sZF9wYXNzd29yZDtcbiAgICAgIGNvbnN0IG5ld1Bhc3N3b3JkID0gcmVxLmJvZHkubmV3UGFzc3dvcmQ7XG5cbiAgICAgIC8vIGNvbnN0IHZhbGlkYXRlID0gYXdhaXQgdXBkYXRlX3Bhc3N3b3JkLnZhbGlkYXRlQXN5bmMocmVxLmJvZHkpO1xuICAgICAgY29uc3QgZW5jcnlwdFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2gobmV3UGFzc3dvcmQsIDEwKTtcblxuICAgICAgY29uc3QgcmVzdWx0OiBhbnkgPSBhd2FpdCBQYXNzd29yZFNlcnZpY2UucmVzZXRQYXNzd29yZChcbiAgICAgICAgZW5jcnlwdFBhc3N3b3JkLFxuICAgICAgICByZXEsXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzdWx0WzFdLnJvd0NvdW50ID4gMCkge1xuICAgICAgICByZXR1cm4gc3VjY2Vzc0hhbmRsZXIoXG4gICAgICAgICAgcmVzLFxuICAgICAgICAgIDIwMCxcbiAgICAgICAgICBtZXNzYWdlLnN1Y2Nlc3MuZ2V0UGFzc3dvcmRSZXNldFN1Y2Nlc3NmdWxseSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDEsIG1lc3NhZ2UuZXJyb3Iud3JvbmdQYXNzd29yZEVycm9yKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDQsIG1lc3NhZ2UuZXJyb3Iuc29tZXRoaW5nV2VudFdyb25nRXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqUmVzZXQgcGF0aWVudCBzaWduLWluIFBhc3N3b3JkIHJvdXRlcnNcbiAqIEBhdXRob3I6ICBKRDk4OTg8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gKiBAZGVzY3JpcHRpb246IENyZWF0ZSBSZXNldFBhc3N3b3JkIHJvdXRlcnMgaXMgaGVyZS5cbiAqL1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgUGFzc3dvcmRDb250cm9sbGVyIGZyb20gJy4vcmVzZXQuY29udHJvbGxlcic7XG5cbmNvbnN0IHBhc3N3b3JkQ29udHJvbGxlciA9IG5ldyBQYXNzd29yZENvbnRyb2xsZXIoKTtcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKHsgbWVyZ2VQYXJhbXM6IHRydWUgfSk7XG5cbnJvdXRlci5yb3V0ZSgnL3Jlc2V0X3Bhc3N3b3JkJykucHV0KHBhc3N3b3JkQ29udHJvbGxlci5yZXNldFBhc3N3b3JkKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIiwiLyoqUmVzZXQgcGF0aWVudCBzaWduLWluIFBhc3N3b3JkIHNlcnZpY2VzXG4gKiBAYXV0aG9yOiAgSkQ5ODk4PGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICogQGRlc2NyaXB0aW9uOiBDcmVhdGUgUmVzZXRQYXNzd29yZCBzZXJ2aWNlcy5cbiAqL1xuaW1wb3J0IHsgUXVlcnlUeXBlcyB9IGZyb20gJ3NlcXVlbGl6ZSc7XG5pbXBvcnQgeyBEQkNvbm5lY3Rpb24gfSBmcm9tICcuLi8uLi9kYi9kYi5jb25uZWN0aW9uJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0JztcbmltcG9ydCByZXNldFF1ZXJpZXMgZnJvbSAnLi4vaGVscGVycy9xdWVyeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhc3N3b3JkU2VydmljZSB7XG4gIC8qKlJlc2V0IFBhc3N3b3JkIHNlcnZpY2VzXG4gICAqIEBhdXRob3I6ICBKRDk4OTg8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gICAqIEBkZXNjcmlwdGlvbjogQ3JlYXRlIFJlc2V0UGFzc3dvcmQgc2VydmljZXMsZmlyc3QgZ2V0IG9scyBwYXNzd29yZCB0aGFuIG1hdGNoIG9sZCBwYXNzd29yZCAmIG5ld2x5IGFkZGVkIHBhc3N3b3JkLCBpZiBuZXcgcGFzc3dvcmQgc2FtZSBhcyBvbHMgcGFzc3dvcmQgeW91IGdldCBlcnJvciwgb2xkIHBhc3N3b3JkICYgbmV3IHBhc3N3b3JkIG11c3QgYmUgdW5pcWUsIGVuY3JpcHQgbmV3IHBhc3N3b3JkIGFuZCBzdG9yZSBpbiBkYXRhYmFzZSAuXG4gICAqIEByZXR1cm46IHVwZGF0ZWQgbmV3IFBhc3N3b3JkLlxuICAgKi9cbiAgc3RhdGljIGFzeW5jIHJlc2V0UGFzc3dvcmQ8VERldGFpbCA9IGFueT4oXG4gICAgLy8gb2xkUGFzc3dvcmQ6IHN0cmluZyxcbiAgICBlbmNyeXB0UGFzc3dvcmQ6IHN0cmluZyxcbiAgICByZXE6IGFueSxcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0cnkge1xuICAgICAgLy8gc2VuZCByZXNwb25zZSBmcm9tIGhlcmVcbiAgICAgIC8vIGNvbnN0IG9sZF9wYXNzd29yZDogYW55ID0gYXdhaXQgREJDb25uZWN0aW9uLmV4ZWN1dGVTYW1wbGVRdWVyeShcbiAgICAgIC8vICAgcmVzZXRRdWVyaWVzLnJlc2V0UXVlcmllcy5nZXRfcGFzcyxcbiAgICAgIC8vICAge1xuICAgICAgLy8gICAgIGlkOiByZXEudXNlci5pZCxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICk7XG5cbiAgICAgIC8vIGlmIChhd2FpdCBiY3J5cHQuY29tcGFyZShvbGRQYXNzd29yZCwgb2xkX3Bhc3N3b3JkWzBdWzBdLnBhc3N3b3JkKSkge1xuICAgICAgY29uc3QgdXBkYXRlUGFzc3dvcmQ6IGFueSA9IGF3YWl0IERCQ29ubmVjdGlvbi5leGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgICAgIHJlc2V0UXVlcmllcy5yZXNldFF1ZXJpZXMucmVzZXRfcGFzcyxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiByZXEudXNlci5pZCxcbiAgICAgICAgICAvLyBvbGRQYXNzd29yZDogb2xkUGFzc3dvcmQsXG4gICAgICAgICAgZW5jcnlwdFBhc3N3b3JkOiBlbmNyeXB0UGFzc3dvcmQsXG4gICAgICAgIH0sXG4gICAgICAgIFF1ZXJ5VHlwZXMuVVBEQVRFLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHVwZGF0ZVBhc3N3b3JkO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG4iLCIvKipQYXRpZW50IHByb2ZpbGUgcGhvdG8gdXBkYXRlIGNvbnRyb2xsZXJcbiAqIEBhdXRoZXIgIEpEOTg5ODxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbjogUGF0aWVudCBQcm9maWxlIHBob3RvIGFkZC11cGRhdGUgY29udHJvbGxlciBmdW5jdGlvbnNcbiAqL1xuXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbi8vIGltcG9ydCBjb252ZXJ0IGZyb20gJy4uLy4uL2hlbHBlcnMvZmlsZSc7XG5pbXBvcnQgSW1hZ2VTZXJ2aWNlIGZyb20gJy4vczNzZXJ2aWNlcyc7XG5pbXBvcnQgdXBsb2FkRmlsZSBmcm9tICcuLi8uLi9oZWxwZXJzL2RvY3VtZW50VXBsb2FkL3VwbG9hZC5zZXJ2aWNlJztcbmltcG9ydCBzdWNjZXNzSGFuZGxlciBmcm9tICcuLi8uLi9sYW5nL2hhbmRsZXJzL3N1Y2Nlc3MnO1xuaW1wb3J0IG1lc3NhZ2UgZnJvbSAnLi4vLi4vbGFuZy9tZXNzYWdlJztcbmltcG9ydCBlcnJvckhhbmRsZXIgZnJvbSAnLi4vLi4vbGFuZy9oYW5kbGVycy9lcnJvcic7XG5pbXBvcnQgQVdTIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vaGVscGVycy91dGlscy9pbmRleCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHMzY29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudXBsb2FkcyA9IHRoaXMudXBsb2Fkcy5iaW5kKHRoaXMpO1xuICB9XG4gIC8qKlVwZGF0ZSBQYXRpZW50IHByb2ZpbGUgcGhvdG8gY29udHJvbGxlclxuICAgKiBAYXV0aGVyICBKRDk4OTg8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gICAqIEBkZXNjcmlwdGlvbjpVcGRhdGUgUGF0aWVudCBQcm9maWxlIHBob3RvIGluIHMzIGJ1Y2tldCB1c2luZyBhd3MgYWNjb3VudHMsIHRoaXMgY29udHJvbGxlciBmb3IgdXBkYXRlIHBob3RvLlxuICAgKiBAcmV0dXJuOiB1cGRhdGVkIHByb2ZpbGUgcGhvdG8uXG4gICAqL1xuXG4gIGFzeW5jIHVwbG9hZHMocmVxOiBhbnksIHJlczogUmVzcG9uc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBmaWxlID0gcmVxLmZpbGVzO1xuICAgICAgbG9nZ2VyLmluZm8oZmlsZSk7XG4gICAgICAvLyBjb25zdCBmaWxlcyA9IHJlcS5maWxlcy5maWxlbmFtZTtcbiAgICAgIC8vIGxvZ2dlci5pbmZvKGZpbGUpO1xuICAgICAgbGV0IGZvbGRlciA9ICcnO1xuICAgICAgaWYgKGZpbGUubWltZXR5cGUgPT09ICdhcHBsaWNhdGlvbi9wZGYnKSB7XG4gICAgICAgIGZvbGRlciA9ICdEb2N1bWVudHMnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9sZGVyID0gJ0ltYWdlcyc7XG4gICAgICB9XG4gICAgICBjb25zdCBhY2Nlc3NLZXlJZCA9IHByb2Nlc3MuZW52LlMzX0FDQ0VTU19LRVlfSUQ7XG4gICAgICBjb25zdCBzZWNyZXRBY2Nlc3NLZXkgPSBwcm9jZXNzLmVudi5TM19TRUNSRVRfQUNDRVNTX0tFWTtcbiAgICAgIGNvbnN0IGJ1Y2tldE5hbWUgPSBwcm9jZXNzLmVudi5BV1NfUzNfQlVDS0VUO1xuICAgICAgY29uc3QgcmVnaW9uID0gcHJvY2Vzcy5lbnYuUzNfUkVHSU9OO1xuICAgICAgY29uc3QgZm9sZGVyTmFtZSA9IGAke3Byb2Nlc3MuZW52LkFXU19TM19GT0xERVJ9LyR7cmVxLnVzZXIuaWR9LyR7Zm9sZGVyfWA7XG5cbiAgICAgIGNvbnN0IHJlc3VsdDogYW55ID0gYXdhaXQgdXBsb2FkRmlsZShcbiAgICAgICAgZmlsZSxcbiAgICAgICAgYWNjZXNzS2V5SWQsXG4gICAgICAgIHNlY3JldEFjY2Vzc0tleSxcbiAgICAgICAgYnVja2V0TmFtZSxcbiAgICAgICAgZm9sZGVyTmFtZSxcbiAgICAgICAgcmVnaW9uLFxuICAgICAgKTtcbiAgICAgIGxvZ2dlci5pbmZvKHJlc3VsdCk7XG4gICAgICBjb25zdCByZXN1bHRzOiBhbnkgPSBhd2FpdCBJbWFnZVNlcnZpY2UuRG9jdW1lbnRVcGxvYWQocmVzdWx0LCByZXEsIGZpbGUpO1xuXG4gICAgICAvLyBpZiAoIXJlc3VsdCkge1xuICAgICAgLy8gICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCBtZXNzYWdlLmVycm9yLnNvbWV0aGluZ1dlbnRXcm9uZ0Vycm9yKTtcbiAgICAgIC8vIH1cblxuICAgICAgZnMudW5saW5rKGZpbGUucGF0aCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXN1bHRzWzFdKSB7XG4gICAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDAsIG1lc3NhZ2UuZXJyb3IucGF0aWVudE5vdGVVcGRhdGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1Y2Nlc3NIYW5kbGVyKFxuICAgICAgICByZXMsXG4gICAgICAgIDIwMCxcbiAgICAgICAgbWVzc2FnZS5zdWNjZXNzLmRvY1VwbG9hZFN1Y2Nlc3NGdWxseSxcbiAgICAgICAgcmVzdWx0LFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5pbmZvKGVyciwgJ2Vycm9yJyk7XG4gICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCBtZXNzYWdlLmVycm9yLnNvbWV0aGluZ1dlbnRXcm9uZ0Vycm9yKTtcbiAgICB9XG4gIH1cblxuICAvLyBhc3luYyBjb252ZXJ0RG9jVG9QZGYoZG9jUGF0aDogc3RyaW5nLCBwZGZQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gICAvLyBDb252ZXJ0IHRoZSBET0MgZmlsZSB0byBQREYgdXNpbmcgbGlicmVvZmZpY2UtY29udmVydFxuICAvLyAgIGNvbnN0IGRvY0RhdGEgPSBhd2FpdCBwcm9taXNpZnkoZnMucmVhZEZpbGUpKGRvY1BhdGgpO1xuICAvLyAgIGNvbnN0IGNvbnZlcnQ6IGFueSA9IHByb21pc2lmeShsaWJyZW9mZmljZUNvbnZlcnQuY29udmVydCk7XG4gIC8vICAgYXdhaXQgY29udmVydChkb2NEYXRhLCAnLnBkZicsIHsgZm9ybWF0OiAncGRmJyB9KTtcbiAgLy8gICBjb25zdCBwZGZEYXRhID0gYXdhaXQgcHJvbWlzaWZ5KGZzLnJlYWRGaWxlKSgnLnBkZicpO1xuICAvLyAgIGF3YWl0IHByb21pc2lmeShmcy53cml0ZUZpbGUpKHBkZlBhdGgsIHBkZkRhdGEpO1xuXG4gIC8vICAgLy8gRGVsZXRlIHRoZSB0ZW1wb3JhcnkgUERGIGZpbGVcbiAgLy8gICAvLyBhd2FpdCBwcm9taXNpZnkoZnMudW5saW5rKSgnLnBkZicpO1xuICAvLyAgIHJldHVybjtcbiAgLy8gfVxuXG4gIC8vIFVzYWdlXG4gIGFzeW5jIHVwbG9hZChyZXE6IGFueSwgcmVzOiBSZXNwb25zZSk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGZpbGVzID0gcmVxLmZpbGVzO1xuICAgICAgbG9nZ2VyLmluZm8oSlNPTi5zdHJpbmdpZnkoZmlsZXMpKTtcbiAgICAgIGNvbnN0IGFjY2Vzc0tleUlkID0gcHJvY2Vzcy5lbnYuUzNfQUNDRVNTX0tFWV9JRDtcbiAgICAgIGNvbnN0IHNlY3JldEFjY2Vzc0tleSA9IHByb2Nlc3MuZW52LlMzX1NFQ1JFVF9BQ0NFU1NfS0VZO1xuICAgICAgY29uc3QgYnVja2V0TmFtZSA9IHByb2Nlc3MuZW52LkFXU19TM19CVUNLRVQ7XG4gICAgICBjb25zdCByZWdpb24gPSBwcm9jZXNzLmVudi5TM19SRUdJT047XG5cbiAgICAgIGNvbnN0IHJlc3VsdHM6IGFueSA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBmaWxlcy5tYXAoYXN5bmMgKGZpbGU6IGFueSkgPT4ge1xuICAgICAgICAgIGxldCBmb2xkZXIgPSAnJztcbiAgICAgICAgICAvLyBpZiAoXG4gICAgICAgICAgLy8gICBmaWxlLm1pbWV0eXBlID09PVxuICAgICAgICAgIC8vICAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnIHx8XG4gICAgICAgICAgLy8gICBmaWxlLm1pbWV0eXBlID09PSAnYXBwbGljYXRpb24vbXN3b3JkJ1xuICAgICAgICAgIC8vICkge1xuICAgICAgICAgIC8vICAgY29uc3QgaW5wdXQgPSBgJHtmaWxlLmZpbGVuYW1lfWA7XG4gICAgICAgICAgLy8gICBjb25zdCBvdXRwdXQgPSBgJHtwYXRoLnBhcnNlKGZpbGUuZmlsZW5hbWUpLm5hbWV9YDtcbiAgICAgICAgICAvLyAgIGF3YWl0IGNvbnZlcnQuZmlsZUNub3ZlcnQoaW5wdXQsIG91dHB1dCkuY2F0Y2goZnVuY3Rpb24gKGVycjogYW55KSB7XG4gICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGBFcnJvciBjb252ZXJ0aW5nIGZpbGU6ICR7ZXJyfWApO1xuICAgICAgICAgIC8vICAgfSk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIC8vIGxvZ2dlci5pbmZvKGZpbGUpO1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGZpbGUubWltZXR5cGUpO1xuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZmlsZS5taW1ldHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3BkZicgfHxcbiAgICAgICAgICAgIGZpbGUubWltZXR5cGUgPT09XG4gICAgICAgICAgICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcgfHxcbiAgICAgICAgICAgIGZpbGUubWltZXR5cGUgPT09ICdhcHBsaWNhdGlvbi9tc3dvcmQnXG4gICAgICAgICAgKVxuICAgICAgICAgICAgZm9sZGVyID0gJ0RvY3VtZW50cyc7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb2xkZXIgPSAnSW1hZ2VzJztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbG9nZ2VyLmluZm8oZm9sZGVyKTtcbiAgICAgICAgICBjb25zdCBmb2xkZXJOYW1lID0gYCR7cHJvY2Vzcy5lbnYuQVdTX1MzX0ZPTERFUn0vJHtyZXEudXNlci5pZH0vJHtmb2xkZXJ9YDtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhmaWxlKTtcbiAgICAgICAgICAvLyBpZiAoXG4gICAgICAgICAgLy8gICBmaWxlLm1pbWV0eXBlID09PVxuICAgICAgICAgIC8vICAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnIHx8XG4gICAgICAgICAgLy8gICBmaWxlLm1pbWV0eXBlID09PSAnYXBwbGljYXRpb24vbXN3b3JkJ1xuICAgICAgICAgIC8vICkge1xuICAgICAgICAgIC8vICAgY29uc29sZS5sb2coJ2luJywgcGF0aC5wYXJzZShmaWxlLmZpbGVuYW1lKS5uYW1lKTtcbiAgICAgICAgICAvLyAgIGNvbnN0IGlucHV0ID0gYCR7ZmlsZS5maWxlbmFtZX1gO1xuICAgICAgICAgIC8vICAgY29uc3Qgb3V0cHV0ID0gYCR7cGF0aC5wYXJzZShmaWxlLmZpbGVuYW1lKS5uYW1lfS5wZGZgO1xuICAgICAgICAgIC8vICAgLy8gYXdhaXQgSW1hZ2VTZXJ2aWNlLmNvbnZlcnREb2NUb1BkZihpbnB1dCwgb3V0cHV0KTtcbiAgICAgICAgICAvLyAgIGF3YWl0IGNvbnZlcnREb2NUb1BkZihpbnB1dCwgb3V0cHV0KTtcbiAgICAgICAgICAvLyAgIC8vIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdDb252ZXJzaW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJykpXG4gICAgICAgICAgLy8gICAvLyAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKCdDb252ZXJzaW9uIGZhaWxlZDonLCBlcnJvcikpO1xuICAgICAgICAgIC8vICAgcmV0dXJuIHN1Y2Nlc3NIYW5kbGVyKFxuICAgICAgICAgIC8vICAgICByZXMsXG4gICAgICAgICAgLy8gICAgIDIwMCxcbiAgICAgICAgICAvLyAgICAgbWVzc2FnZS5zdWNjZXNzLkNsaWVudEFkZFN1Y2Nlc3NGdWxseSxcbiAgICAgICAgICAvLyAgICk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIGNvbnN0IHJlc3VsdDogYW55ID0gYXdhaXQgdXBsb2FkRmlsZShcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICBhY2Nlc3NLZXlJZCxcbiAgICAgICAgICAgIHNlY3JldEFjY2Vzc0tleSxcbiAgICAgICAgICAgIGJ1Y2tldE5hbWUsXG4gICAgICAgICAgICBmb2xkZXJOYW1lLFxuICAgICAgICAgICAgcmVnaW9uLFxuICAgICAgICAgICk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAvLyBsb2dnZXIuaW5mbyhyZXN1bHQpO1xuICAgICAgICAgIGNvbnN0IGRhdGE6IGFueSA9IGF3YWl0IEltYWdlU2VydmljZS5Eb2N1bWVudFVwbG9hZChcbiAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgIHJlcSxcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBBV1MuY29uZmlnLnVwZGF0ZSh7XG4gICAgICAgICAgICByZWdpb246IHJlZ2lvbixcbiAgICAgICAgICAgIGFjY2Vzc0tleUlkOiBhY2Nlc3NLZXlJZCxcbiAgICAgICAgICAgIHNlY3JldEFjY2Vzc0tleTogc2VjcmV0QWNjZXNzS2V5LFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgczMgPSBuZXcgQVdTLlMzKCk7XG4gICAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgICAgICAgS2V5OiByZXN1bHQuS2V5LFxuICAgICAgICAgICAgRXhwaXJlczogMzYwMCxcbiAgICAgICAgICAgIC8vIEFDTDogJ3B1YmxpYy1yZWFkJyxcbiAgICAgICAgICAgIC8vIFJlc3BvbnNlQ29udGVudERpc3Bvc2l0aW9uOiBgYXR0YWNobWVudDtmaWxlbmFtZT1cIiR7cmVzdWx0LktleX1cImAsIC8vIFVSTCBleHBpcmF0aW9uIHRpbWUgaW4gc2Vjb25kc1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBjb25zdCB1cmwgPSBzMy5nZXRTaWduZWRVcmwoJ2dldE9iamVjdCcsIHBhcmFtcyk7XG5cbiAgICAgICAgICBjb25zdCBmaWxlVXJsID0gczMuZ2V0U2lnbmVkVXJsKCdnZXRPYmplY3QnLCBwYXJhbXMpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGVVcmwpO1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGZpbGVVcmwpO1xuICAgICAgICAgIC8vIGxvZ2dlci5pbmZvKHVybCk7XG4gICAgICAgICAgLy8gbG9nZ2VyLmluZm8ocmVzdWx0LmtleSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleTogcmVzdWx0LmtleSxcbiAgICAgICAgICAgIHVybDogcmVzdWx0LkxvY2F0aW9uLFxuICAgICAgICAgICAgbmFtZTogZGF0YS5maWxlX25hbWUsXG4gICAgICAgICAgICBmaWxldXJsOiBmaWxlVXJsLFxuICAgICAgICAgICAgdHlwZTogZmlsZS5taW1ldHlwZSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICAvLyBsb2dnZXIuaW5mbyhyZXN1bHRzKTtcbiAgICAgIC8vIGNvbnN0IHN1Y2Nlc3NSZXN1bHRzOiBhbnkgPSByZXN1bHRzXG4gICAgICAvLyAgIC5maWx0ZXIoKHIpID0+IHtcbiAgICAgIC8vICAgICBsb2dnZXIuaW5mbyhyKTtcbiAgICAgIC8vICAgICBpZiAoIXJbMV0pIHtcbiAgICAgIC8vICAgICAgIGxvZ2dlci5pbmZvKGBGYWlsZWQgdG8gdXBsb2FkIGZpbGU6ICR7clswXS5rZXl9YCk7XG4gICAgICAvLyAgICAgfVxuICAgICAgLy8gICAgIHJldHVybiByWzFdO1xuICAgICAgLy8gICB9KVxuICAgICAgLy8gICAubWFwKChyKSA9PiByWzBdKTtcblxuICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZTogeyBwYXRoOiBmcy5QYXRoTGlrZSB9KSA9PiB7XG4gICAgICAgIGZzLnVubGluayhmaWxlLnBhdGgsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghcmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci5wYXRpZW50Tm90ZVVwZGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdWNjZXNzSGFuZGxlcihcbiAgICAgICAgcmVzLFxuICAgICAgICAyMDAsXG4gICAgICAgIG1lc3NhZ2Uuc3VjY2Vzcy5kb2NVcGxvYWRTdWNjZXNzRnVsbHksXG4gICAgICAgIHJlc3VsdHMsXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIGxvZ2dlci5pbmZvKGVyciwgJ2Vycm9yJyk7XG4gICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCBtZXNzYWdlLmVycm9yLnNvbWV0aGluZ1dlbnRXcm9uZ0Vycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBJbWFnZVVwbG9hZChyZXE6IGFueSwgcmVzOiBSZXNwb25zZSk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGZpbGVzID0gcmVxLmZpbGVzO1xuICAgICAgbG9nZ2VyLmluZm8oZmlsZXMpO1xuICAgICAgY29uc3QgYWNjZXNzS2V5SWQgPSBwcm9jZXNzLmVudi5TM19BQ0NFU1NfS0VZX0lEO1xuICAgICAgY29uc3Qgc2VjcmV0QWNjZXNzS2V5ID0gcHJvY2Vzcy5lbnYuUzNfU0VDUkVUX0FDQ0VTU19LRVk7XG4gICAgICBjb25zdCBidWNrZXROYW1lID0gcHJvY2Vzcy5lbnYuQVdTX1MzX0JVQ0tFVDtcbiAgICAgIGNvbnN0IHJlZ2lvbiA9IHByb2Nlc3MuZW52LlMzX1JFR0lPTjtcblxuICAgICAgY29uc3QgcmVzdWx0czogYW55ID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGZpbGVzLm1hcChhc3luYyAoZmlsZTogeyBtaW1ldHlwZTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICAvLyBsZXQgZm9sZGVyID0gJyc7XG4gICAgICAgICAgLy8gbG9nZ2VyLmluZm8oZmlsZSk7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oZmlsZS5taW1ldHlwZSk7XG4gICAgICAgICAgLy8gbG9nZ2VyLmluZm8oZm9sZGVyKTtcbiAgICAgICAgICBjb25zdCBmb2xkZXJOYW1lID0gYCR7cHJvY2Vzcy5lbnYuQVdTX1MzX0ZPTERFUn0vJHtyZXEudXNlci5pZH0vSW1hZ2VzYDtcblxuICAgICAgICAgIGNvbnN0IHJlc3VsdDogYW55ID0gYXdhaXQgdXBsb2FkRmlsZShcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICBhY2Nlc3NLZXlJZCxcbiAgICAgICAgICAgIHNlY3JldEFjY2Vzc0tleSxcbiAgICAgICAgICAgIGJ1Y2tldE5hbWUsXG4gICAgICAgICAgICBmb2xkZXJOYW1lLFxuICAgICAgICAgICAgcmVnaW9uLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleTogcmVzdWx0LmtleSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICBmaWxlcy5mb3JFYWNoKChmaWxlOiB7IHBhdGg6IGZzLlBhdGhMaWtlIH0pID0+IHtcbiAgICAgICAgZnMudW5saW5rKGZpbGUucGF0aCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgIHJlc3VsdHMuZm9yRWFjaCgob2JqOiBhbnkpID0+IHtcbiAgICAgICAgcmVzdWx0ICs9IG9iai5rZXkgKyAnLCc7XG4gICAgICB9KTtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5zbGljZSgwLCAtMSk7IC8vIHJlbW92ZSB0aGUgbGFzdCBjb21tYVxuXG4gICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgY29uc3QgZGF0YTogYW55ID0gYXdhaXQgYXhpb3MucG9zdChgJHtwcm9jZXNzLmVudi5BSV9VUkx9YCwge1xuICAgICAgICBtZXNzYWdlOiBgT0NSIHwgJHtyZXN1bHR9YCxcbiAgICAgICAgc2VuZGVyOiByZXEudXNlci5lbWFpbCxcbiAgICAgIH0pO1xuICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICBpZiAoZGF0YS5kYXRhWzBdLnRleHQgPT09ICdObyB0ZXh0IEZvdW5kIGluIHRoZSBJbWFnZScpIHtcbiAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci5pbWFnZU5vdFByb3Blcik7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhLmRhdGEpO1xuICAgICAgY29uc3QgZGF0YXM6IGFueSA9IGF3YWl0IGRhdGEuZGF0YVswXTtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGFzKTtcblxuICAgICAgQVdTLmNvbmZpZy51cGRhdGUoe1xuICAgICAgICByZWdpb246IHJlZ2lvbixcbiAgICAgICAgYWNjZXNzS2V5SWQ6IGFjY2Vzc0tleUlkLFxuICAgICAgICBzZWNyZXRBY2Nlc3NLZXk6IHNlY3JldEFjY2Vzc0tleSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzMyA9IG5ldyBBV1MuUzMoKTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgICBLZXk6IGRhdGFzLnRleHQsXG4gICAgICAgIEV4cGlyZXM6IDM2MDAsXG4gICAgICAgIC8vIEFDTDogJ3B1YmxpYy1yZWFkJyxcbiAgICAgICAgLy8gUmVzcG9uc2VDb250ZW50RGlzcG9zaXRpb246IGBhdHRhY2htZW50O2ZpbGVuYW1lPVwiJHtyZXN1bHQuS2V5fVwiYCwgLy8gVVJMIGV4cGlyYXRpb24gdGltZSBpbiBzZWNvbmRzXG4gICAgICB9O1xuXG4gICAgICAvLyBjb25zdCB1cmwgPSBzMy5nZXRTaWduZWRVcmwoJ2dldE9iamVjdCcsIHBhcmFtcyk7XG5cbiAgICAgIGNvbnN0IGZpbGVVcmwgPSBzMy5nZXRTaWduZWRVcmwoJ2dldE9iamVjdCcsIHBhcmFtcyk7XG4gICAgICBjb25zb2xlLmxvZyhmaWxlVXJsKTtcbiAgICAgIGxvZ2dlci5pbmZvKGZpbGVVcmwpO1xuICAgICAgY29uc3QgUmVzcG9uc2U6IGFueSA9IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IHBhdGguYmFzZW5hbWUoZGF0YXMudGV4dCksXG4gICAgICAgICAgZmlsZXVybDogZmlsZVVybCxcbiAgICAgICAgICB0eXBlOiAnYXBwbGljYXRpb24vcGRmJyxcbiAgICAgICAgICBrZXk6IGRhdGFzLnRleHQsXG4gICAgICAgIH0sXG4gICAgICBdO1xuICAgICAgaWYgKCFmaWxlVXJsKSB7XG4gICAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDAsIG1lc3NhZ2UuZXJyb3IucGF0aWVudE5vdGVVcGRhdGUpO1xuICAgICAgfVxuICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cyk7XG5cbiAgICAgIHJldHVybiBzdWNjZXNzSGFuZGxlcihcbiAgICAgICAgcmVzLFxuICAgICAgICAyMDAsXG4gICAgICAgIG1lc3NhZ2Uuc3VjY2Vzcy5kb2NVcGxvYWRTdWNjZXNzRnVsbHksXG4gICAgICAgIFJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICBsb2dnZXIuaW5mbyhlcnIsICdlcnJvcicpO1xuICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci5zb21ldGhpbmdXZW50V3JvbmdFcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2hhdChyZXE6IGFueSwgcmVzOiBSZXNwb25zZSk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdHM6IGFueSA9IGF3YWl0IEltYWdlU2VydmljZS5jaGF0KHJlcSk7XG4gICAgICBsb2dnZXIuaW5mbyhyZXN1bHRzKTtcbiAgICAgIC8vIGlmICghcmVzdWx0KSB7XG4gICAgICAvLyAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDAsIG1lc3NhZ2UuZXJyb3Iuc29tZXRoaW5nV2VudFdyb25nRXJyb3IpO1xuICAgICAgLy8gfVxuICAgICAgY29uc3QgczMgPSBuZXcgQVdTLlMzKHtcbiAgICAgICAgYWNjZXNzS2V5SWQ6IHByb2Nlc3MuZW52LlMzX0FDQ0VTU19LRVlfSUQsXG4gICAgICAgIHNlY3JldEFjY2Vzc0tleTogcHJvY2Vzcy5lbnYuUzNfU0VDUkVUX0FDQ0VTU19LRVksXG4gICAgICAgIHJlZ2lvbjogcHJvY2Vzcy5lbnYuUzNfUkVHSU9OLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgQnVja2V0OiBwcm9jZXNzLmVudi5BV1NfUzNfQlVDS0VULFxuICAgICAgICBEZWxldGU6IHtcbiAgICAgICAgICBPYmplY3RzOiByZXN1bHRzLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdWx0OiBhbnkgPSBzM1xuICAgICAgICAuZGVsZXRlT2JqZWN0cyhwYXJhbXMsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBsb2dnZXIuaW5mbygnRXJyb3IgZGVsZXRpbmcgb2JqZWN0czonLCBlcnIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBsb2dnZXIuaW5mbygnU3VjY2Vzc2Z1bGx5IGRlbGV0ZWQgb2JqZWN0czonLCBkYXRhLkRlbGV0ZWQpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAucHJvbWlzZSgpO1xuICAgICAgaWYgKGF3YWl0IHJlc3VsdCkge1xuICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSBhd2FpdCBJbWFnZVNlcnZpY2UucmVtb3ZlRmlsZShyZXEpO1xuICAgICAgICBpZiAoZGF0YVsxXS5yb3dDb3VudCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gc3VjY2Vzc0hhbmRsZXIoXG4gICAgICAgICAgICByZXMsXG4gICAgICAgICAgICAyMDAsXG4gICAgICAgICAgICBtZXNzYWdlLnN1Y2Nlc3MuZG9jRGVsZXRlU3VjY2Vzc0Z1bGx5LFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci5maWxlTm90Rm91bmRFcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDAsIG1lc3NhZ2UuZXJyb3Iuc29tZXRoaW5nV2VudFdyb25nRXJyb3IpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmluZm8oZXJyLCAnZXJyb3InKTtcbiAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDAsIG1lc3NhZ2UuZXJyb3Iuc29tZXRoaW5nV2VudFdyb25nRXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqIFBhdGllbnQgcHJvZmlsZSBwaG90byByb3V0ZXJcbiAqIEBhdXRoZXIgIEpEOTg5ODxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbjpQYXRpZW50IFByb2ZpbGUgcGhvdG8gaW4gczMgYnVja2V0IHVzaW5nIGF3cyBhY2NvdW50cyByb3V0ZXJzIGlzIGhlcmUuXG4gKi9cblxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgbXVsdGVyIGZyb20gJ211bHRlcic7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgczNjb250cm9sbGVyIGZyb20gJy4vczNjb250cm9sbGVyJztcbmNvbnN0IFMzY29udHJvbGxlciA9IG5ldyBzM2NvbnRyb2xsZXIoKTtcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKHsgbWVyZ2VQYXJhbXM6IHRydWUgfSk7XG5jb25zdCBzdG9yYWdlID0gbXVsdGVyLmRpc2tTdG9yYWdlKHtcbiAgZGVzdGluYXRpb246IGZ1bmN0aW9uIChyZXEsIGZpbGUsIGNiKSB7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGAke19fZGlybmFtZX0vLi4vdXBsb2Fkc2ApKSB7XG4gICAgICBmcy5ta2RpclN5bmMoYCR7X19kaXJuYW1lfS8uLi91cGxvYWRzYCk7XG4gICAgfVxuICAgIGNiKG51bGwsICcuL3VwbG9hZHMnKTtcbiAgfSxcbiAgZmlsZW5hbWU6IGZ1bmN0aW9uIChyZXEsIGZpbGUsIGNiKSB7XG4gICAgY2IobnVsbCwgZmlsZS5vcmlnaW5hbG5hbWUpO1xuICB9LFxufSk7XG4vLyBjb25zdCB1cGxvYWQgPSBtdWx0ZXIoeyBzdG9yYWdlIH0pO1xuXG5jb25zdCB1cGxvYWRpbmcgPSBtdWx0ZXIoe1xuICBzdG9yYWdlLFxuICBsaW1pdHM6IHsgZmllbGRTaXplOiAzMCAqIDEwMjQgKiAxMDI0IH0sXG59KS5hcnJheSgnZmlsZXMnLCAxMCk7XG5cbnJvdXRlci5yb3V0ZSgnL3VwbG9hZCcpLnBvc3QodXBsb2FkaW5nLCBTM2NvbnRyb2xsZXIudXBsb2FkKTtcbnJvdXRlci5yb3V0ZSgnL2RlbGV0ZUZpbGUnKS5kZWxldGUodXBsb2FkaW5nLCBTM2NvbnRyb2xsZXIuY2hhdCk7XG5yb3V0ZXIucm91dGUoJy9pbWFnZScpLnBvc3QodXBsb2FkaW5nLCBTM2NvbnRyb2xsZXIuSW1hZ2VVcGxvYWQpO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iLCJpbXBvcnQgeyBRdWVyeVR5cGVzIH0gZnJvbSAnc2VxdWVsaXplJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3V0aWxzL2luZGV4JztcbmltcG9ydCB7IERCQ29ubmVjdGlvbiB9IGZyb20gJy4uLy4uL2RiL2RiLmNvbm5lY3Rpb24nO1xuaW1wb3J0IHF1ZXJpZXMgZnJvbSAnLi4vaGVscGVycy9xdWVyeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1cGVyQWRtaW5TZXJ2aWNlIHtcbiAgc3RhdGljIGFzeW5jIERvY3VtZW50VXBsb2FkPFREZXRhaWwgPSBhbnk+KFxuICAgIGRhdGE6IGFueSxcbiAgICByZXE6IGFueSxcbiAgICBmaWxlOiBhbnksXG4gICk6IFByb21pc2U8YW55PiB7XG4gICAgLy8gc2VuZCByZXNwb25zZSBmcm9tIGhlcmVcbiAgICAvLyBsb2dnZXIuaW5mbyhmaWxlcyk7XG4gICAgY29uc3QgdXBkYXRlOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgcXVlcmllcy51c2VyUXVlcmllcy5pbnNlcnRfZG9jdW1lbnQsXG4gICAgICB7XG4gICAgICAgIGZpbGVOYW1lOiBmaWxlLmZpbGVuYW1lLFxuICAgICAgICBmaWxlVHlwZTogZmlsZS5taW1ldHlwZSxcbiAgICAgICAga2V5OiBkYXRhLktleSxcbiAgICAgICAgbG9jYXRpb246IGRhdGEuTG9jYXRpb24sXG4gICAgICAgIHVzZXJJZDogcmVxLnVzZXIuaWQsXG4gICAgICB9LFxuICAgICAgUXVlcnlUeXBlcy5VUERBVEUsXG4gICAgKTtcbiAgICBsb2dnZXIuaW5mbyh1cGRhdGVbMF1bMF0pO1xuICAgIC8vIGxvZ2dlci5pbmZvKHVwZGF0ZSk7XG4gICAgaWYgKHVwZGF0ZVsxXSA+IDApIHtcbiAgICAgIHJldHVybiB1cGRhdGVbMF1bMF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGNoYXQ8VERldGFpbCA9IGFueT4ocmVxOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIHNlbmQgcmVzcG9uc2UgZnJvbSBoZXJlXG4gICAgLy8gbG9nZ2VyLmluZm8oZmlsZXMpO1xuICAgIGNvbnN0IFt1cGRhdGVdOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgcXVlcmllcy51c2VyUXVlcmllcy5maW5kX2RvY3VtZW50cyxcbiAgICAgIHtcbiAgICAgICAgdXNlcklkOiByZXEudXNlci5pZCxcbiAgICAgIH0sXG4gICAgICBRdWVyeVR5cGVzLlVQREFURSxcbiAgICApO1xuICAgIGxvZ2dlci5pbmZvKHVwZGF0ZSk7XG4gICAgcmV0dXJuIHVwZGF0ZTtcbiAgfVxuXG4gIC8vIHN0YXRpYyBhc3luYyBjb252ZXJ0RG9jVG9QZGYoZG9jRmlsZVBhdGg6IGFueSwgcGRmRmlsZVBhdGg6IGFueSkge1xuICAvLyAgIGNvbnN0IGlucHV0U3RyZWFtID0gZnMuY3JlYXRlUmVhZFN0cmVhbShkb2NGaWxlUGF0aCk7XG4gIC8vICAgY29uc3Qgb3V0cHV0U3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0ocGRmRmlsZVBhdGgpO1xuXG4gIC8vICAgY29uc3QgY29udmVyc2lvbk9wdGlvbnMgPSB7XG4gIC8vICAgICBmb3JtYXQ6ICdwZGYnLFxuICAvLyAgICAgb3V0cHV0OiBvdXRwdXRTdHJlYW0sXG4gIC8vICAgfTtcblxuICAvLyAgIGF3YWl0IG9mZmljZUNvbnZlcnRlcihpbnB1dFN0cmVhbSwgY29udmVyc2lvbk9wdGlvbnMpO1xuICAvLyB9XG5cbiAgc3RhdGljIGFzeW5jIHJlbW92ZUZpbGU8VERldGFpbCA9IGFueT4ocmVxOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIHNlbmQgcmVzcG9uc2UgZnJvbSBoZXJlXG4gICAgLy8gbG9nZ2VyLmluZm8oZmlsZXMpO1xuICAgIGNvbnN0IGRlbGV0ZXM6IGFueSA9IGF3YWl0IERCQ29ubmVjdGlvbi5leGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgICBxdWVyaWVzLnVzZXJRdWVyaWVzLnJlbW92ZUZpbGUsXG4gICAgICB7XG4gICAgICAgIHVzZXJJZDogcmVxLnVzZXIuaWQsXG4gICAgICB9LFxuICAgICAgUXVlcnlUeXBlcy5VUERBVEUsXG4gICAgKTtcbiAgICBsb2dnZXIuaW5mbyhkZWxldGVzKTtcbiAgICByZXR1cm4gZGVsZXRlcztcbiAgfVxufVxuIiwiLyoqcGF0aWVudCBjb250cm9sbGVyXG4gKiBAYXV0aG9yOiAgSkQ5ODk4PGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICogQGRlc2NyaXB0aW9uOiBQYXRpZW50IFByb2ZpbGUgY29udHJvbGxlIGZ1bmN0aW9uc1xuICovXG5cbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgVXNlcnNTZXJ2aWNlIGZyb20gJy4vdXNlcnMuc2VydmljZSc7XG5pbXBvcnQgc3VjY2Vzc0hhbmRsZXIgZnJvbSAnLi4vLi4vbGFuZy9oYW5kbGVycy9zdWNjZXNzJztcbmltcG9ydCBlcnJvckhhbmRsZXIgZnJvbSAnLi4vLi4vbGFuZy9oYW5kbGVycy9lcnJvcic7XG5pbXBvcnQgbWVzc2FnZSBmcm9tICcuLi8uLi9sYW5nL21lc3NhZ2UnO1xuaW1wb3J0IFVwZGF0ZURhdGEgZnJvbSAnLi4vYXBpLmRlZmluaXRpb25zJztcbmltcG9ydCB1cGxvYWRGaWxlIGZyb20gJy4uLy4uL2hlbHBlcnMvZG9jdW1lbnRVcGxvYWQvdXBsb2FkLnNlcnZpY2UnO1xuaW1wb3J0IEFXUyBmcm9tICdhd3Mtc2RrJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uLy4uL2hlbHBlcnMvdXRpbHMvaW5kZXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGV0YWlsID0gdGhpcy5kZXRhaWwuYmluZCh0aGlzKTtcbiAgICB0aGlzLlByb2ZpbGVVcGRhdGUgPSB0aGlzLlByb2ZpbGVVcGRhdGUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8qKkdldCBwYXRpZW50ZGV0YWlscyBjb250cm9sbGVyXG4gICAqIEBhdXRob3I6ICBKRDk4OTg8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gICAqIEBkZXNjcmlwdGlvbjpHRVQgUGF0aWVudCBQcm9maWxlIGRldGFpbHMgdXNpbmcgRW1haWwuXG4gICAqICBAcmV0dXJuOiBhbGwgdGhlIHBhdGllbnRzIGRldGFpbHMgeW91IG5lZWQuXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXRhaWwocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYWNjZXNzS2V5SWQgPSBwcm9jZXNzLmVudi5TM19BQ0NFU1NfS0VZX0lEO1xuICAgICAgY29uc3Qgc2VjcmV0QWNjZXNzS2V5ID0gcHJvY2Vzcy5lbnYuUzNfU0VDUkVUX0FDQ0VTU19LRVk7XG4gICAgICBjb25zdCBidWNrZXROYW1lID0gcHJvY2Vzcy5lbnYuQVdTX1MzX0JVQ0tFVDtcbiAgICAgIGNvbnN0IHJlZ2lvbiA9IHByb2Nlc3MuZW52LlMzX1JFR0lPTjtcbiAgICAgIEFXUy5jb25maWcudXBkYXRlKHtcbiAgICAgICAgcmVnaW9uOiByZWdpb24sXG4gICAgICAgIGFjY2Vzc0tleUlkOiBhY2Nlc3NLZXlJZCxcbiAgICAgICAgc2VjcmV0QWNjZXNzS2V5OiBzZWNyZXRBY2Nlc3NLZXksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgczMgPSBuZXcgQVdTLlMzKCk7XG5cbiAgICAgIC8vIGNvbnN0IHVybCA9IHMzLmdldFNpZ25lZFVybCgnZ2V0T2JqZWN0JywgcGFyYW1zKTtcblxuICAgICAgY29uc3QgcmVzdWx0OiBhbnkgPSBhd2FpdCBVc2Vyc1NlcnZpY2UuZGV0YWlsKHJlcSk7XG4gICAgICBpZiAocmVzdWx0LnByb2ZpbGVVcmwpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgIEJ1Y2tldDogYnVja2V0TmFtZSxcbiAgICAgICAgICBLZXk6IHJlc3VsdC5wcm9maWxlVXJsLFxuICAgICAgICAgIEV4cGlyZXM6IDM2MDAsXG4gICAgICAgICAgLy8gQUNMOiAncHVibGljLXJlYWQnLFxuICAgICAgICAgIC8vIFJlc3BvbnNlQ29udGVudERpc3Bvc2l0aW9uOiBgYXR0YWNobWVudDtmaWxlbmFtZT1cIiR7cmVzdWx0LktleX1cImAsIC8vIFVSTCBleHBpcmF0aW9uIHRpbWUgaW4gc2Vjb25kc1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmaWxlVXJsID0gYXdhaXQgczMuZ2V0U2lnbmVkVXJsKCdnZXRPYmplY3QnLCBwYXJhbXMpO1xuICAgICAgICBsb2dnZXIuaW5mbyhmaWxlVXJsKTtcbiAgICAgICAgcmVzdWx0LnByb2ZpbGVVcmwgPSBmaWxlVXJsO1xuICAgICAgICBsb2dnZXIuaW5mbyhyZXN1bHQpO1xuXG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci5zb21ldGhpbmdXZW50V3JvbmdFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1Y2Nlc3NIYW5kbGVyKFxuICAgICAgICAgIHJlcyxcbiAgICAgICAgICAyMDAsXG4gICAgICAgICAgbWVzc2FnZS5zdWNjZXNzLmdldFVzZXJEYXRhUmV0cml2ZVN1Y2Nlc3NGdWxseSxcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHJlcywgNDAwLCBtZXNzYWdlLmVycm9yLnNvbWV0aGluZ1dlbnRXcm9uZ0Vycm9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdWNjZXNzSGFuZGxlcihcbiAgICAgICAgcmVzLFxuICAgICAgICAyMDAsXG4gICAgICAgIG1lc3NhZ2Uuc3VjY2Vzcy5nZXRVc2VyRGF0YVJldHJpdmVTdWNjZXNzRnVsbHksXG4gICAgICAgIHJlc3VsdCxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuaW5mbyhlcnIsICdlcnJvcicpO1xuICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci5zb21ldGhpbmdXZW50V3JvbmdFcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqVXBkYXRlIHBhdGllbnRkZXRhaWxzIGNvbnRyb2xsZXJcbiAgICogQGF1dGhvcjogIEpEOTg5ODxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAgICogQGRlc2NyaXB0aW9uOlVwZGF0ZSBQYXRpZW50IFByb2ZpbGUgZGV0YWlscyB1c2luZyBFbWFpbCxVcGRhdGUgdGhlIGRldGFpbHMgd2l0aCBQVVQgbWV0aG9kLlxuICAgKiBAcmV0dXJuOiB1cGRhdGVkIHJvdyB3aXRoIGRhdGEuXG4gICAqL1xuICBhc3luYyBQcm9maWxlVXBkYXRlKHJlcTogYW55LCByZXM6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGE6IFVwZGF0ZURhdGEgPSB7XG4gICAgICAgIG5hbWU6IHJlcS5ib2R5Lm5hbWUgfHwgJycsXG4gICAgICAgIHBob25lOiByZXEuYm9keS5waG9uZSB8fCAnJyxcbiAgICAgICAgdXNlcklkOiByZXEudXNlci5pZCB8fCAnJyxcbiAgICAgICAgcHJvZmlsZTogcmVxLmZpbGUgfHwgJycsXG4gICAgICB9O1xuICAgICAgaWYgKHJlcS5maWxlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEucHJvZmlsZS5taW1ldHlwZSk7XG4gICAgICAgIGlmICghZGF0YS5wcm9maWxlLm1pbWV0eXBlLnN0YXJ0c1dpdGgoJ2ltYWdlLycpKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci5maWxlSXNNaXNzaW5nRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFjY2Vzc0tleUlkID0gcHJvY2Vzcy5lbnYuUzNfQUNDRVNTX0tFWV9JRDtcbiAgICAgICAgY29uc3Qgc2VjcmV0QWNjZXNzS2V5ID0gcHJvY2Vzcy5lbnYuUzNfU0VDUkVUX0FDQ0VTU19LRVk7XG4gICAgICAgIGNvbnN0IGJ1Y2tldE5hbWUgPSBwcm9jZXNzLmVudi5BV1NfUzNfQlVDS0VUO1xuICAgICAgICBjb25zdCByZWdpb24gPSBwcm9jZXNzLmVudi5TM19SRUdJT047XG4gICAgICAgIGNvbnN0IGZvbGRlck5hbWUgPSBgJHtwcm9jZXNzLmVudi5BV1NfUzNfRk9MREVSfS9Qcm9maWxlc2A7XG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IGFueSA9IGF3YWl0IHVwbG9hZEZpbGUoXG4gICAgICAgICAgcmVxLmZpbGUsXG4gICAgICAgICAgYWNjZXNzS2V5SWQsXG4gICAgICAgICAgc2VjcmV0QWNjZXNzS2V5LFxuICAgICAgICAgIGJ1Y2tldE5hbWUsXG4gICAgICAgICAgZm9sZGVyTmFtZSxcbiAgICAgICAgICByZWdpb24sXG4gICAgICAgICk7XG4gICAgICAgIGxvZ2dlci5pbmZvKHJlc3VsdHMpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBVc2Vyc1NlcnZpY2UuUHJvZmlsZVVwZGF0ZVdpdGhJbWFnZShcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIHJlc3VsdHMuS2V5LFxuICAgICAgICApO1xuICAgICAgICBpZiAoIXJlc3VsdC5yb3dDb3VudCkge1xuICAgICAgICAgIHJldHVybiBlcnJvckhhbmRsZXIocmVzLCA0MDAsIG1lc3NhZ2UuZXJyb3Iuc29tZXRoaW5nV2VudFdyb25nRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWNjZXNzSGFuZGxlcihyZXMsIDIwMCwgbWVzc2FnZS5zdWNjZXNzLnVzZXJFZGl0U3VjY2Vzc0Z1bGx5KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFVzZXJzU2VydmljZS5Qcm9maWxlVXBkYXRlKGRhdGEpO1xuICAgICAgaWYgKCFyZXN1bHQucm93Q291bnQpIHtcbiAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci5zb21ldGhpbmdXZW50V3JvbmdFcnJvcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VjY2Vzc0hhbmRsZXIocmVzLCAyMDAsIG1lc3NhZ2Uuc3VjY2Vzcy51c2VyRWRpdFN1Y2Nlc3NGdWxseSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuaW5mbyhlcnIsICdlcnJvcicpO1xuICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcihyZXMsIDQwMCwgbWVzc2FnZS5lcnJvci5zb21ldGhpbmdXZW50V3JvbmdFcnJvcik7XG4gICAgfVxuICB9XG59XG4iLCIvKipwYXRpZW50ZGV0YWlscyByb3V0ZXJzXG4gKiBAYXV0aG9yOiAgSkQ5ODk4PGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICogQGRlc2NyaXB0aW9uOkFkZCBhbGwgcm91dGVycyBmb3IgUGF0aWVudCBQcm9maWxlIGRldGFpbHMgd2l0aCBzaG93IGZhbWlseSBtZW1iZXIgaXMgaGVyZS5cbiAqL1xuaW1wb3J0IG11bHRlciBmcm9tICdtdWx0ZXInO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuXG5pbXBvcnQgVXNlckNvbnRyb2xsZXIgZnJvbSAnLi91c2Vycy5jb250cm9sbGVyJztcblxuY29uc3QgdXNlckNvbnRyb2xsZXIgPSBuZXcgVXNlckNvbnRyb2xsZXIoKTtcbmNvbnN0IHN0b3JhZ2UgPSBtdWx0ZXIuZGlza1N0b3JhZ2Uoe1xuICBkZXN0aW5hdGlvbjogZnVuY3Rpb24gKHJlcSwgZmlsZSwgY2IpIHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoYCR7X19kaXJuYW1lfS8uLi8uLi8uLi8uLi91cGxvYWRzYCkpIHtcbiAgICAgIGZzLm1rZGlyU3luYyhgJHtfX2Rpcm5hbWV9Ly4uLy4uLy4uLy4uL3VwbG9hZHNgKTtcbiAgICB9XG4gICAgY2IobnVsbCwgJy4vdXBsb2FkcycpO1xuICB9LFxuICBmaWxlbmFtZTogZnVuY3Rpb24gKHJlcSwgZmlsZSwgY2IpIHtcbiAgICBjYihudWxsLCBmaWxlLm9yaWdpbmFsbmFtZSk7XG4gIH0sXG59KTtcbi8vIGNvbnN0IHVwbG9hZCA9IG11bHRlcih7IHN0b3JhZ2UgfSk7XG5cbmNvbnN0IHVwbG9hZGluZyA9IG11bHRlcih7XG4gIHN0b3JhZ2UsXG4gIGxpbWl0czogeyBmaWVsZFNpemU6IDMwICogMTAyNCAqIDEwMjQgfSxcbn0pLnNpbmdsZSgnZmlsZScpO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoeyBtZXJnZVBhcmFtczogdHJ1ZSB9KTtcbnJvdXRlci5yb3V0ZSgnL2RldGFpbCcpLnBvc3QodXNlckNvbnRyb2xsZXIuZGV0YWlsKTtcbnJvdXRlci5yb3V0ZSgnL3VwZGF0ZV9wcm9maWxlJykucHV0KHVwbG9hZGluZywgdXNlckNvbnRyb2xsZXIuUHJvZmlsZVVwZGF0ZSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsIi8qKiB1c2VyZGV0YWlscyBzZXJ2aWNlc1xuICogQGF1dGhvcjogIEpEOTg5ODxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbjp1c2VyIFByb2ZpbGUgZGV0YWlscyBzZXJ2aWNlcyBpcyBoZXJlLlxuICovXG5pbXBvcnQgeyBRdWVyeVR5cGVzIH0gZnJvbSAnc2VxdWVsaXplJztcbmltcG9ydCBjb25maWcsIHsgQ29uZmlnS2V5IH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZyc7XG5pbXBvcnQgeyBEQkNvbm5lY3Rpb24gfSBmcm9tICcuLi8uLi9kYi9kYi5jb25uZWN0aW9uJztcbmltcG9ydCBxdWVyaWVzIGZyb20gJy4uL2hlbHBlcnMvcXVlcnknO1xuaW1wb3J0IFVwZGF0ZURhdGEgZnJvbSAnLi4vYXBpLmRlZmluaXRpb25zJztcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uLy4uL2hlbHBlcnMvdXRpbHMvaW5kZXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2Vyc1NlcnZpY2Uge1xuICAvKipHZXQgdXNlcmRldGFpbHMgc2VydmljZXNcbiAgICogQGF1dGhvcjogIEpEOTg5ODxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAgICogQGRlc2NyaXB0aW9uOkdFVCB1c2VyIFByb2ZpbGUgZGV0YWlscyB1c2luZyBFbWFpbC5cbiAgICogQHJldHVybjogYWxsIHRoZSB1c2VycyBkZXRhaWxzIHlvdSBuZWVkLlxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGRldGFpbDxURGV0YWlsID0gYW55PihyZXE6IGFueSk6IFByb21pc2U8VERldGFpbD4ge1xuICAgIC8vIHNlbmQgcmVzcG9uc2UgZnJvbSBoZXJlXG4gICAgLy8gbG9nZ2VyLmluZm8oJ3JlcS51c2VyLmlkJywgcmVxLnVzZXIuaWQpO1xuICAgIGNvbnN0IGJ1Y2tldF9uYW1lID0gY29uZmlnLmdldDxzdHJpbmc+KENvbmZpZ0tleS5BV1NfUzNfQlVDS0VUKTtcbiAgICBjb25zdCBmb2xkZXJfbmFtZSA9IGNvbmZpZy5nZXQ8c3RyaW5nPihDb25maWdLZXkuQVdTX1MzX0ZPTERFUik7XG4gICAgY29uc3QgYmFzZV91cmwgPSBjb25maWcuZ2V0PHN0cmluZz4oQ29uZmlnS2V5LkFXU19CQVNFX1VSTCk7XG4gICAgY29uc3QgW3Jlc3VsdF06IGFueSA9IGF3YWl0IERCQ29ubmVjdGlvbi5leGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgICBxdWVyaWVzLnVzZXJRdWVyaWVzLmdldF91c2VyLFxuICAgICAgeyBpZDogcmVxLnVzZXIuaWQsIGJhc2VfdXJsLCBidWNrZXRfbmFtZSwgZm9sZGVyX25hbWUgfSxcbiAgICAgIFF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzdWx0WzBdO1xuICB9XG5cbiAgLyoqVXBkYXRlIHVzZXJkZXRhaWxzIGNvbnRyb2xsZXJcbiAgICogQGF1dGhvcjogIEpEOTg5ODxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAgICogQGRlc2NyaXB0aW9uOlVwZGF0ZSB1c2VyIFByb2ZpbGUgZGV0YWlscyB3aXRoIHVwZGF0ZSBxdWVyeS5cbiAgICogQHJldHVybjogdXBkYXRlZCByb3cgd2l0aCBkYXRhLlxuICAgKi9cbiAgc3RhdGljIGFzeW5jIFByb2ZpbGVVcGRhdGVXaXRoSW1hZ2U8VERldGFpbCA9IFVwZGF0ZURhdGE+KFxuICAgIGRhdGE6IFVwZGF0ZURhdGEsXG4gICAgcHJvZmlsZTogYW55LFxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIHNlbmQgcmVzcG9uc2UgZnJvbSBoZXJlXG4gICAgY29uc3QgdXBkYXRlOiBhbnkgPSBhd2FpdCBEQkNvbm5lY3Rpb24uZXhlY3V0ZVNhbXBsZVF1ZXJ5KFxuICAgICAgcXVlcmllcy51c2VyUXVlcmllcy51cGRhdGVfdXNlcl93aXRoX2ltYWdlLFxuICAgICAge1xuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgIHBob25lOiBkYXRhLnBob25lLFxuICAgICAgICB1c2VySWQ6IGRhdGEudXNlcklkLFxuICAgICAgICBwcm9maWxlOiBwcm9maWxlLFxuICAgICAgfSxcbiAgICAgIFF1ZXJ5VHlwZXMuVVBEQVRFLFxuICAgICk7XG4gICAgcmV0dXJuIHVwZGF0ZVsxXTtcbiAgfVxuICBzdGF0aWMgYXN5bmMgUHJvZmlsZVVwZGF0ZTxURGV0YWlsID0gVXBkYXRlRGF0YT4oXG4gICAgZGF0YTogVXBkYXRlRGF0YSxcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBzZW5kIHJlc3BvbnNlIGZyb20gaGVyZVxuICAgIGNvbnN0IHVwZGF0ZTogYW55ID0gYXdhaXQgREJDb25uZWN0aW9uLmV4ZWN1dGVTYW1wbGVRdWVyeShcbiAgICAgIHF1ZXJpZXMudXNlclF1ZXJpZXMudXBkYXRlX3VzZXIsXG4gICAgICB7XG4gICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgcGhvbmU6IGRhdGEucGhvbmUsXG4gICAgICAgIHVzZXJJZDogZGF0YS51c2VySWQsXG4gICAgICB9LFxuICAgICAgUXVlcnlUeXBlcy5VUERBVEUsXG4gICAgKTtcbiAgICByZXR1cm4gdXBkYXRlWzFdO1xuICB9XG59XG4iLCJpbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5cbmRvdGVudi5jb25maWcoKTtcblxuZXhwb3J0IGVudW0gQ29uZmlnS2V5IHtcbiAgUE9SVCA9ICdQT1JUJyxcbiAgREJfU0FNUExFX1VSTCA9ICdEQl9TQU1QTEVfVVJMJyxcbiAgTk9ERV9FTlYgPSAnTk9ERV9FTlYnLFxuICBBUElfU0VDUkVUID0gJ0FQSV9TRUNSRVQnLFxuICBTRU5ER1JJRF9BUElfS0VZID0gJ1NFTkRHUklEX0FQSV9LRVknLFxuICBTRU5ER1JJRF9SRVNFVF9QQVNTV09SRF9URU1QTEFURV9JRCA9ICdTRU5ER1JJRF9SRVNFVF9QQVNTV09SRF9URU1QTEFURV9JRCcsXG4gIEFQUF9NQUlOX0NPTlRBQ1RfSU5GT19OQU1FID0gJ0FQUF9NQUlOX0NPTlRBQ1RfSU5GT19OQU1FJyxcbiAgQVBQX01BSU5fQ09OVEFDVF9JTkZPX0VNQUlMID0gJ0FQUF9NQUlOX0NPTlRBQ1RfSU5GT19FTUFJTCcsXG4gIFNFTlRSWV9EU04gPSAnU0VOVFJZX0RTTicsXG4gIFMzX0FDQ0VTU19LRVlfSUQgPSAnUzNfQUNDRVNTX0tFWV9JRCcsXG4gIFMzX1NFQ1JFVF9BQ0NFU1NfS0VZID0gJ1MzX1NFQ1JFVF9BQ0NFU1NfS0VZJyxcbiAgUzNfUkVHSU9OID0gJ1MzX1JFR0lPTicsXG4gIFMzX0FDTCA9ICdTM19BQ0wnLFxuICBBV1NfUzNfQlVDS0VUID0gJ0FXU19TM19CVUNLRVQnLFxuICBBV1NfUzNfRk9MREVSID0gJ0FXU19TM19GT0xERVInLFxuICBBV1NfQkFTRV9VUkwgPSAnQVdTX0JBU0VfVVJMJyxcbn1cblxuY2xhc3MgQ29uZmlnIHtcbiAgcHJpdmF0ZSBjb25maWdNYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubG9hZEVudigpO1xuICB9XG5cbiAgZ2V0PFQgPSBhbnk+KGtleTogQ29uZmlnS2V5KTogVCB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnTWFwLmdldChrZXkpO1xuICB9XG5cbiAgaXNQcm9kKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldChDb25maWdLZXkuTk9ERV9FTlYpID09PSAncHJvZHVjdGlvbic7XG4gIH1cblxuICBpc1N0YWdpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KENvbmZpZ0tleS5OT0RFX0VOVikgPT09ICdzdGFnaW5nJztcbiAgfVxuXG4gIGlzRGV2KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc1Byb2QoKSAmJiAhdGhpcy5pc1N0YWdpbmcoKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZEVudigpIHtcbiAgICBPYmplY3Qua2V5cyhwcm9jZXNzLmVudikuZm9yRWFjaCgoa2V5KSA9PlxuICAgICAgdGhpcy5jb25maWdNYXAuc2V0KGtleSwgcHJvY2Vzcy5lbnZba2V5XSksXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQ29uZmlnKCk7XG4iLCJpbXBvcnQge1xuICBCaW5kT3JSZXBsYWNlbWVudHMsXG4gIFF1ZXJ5VHlwZXMsXG4gIFNlcXVlbGl6ZSxcbiAgU3luY09wdGlvbnMsXG4gIFRyYW5zYWN0aW9uLFxufSBmcm9tICdzZXF1ZWxpemUnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vaGVscGVycy91dGlscy9pbmRleCc7XG5pbXBvcnQgeyBDb25zb2xlQ29sb3IsIGxvZ0NvbG9yIH0gZnJvbSAnLi4vaGVscGVycy9jb25zb2xlLm92ZXJyaWRlcyc7XG5pbXBvcnQgeyBEQl9TQU1QTEVfVVJMIH0gZnJvbSAnLi9kYi5jb25zdGFudHMnO1xuXG5leHBvcnQgY2xhc3MgREJDb25uZWN0aW9uIHtcbiAgc3RhdGljIHNhbXBsZSA9IG5ldyBTZXF1ZWxpemUoREJfU0FNUExFX1VSTCwgeyBsb2dnaW5nOiB0cnVlIH0pO1xuXG4gIHByaXZhdGUgc3RhdGljIF9zeW5jT3B0aW9uczogU3luY09wdGlvbnM7XG5cbiAgc3RhdGljIGFzeW5jIGluaXQoc3luY09wdGlvbnM/OiBTeW5jT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX3N5bmNPcHRpb25zID0gc3luY09wdGlvbnM7XG4gICAgYXdhaXQgdGhpcy50ZXN0Q29ubmVjdGlvbigpO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIHNhbXBsZV9zeW5jKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLl9zeW5jT3B0aW9ucykge1xuICAgICAgbG9nZ2VyLmluZm8oJ1N5bmMgZGIuLi4nKTtcbiAgICAgIGF3YWl0IHRoaXMuc2FtcGxlLnN5bmMoeyBsb2dnaW5nOiB0cnVlLCAuLi50aGlzLl9zeW5jT3B0aW9ucyB9KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgdGVzdENvbm5lY3Rpb24oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5zYW1wbGVDb25uZWN0KCk7XG4gICAgbG9nQ29sb3IoQ29uc29sZUNvbG9yLkZnQmx1ZSwgJ0Nvbm5lY3Rpb24gaXMgT0snKTtcbiAgfVxuXG4gIHN0YXRpYyBuZXdUcmFuc2FjdGlvbigpOiBQcm9taXNlPFRyYW5zYWN0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuc2FtcGxlLnRyYW5zYWN0aW9uKCk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgcnVuSW5UcmFuc2FjdGlvbjxUID0gYW55PihcbiAgICBhY3Rpb246ICh0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24pID0+IFByb21pc2U8VD4sXG4gICAgZXhpc3RpbmdUcmFuc2FjdGlvbj86IFRyYW5zYWN0aW9uLFxuICApOiBQcm9taXNlPFQ+IHtcbiAgICBpZiAoZXhpc3RpbmdUcmFuc2FjdGlvbikgcmV0dXJuIGFjdGlvbihleGlzdGluZ1RyYW5zYWN0aW9uKTtcbiAgICBjb25zdCB0cmFuc2FjdGlvbiA9IGF3YWl0IHRoaXMubmV3VHJhbnNhY3Rpb24oKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKGFjdGlvbih0cmFuc2FjdGlvbikpO1xuICAgICAgYXdhaXQgdHJhbnNhY3Rpb24uY29tbWl0KCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgYXdhaXQgdHJhbnNhY3Rpb24ucm9sbGJhY2soKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBzYW1wbGVDb25uZWN0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZ2dlci5pbmZvKCdJbml0IFBkYi4uLicpO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnNhbXBsZS5tb2RlbE1hbmFnZXIuYWxsLmZvckVhY2goKG1vZGVsQ29uc3RydWN0b3I6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBtb2RlbCA9IG5ldyBtb2RlbENvbnN0cnVjdG9yKCk7XG4gICAgICAgIGlmICghbW9kZWwuYXNzb2NpYXRlKSByZXR1cm47XG4gICAgICAgIG1vZGVsLmFzc29jaWF0ZSh0aGlzLnNhbXBsZS5tb2RlbHMpO1xuICAgICAgfSk7XG4gICAgICBhd2FpdCB0aGlzLnNhbXBsZV9zeW5jKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIuaW5mbygnQ29ubmVjdGlvbiBlcnJvcjonLCBlcnIpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBleGVjdXRlU2FtcGxlUXVlcnkoXG4gICAgcXVlcnk6IHN0cmluZyxcbiAgICByZXBsYWNlbWVudHM6IEJpbmRPclJlcGxhY2VtZW50cyxcbiAgICBhY3Rpb24gPSAnc2VsZWN0JyxcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgW3Jlc3VsdHMsIG1ldGFkYXRhXSA9IGF3YWl0IHRoaXMuc2FtcGxlLnF1ZXJ5KHF1ZXJ5LCB7XG4gICAgICAgIHJlcGxhY2VtZW50cyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFtyZXN1bHRzLCBtZXRhZGF0YV07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IGNvbmZpZywgeyBDb25maWdLZXkgfSBmcm9tICcuLi9jb25maWcvY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IERCX1NBTVBMRV9VUkwgPSBjb25maWcuZ2V0PHN0cmluZz4oQ29uZmlnS2V5LkRCX1NBTVBMRV9VUkwpO1xuIiwiaW1wb3J0IG1pbmltaXN0IGZyb20gJ21pbmltaXN0JztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnL2NvbmZpZyc7XG5pbXBvcnQgeyBEQkNvbm5lY3Rpb24gfSBmcm9tICcuLi9kYi9kYi5jb25uZWN0aW9uJztcbmltcG9ydCAnLi9jb25zb2xlLm92ZXJyaWRlcyc7XG5pbXBvcnQgU2VudHJ5SGVscGVyIGZyb20gJy4vc2VudHJ5LmhlbHBlcic7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL3V0aWxzL2luZGV4JztcblxuZXhwb3J0IGludGVyZmFjZSBBcHAge1xuICBzZXR1cD8oKTogUHJvbWlzZTxhbnk+IHwgYW55O1xuICBpbml0PygpOiBQcm9taXNlPGFueT4gfCBhbnk7XG4gIG9uRXhpdD8oKTogUHJvbWlzZTxhbnk+IHwgYW55O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBwIHtcbiAgYXJncyA9IG1pbmltaXN0KHByb2Nlc3MuYXJndi5zbGljZSgyKSk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGluaXREQiA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMub25FeGl0KSBwcm9jZXNzLm9uKCdleGl0JywgdGhpcy5vbkV4aXQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgcnVuKGFwcE9yQ2xhc3M6IEFwcCB8IChuZXcgKCkgPT4gQXBwKSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBhcHA6IEFwcDtcbiAgICBpZiAoYXBwT3JDbGFzcyBpbnN0YW5jZW9mIEFwcCkge1xuICAgICAgYXBwID0gYXBwT3JDbGFzcztcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwID0gbmV3IGFwcE9yQ2xhc3MoKTtcbiAgICB9XG4gICAgYXdhaXQgQXBwLnNldHVwKGFwcCk7XG4gICAgaWYgKGFwcC5pbml0KSBhd2FpdCBhcHAuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgc2V0dXAoYXBwOiBBcHApIHtcbiAgICBTZW50cnlIZWxwZXIuaW5pdCgpO1xuICAgIGlmIChhcHAuaW5pdERCKSBhd2FpdCBEQkNvbm5lY3Rpb24uaW5pdCgpO1xuICAgIHByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgKGVycikgPT4gYXBwLmV4aXQoZXJyKSk7XG4gICAgcHJvY2Vzcy5vbignU0lHSU5UJywgKCkgPT4gYXBwLmV4aXQoKSk7XG4gICAgcHJvY2Vzcy5vbignU0lHUVVJVCcsICgpID0+IGFwcC5leGl0KCkpO1xuICAgIHByb2Nlc3Mub24oJ1NJR1RFUk0nLCAoKSA9PiBhcHAuZXhpdCgpKTtcbiAgICBpZiAoYXBwLnNldHVwKSBhd2FpdCBhcHAuc2V0dXAoKTtcbiAgfVxuXG4gIGFzeW5jIGV4aXQoZXJyPzogRXJyb3IpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBpZiAoY29uZmlnLmlzUHJvZCgpKSB7XG4gICAgICAgIFNlbnRyeUhlbHBlci5sb2dFcnJvcihlcnIpO1xuICAgICAgICBhd2FpdCBTZW50cnlIZWxwZXIuU2VudHJ5LmZsdXNoKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnZXIuaW5mbyhlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgICBwcm9jZXNzLmV4aXQoZXJyID8gMSA6IDApO1xuICB9XG59XG4iLCJpbXBvcnQgdXRpbCBmcm9tICd1dGlsJztcblxuZXhwb3J0IGVudW0gQ29uc29sZUNvbG9yIHtcbiAgUmVzZXQgPSAnXFx4MWJbMG0nLFxuICBCcmlnaHQgPSAnXFx4MWJbMW0nLFxuICBEaW0gPSAnXFx4MWJbMm0nLFxuICBVbmRlcnNjb3JlID0gJ1xceDFiWzRtJyxcbiAgQmxpbmsgPSAnXFx4MWJbNW0nLFxuICBSZXZlcnNlID0gJ1xceDFiWzdtJyxcbiAgSGlkZGVuID0gJ1xceDFiWzhtJyxcbiAgRmdCbGFjayA9ICdcXHgxYlszMG0nLFxuICBGZ1JlZCA9ICdcXHgxYlszMW0nLFxuICBGZ0dyZWVuID0gJ1xceDFiWzMybScsXG4gIEZnWWVsbG93ID0gJ1xceDFiWzMzbScsXG4gIEZnQmx1ZSA9ICdcXHgxYlszNG0nLFxuICBGZ01hZ2VudGEgPSAnXFx4MWJbMzVtJyxcbiAgRmdDeWFuID0gJ1xceDFiWzM2bScsXG4gIEZnV2hpdGUgPSAnXFx4MWJbMzdtJyxcbiAgQmdCbGFjayA9ICdcXHgxYls0MG0nLFxuICBCZ1JlZCA9ICdcXHgxYls0MW0nLFxuICBCZ0dyZWVuID0gJ1xceDFiWzQybScsXG4gIEJnWWVsbG93ID0gJ1xceDFiWzQzbScsXG4gIEJnQmx1ZSA9ICdcXHgxYls0NG0nLFxuICBCZ01hZ2VudGEgPSAnXFx4MWJbNDVtJyxcbiAgQmdDeWFuID0gJ1xceDFiWzQ2bScsXG4gIEJnV2hpdGUgPSAnXFx4MWJbNDdtJyxcbn1cblxuLy8gb3ZlcnJpZGUgbG9nL2Vycm9yIGZvciBkZXYgcHVycG9zZXNcbmNvbnN0IGNvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcblxuY29uc29sZS5sb2cgPSAoLi4uYXJnczogYW55W10pID0+XG4gIGNvbnNvbGVMb2coXG4gICAgLi4uW1xuICAgICAgYFske25ldyBEYXRlKCkudG9VVENTdHJpbmcoKX1dOmAsIC8vIGFkZHMgdGltZXN0YW1wXG4gICAgICAuLi5hcmdzLFxuICAgIF0sXG4gICk7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dDb2xvcihjb2xvcjogQ29uc29sZUNvbG9yLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICBjb25zb2xlLmxvZyhjb2xvciwgLi4uYXJncywgQ29uc29sZUNvbG9yLlJlc2V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ0luc3BlY3QoLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgY29uc29sZS5sb2coXG4gICAgLi4uYXJncy5tYXAoKGxvZykgPT4gdXRpbC5pbnNwZWN0KGxvZywgeyBkZXB0aDogbnVsbCwgY29sb3JzOiB0cnVlIH0pKSxcbiAgKTtcbn1cbiIsInJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBlcnJvckhhbmRsZXIgZnJvbSAnLi4vLi4vbGFuZy9oYW5kbGVycy9lcnJvcic7XG5pbXBvcnQgbWVzc2FnZSBmcm9tICcuLi8uLi9sYW5nL21lc3NhZ2UnO1xuaW1wb3J0IFMzIGZyb20gJ2F3cy1zZGsvY2xpZW50cy9zMyc7XG5cbmZ1bmN0aW9uIHVwbG9hZEZpbGUoXG4gIGZpbGU6IGFueSxcbiAgYWNjZXNzS2V5SWQ6IHN0cmluZyxcbiAgc2VjcmV0QWNjZXNzS2V5OiBzdHJpbmcsXG4gIGJ1Y2tldE5hbWU6IHN0cmluZyxcbiAgZm9sZGVyTmFtZTogc3RyaW5nLFxuICByZWdpb246IHN0cmluZyxcbikge1xuICBjb25zdCBmaWxlU3RyZWFtOiBhbnkgPSBmcy5jcmVhdGVSZWFkU3RyZWFtKFxuICAgIF9fZGlybmFtZSArIGAvLi4vdXBsb2Fkcy8ke2ZpbGUuZmlsZW5hbWV9YCxcbiAgKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBzMzogYW55ID0gbmV3IFMzKHtcbiAgICAgIGFjY2Vzc0tleUlkLFxuICAgICAgc2VjcmV0QWNjZXNzS2V5LFxuICAgICAgcmVnaW9uLFxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKGZpbGUpO1xuICAgIGNvbnN0IHVwbG9hZFBhcmFtczogYW55ID0ge1xuICAgICAgQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgQm9keTogZmlsZVN0cmVhbSxcbiAgICAgIEtleTogZm9sZGVyTmFtZSArICcvJyArIGZpbGUuZmlsZW5hbWUsXG4gICAgfTtcblxuICAgIHJldHVybiBzMy51cGxvYWQodXBsb2FkUGFyYW1zKS5wcm9taXNlKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBlcnJvckhhbmRsZXIoZmlsZS5wYXRoLCA0MDQsIG1lc3NhZ2UuZXJyb3IuZmlsZU5vdEZvdW5kRXJyb3IpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCB1cGxvYWRGaWxlO1xuIiwiaW1wb3J0IG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5sb2dnZXIuc3RyZWFtID0ge1xuICB3cml0ZTogKG1lc3NhZ2U6IGFueSkgPT5cbiAgICBsb2dnZXIuaW5mbyhtZXNzYWdlLnN1YnN0cmluZygwLCBtZXNzYWdlLmxhc3RJbmRleE9mKCdcXG4nKSkpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbW9yZ2FuKFxuICAnOm1ldGhvZCA6dXJsIDpzdGF0dXMgOnJlc3BvbnNlLXRpbWUgbXMgLSA6cmVzW2NvbnRlbnQtbGVuZ3RoXScsXG4gIHsgc3RyZWFtOiBsb2dnZXIuc3RyZWFtIH0sXG4pO1xuIiwiaW1wb3J0IGh0dHBMb2dnZXIgZnJvbSAnLi9odHRwTG9nZ2VyJztcbmV4cG9ydCBkZWZhdWx0IGh0dHBMb2dnZXI7XG4iLCJpbXBvcnQgKiBhcyBTZW50cnkgZnJvbSAnQHNlbnRyeS9ub2RlJztcbmltcG9ydCB7IENhcHR1cmVDb250ZXh0IH0gZnJvbSAnQHNlbnRyeS90eXBlcyc7XG5pbXBvcnQgY29uZmlnLCB7IENvbmZpZ0tleSB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZW50cnlIZWxwZXIge1xuICBzdGF0aWMgU2VudHJ5ID0gU2VudHJ5O1xuXG4gIHN0YXRpYyBpbml0KCk6IHZvaWQge1xuICAgIFNlbnRyeS5pbml0KHsgZHNuOiBjb25maWcuZ2V0KENvbmZpZ0tleS5TRU5UUllfRFNOKSB9KTtcbiAgfVxuXG4gIHN0YXRpYyBsb2dNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZywgY2FwdHVyZUNvbnRleHQ/OiBDYXB0dXJlQ29udGV4dCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFNlbnRyeS5jYXB0dXJlTWVzc2FnZShtZXNzYWdlLCBjYXB0dXJlQ29udGV4dCk7XG4gIH1cblxuICBzdGF0aWMgbG9nRXJyb3IoZXJyOiBFcnJvciwgY2FwdHVyZUNvbnRleHQ/OiBDYXB0dXJlQ29udGV4dCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFNlbnRyeS5jYXB0dXJlRXhjZXB0aW9uKGVyciwgY2FwdHVyZUNvbnRleHQpO1xuICB9XG59XG4iLCJpbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxvZ2dlcixcbn07XG5leHBvcnQgeyBsb2dnZXIgfTtcbiIsImltcG9ydCB7IGNyZWF0ZUxvZ2dlciwgdHJhbnNwb3J0cywgZm9ybWF0IH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgRGFpbHlSb3RhdGVGaWxlIGZyb20gJ3dpbnN0b24tZGFpbHktcm90YXRlLWZpbGUnO1xuY29uc3QgdHJhbnNwb3J0OiBhbnkgPSBuZXcgRGFpbHlSb3RhdGVGaWxlKHtcbiAgZmlsZW5hbWU6ICcuL2xvZ3MvYWxsLWxvZ3MtJURBVEUlLmxvZycsXG4gIGRhdGVQYXR0ZXJuOiAnWVlZWS1NTS1ERCcsXG4gIGpzb246IGZhbHNlLFxuICB6aXBwZWRBcmNoaXZlOiB0cnVlLFxuICBtYXhTaXplOiA1MjQyODgwLFxuICBtYXhGaWxlczogNSxcbn0pO1xuY29uc3QgbG9nZ2VyOiBhbnkgPSBjcmVhdGVMb2dnZXIoe1xuICBmb3JtYXQ6IGZvcm1hdC5jb21iaW5lKFxuICAgIGZvcm1hdC50aW1lc3RhbXAoeyBmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzOm1zJyB9KSxcbiAgICBmb3JtYXQucHJpbnRmKChpbmZvOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiBgJHtpbmZvLnRpbWVzdGFtcH0gJHtpbmZvLmxldmVsfTogJHtpbmZvLm1lc3NhZ2V9YDtcbiAgICB9KSxcbiAgKSxcbiAgdHJhbnNwb3J0czogW3RyYW5zcG9ydF0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuIiwiaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IGFyck1lc3NhZ2UsIG9ialJlc3BvbnNlVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3R5cGVzLmVycm9yJztcblxuY29uc3QgZXJyb3JIYW5kbGVyID0gKHJlczogUmVzcG9uc2UsIGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGVyck1lc3NhZ2U6IGFyck1lc3NhZ2UgPSB7XG4gICAgdGl0bGU6ICdFcnJvcicsXG4gICAgbWVzc2FnZSxcbiAgfTtcbiAgY29uc3Qgb2JqUmVzcG9uc2U6IG9ialJlc3BvbnNlVHlwZSA9IHtcbiAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICBlcnJvcjogZXJyTWVzc2FnZSxcbiAgfTtcbiAgcmV0dXJuIHJlcy5zdGF0dXMoY29kZSkuc2VuZChvYmpSZXNwb25zZSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBlcnJvckhhbmRsZXI7XG4iLCJpbXBvcnQgeyBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgb2JqUmVzcG9uc2VUeXBlLCBkYXRhdHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3R5cGVzLnN1Y2Nlc3MnO1xuXG5jb25zdCBzdWNjZXNzSGFuZGxlciA9IChcbiAgcmVzOiBSZXNwb25zZSxcbiAgY29kZTogbnVtYmVyLFxuICBtZXNzYWdlOiBzdHJpbmcsXG4gIGRhdGE/OiBkYXRhdHlwZSxcbikgPT4ge1xuICBjb25zdCBvYmpSZXNwb25zZTogb2JqUmVzcG9uc2VUeXBlID0ge1xuICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgbWVzc2FnZSxcbiAgICBkYXRhLFxuICB9O1xuXG4gIHJldHVybiByZXMuc3RhdHVzKGNvZGUpLnNlbmQob2JqUmVzcG9uc2UpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc3VjY2Vzc0hhbmRsZXI7XG4iLCJjb25zdCBzdWNjZXNzID0ge1xuICBnZXRQYXRpZW50RGV0YWlsUmV0cml2ZVN1Y2Nlc3NGdWxseTpcbiAgICAnUGF0aWVudCBkZXRhaWxzIHJldHJpZXZlZCBzdWNjZXNzZnVsbHkuJyxcbiAgZ2V0VXNlckRhdGFSZXRyaXZlU3VjY2Vzc0Z1bGx5OiAnVXNlciBkYXRhIHJldHJpZXZlZCBzdWNjZXNzZnVsbHkuJyxcbiAgc2lnbkluU3VjY2Vzc0Z1bGx5OiAnVXNlciBsb2dpbiBzdWNjZXNzZnVsbHkuJyxcbiAgc2lnblVwU3VjY2Vzc0Z1bGx5OiAnVXNlciByZWdpc3RlciBzdWNjZXNzZnVsbHkuJyxcbiAgQ2xpZW50QWRkU3VjY2Vzc0Z1bGx5OiAnQ2xpZW50IEFkZCBzdWNjZXNzZnVsbHkuJyxcbiAgdmlld1Byb2ZpbGVTdWNjZXNzRnVsbHk6ICdVc2VyIHByb2ZpbGUgZGV0YWlsIHJldHJpZXZlZCBzdWNjZXNzZXNmdWxseS4nLFxuICBvdHBWZXJpZnlTdWNjZXNzRnVsbHk6ICdPVFAgdmVyaWZ5IHN1Y2Nlc3Nlc2Z1bGx5LicsXG4gIExpbmtWZXJpZnlTdWNjZXNzRnVsbHk6ICdMaW5rIHZlcmlmeSBzdWNjZXNzZXNmdWxseS4nLFxuICB1c2VyRWRpdFN1Y2Nlc3NGdWxseTogJ1Byb2ZpbGUgdXBkYXRlIHN1Y2Nlc3NmdWxseS4nLFxuICBkb2NVcGxvYWRTdWNjZXNzRnVsbHk6ICdEb2N1bWVudCB1cGxvYWQgc3VjY2Vzc2Z1bGx5LicsXG4gIGRvY0RlbGV0ZVN1Y2Nlc3NGdWxseTogJ0RvY3VtZW50IGRlbGV0ZSBzdWNjZXNzZnVsbHkuJyxcbiAgdXNlckRlbGV0U3VjY2Vzc0Z1bGx5OiAnVXNlciBEZWxldGVkIHN1Y2Nlc3Nlc2Z1bGx5LicsXG4gIGdldFBhc3N3b3JkUmVzZXRTdWNjZXNzZnVsbHk6ICdQYXNzd29yZCByZXNldCBzdWNjZXNzZnVsbHkuJyxcbiAgZm9yZ2V0UGFzc3dvcmRTdWNjZXNzZnVsbHk6XG4gICAgJ0VtYWlsIHNlbnQgdG8gdGhpcyBFbWFpbCBhZHJlc3MgZm9yIHJlc2V0IFBhc3N3b3JkLicsXG4gIHJlbGF0aW9uRGF0YVN1Y2Nlc3NmdWxseTogJ1JlbGF0aW9uIHR5cGVzIHJldHJpdmVkJyxcbiAgcmVsYXRpb25VcGRhdGVTdWNjZXNzZnVsbHk6XG4gICAgJ1JlbGF0aW9uIHdpdGggZmFtaWx5IG1lbWJlciBpcyB1cGRhdGVkIHN1Y2Nlc3NmdWxseScsXG4gIGZhbWlseUxpbmtTdWNjZXNzZnVsbHk6ICdGYW1pbHkgbWVtYmVyIGxpbmsgc3VjY2Vzc2Z1bGwnLFxuICBmYW1pbHltZW1iZXJTdWNjZXNzZnVsbHk6ICdGYW1pbHkgbWVtYmVyIGZpbmQgc3VjY2Vzc2Z1bGwnLFxuICBzaG93RmFtaWx5OiAnU2hvdyBQYXRpZW50IGZhbWlseSBtZW1iZXIgU3VjY2Vzc2Z1bGx5LicsXG4gIHNlbmRNYWlsOiAnTWFpbCBzZW5kIFN1Y2Nlc3NmdWxseS4nLFxuICByZXNlbmRNYWlsOiAnUGxlYXNlIGNoZWNrIHlvdXIgTWFpbCBmb3IgcmVzZW5kIE9UUCBTdWNjZXNzZnVsbHkuJyxcbn07XG5cbmNvbnN0IGVycm9yID0ge1xuICBzb21ldGhpbmdXZW50V3JvbmdFcnJvcjogJ09vcHMhIFNvbWV0aGluZyB3ZW50IHdyb25nLCBQbGVhc2UgdHJ5IGFnYWluLicsXG4gIGZpbGVJc01pc3NpbmdFcnJvcjogJ0ZpbGUgaXMgbWlzc2luZyEnLFxuICBpbWFnZU5vdFByb3BlcjogJ1BsZWFzZSBwcm92aWRlIHByb3BlciBpbWFnZS4nLFxuICByZWxhdGlvbk5vdEZvdW5kRXJyb3I6ICdSZWxhdGlvbnMgbm90IGZpbmQhIScsXG4gIGZhbWlseU1lbWJlckxpbmtlZEFscmVhZHk6ICdGYW1pbHkgbWVtYmVyIGlzIGxpbmtlZCBhbHJlYWR5JyxcbiAgZmFtaWx5TGlua0Vycm9yOiAnRmFtaWx5IG1lbWJlciBpcyBub3QgbGlua2VkIScsXG4gIHJlbGF0aW9uVXBkYXRlRXJyb3I6ICdSZWxhdGlvbiB3aXRoIGZhbWlseSBtZW1iZXIgaXMgbm90IHVwZGF0ZWQuJyxcbiAgbWVtYmVyTm90Rm91bmRFcnJvcjogJ0ZhbWlseSBtZW1iZXIgaXMgbm90IGZvdW5kJyxcbiAgcmVsYXRpb25GYW1pbHlOb3RGb3VuZEVycm9yOiAnUmVsYXRpb24gd2l0aCBmYW1pbHkgbWVtYmVyIGlzIG5vdCBmb3VuZCcsXG4gIGZpbGVOb3RGb3VuZEVycm9yOiAnRmlsZSBub3QgZm91bmQhJyxcbiAgb3RwTm90Rm91bmQ6ICdQbGVhc2UgRW50ZXIgdGhlIE9UUC4nLFxuICBVcmxOb3RGb3VuZDogJ1BsZWFzZSBFbnRlciB0aGUgVVJMLicsXG4gIGJvZHlNaXNzaW5nRXJyb3I6ICdCb2R5IGlzIG1pc3NpbmcsIHBsZWFzZSBlbnRlciB2YWx1ZXMnLFxuICBvdHBOb3RWZXJpZnk6ICdZb3VyIEVudGVyZWQgT1RQIGlzIG5vdCB2ZXJmaXkuJyxcbiAgdW5hdXRob3JpemVkRXJyb3I6ICdZb3UgYXJlIG5vdCBhdXRob3JpemVkJyxcbiAgc2lnbnVwRXJyb3I6XG4gICAgJ1JlZ2lzdHJhdGlvbiB3YXMgZmFpbGVkIGR1ZSB0byBhIHRlY2huaWNhbCBpc3N1ZSwgUGxlYXNlIHRyeSBhZ2FpbiBhZnRlciBzb21lIHRpbWUuJyxcbiAgbm90UmVnaXN0ZXJlZEVycm9yOlxuICAgICdZb3UgYXJlIG5vdCByZWdpc3RlcmVkIHVzZXIuIFBsZWFzZSByZWdpc3RlciB5b3Vyc2VsZiB0byBhY2Nlc3MuJyxcbiAgd3JvbmdQYXNzd29yZEVycm9yOlxuICAgICdUaGUgcGFzc3dvcmQgeW91IGhhdmUgZW50ZXJlZCB3YXMgd3JvbmcuIFBsZWFzZSB0cnkgd2l0aCBjb3JyZWN0IHBhc3N3b3JkLicsXG4gIHdyb25nT3RwRXJyb3I6XG4gICAgJ1RoZSBPVFAgeW91IGhhdmUgZW50ZXJlZCB3YXMgd3JvbmcuIFBsZWFzZSB0cnkgd2l0aCBjb3JyZWN0IE9UUC4nLFxuICB3cm9uZ1VybEVycm9yOlxuICAgICdUaGUgVVJMIHlvdSBoYXZlIGVudGVyZWQgd2FzIHdyb25nLiBQbGVhc2UgdHJ5IHdpdGggY29ycmVjdCBVUkwuJyxcbiAgbmV3UGFzc3dvcmRFbXB0eTogJ05ldyBQYXNzd29yZCBjYW4gbm90IGJlIGVtcHR5LicsXG4gIGFscmVhZHlFeGlzdHNFcnJvcjpcbiAgICAnVGhlIG1haWwgeW91IGhhdmUgZW50ZXJlZCB3YXMgYWxyZWFkeSBSZWdpc3RlcmVkLiBQbGVhc2UgdHJ5IGFub3RoZXIgbWFpbCBpZC4nLFxuICB1c2VybmFtZWFscmVhZHlFeGlzdHNFcnJvcjpcbiAgICAnVGhlIHVzZXJuYW1lIHlvdSBoYXZlIGVudGVyZWQgd2FzIGFscmVhZHkgUmVnaXN0ZXJlZC4gUGxlYXNlIHRyeSBhbm90aGVyIHVzZXJuYW1lLicsXG4gIHBhc3N3b3JkQ2Fubm90QmVTYW1lRXJyb3I6XG4gICAgJ1lvdSBjYW4gbm90IHNldCBuZXcgcGFzc3dvcmQgc2FtZSBhcyBvbGQgcGFzc3dvcmQuJyxcbiAgcGFzc3dvcmROb3RGb3VuZEVycm9yOlxuICAgICdZb3UgY2FuIG5vdCBzZXQgbmV3IHBhc3N3b3JkIFBsZWFzZSBzZXQgeW91ciBQYXNzd29yZC4nLFxuICBlbWFpbE5vdEZvdW5kRXJyb3I6XG4gICAgJ1VzZXIgZG9lcyBub3QgZXhpc3RzIHdpdGggdGhpcyBlbWFpbCEgUGxlYXNlIGVudGVyIHZhbGlkIEVtYWlsJyxcbiAgdXVpZE5vdEZvdW5kRXJyb3I6ICdZb3VyIFVVSUQgbm90IGZvdW5kJyxcbiAgZW1haWxSZXF1aXJlZEVycm9yOiAnRW1haWwgaXMgUmVxdWlyZWQnLFxuICB0b2tlbk5vdEZvdW5kOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIFBsZWFzZSB0cnkgYWZ0ZXIgc29tZSB0aW1lLicsXG4gIGludmFsaWRBdXRob3JpemF0aW9uVG9rZW46ICdJbnZhbGlkIEF1dGhvcml6YXRpb24gVG9rZW4nLFxuICB1bmF1dGhvcml6ZWRhY2Nlc3M6ICdZb3UgZG8gbm90IGhhdmUgYW55IGF1dGhvcml6YXRpb24gdG8gYWNjZXNzIHRoaXMgZmlsZScsXG4gIHRva2VuSXNSZXF1aXJlZDogJ0F1dGhvcml6YXRpb24gdG9rZW4gaXMgcmVxdWlyZWQnLFxuICBpbnZhbGlkQXV0aG9yaXphdGlvblNjaGVtYTogJ0ludmFsaWQgQXV0aG9yaXphdGlvbiBUb2tlbiBzY2hlbWEnLFxuICBwYXRpZW50Tm90ZVVwZGF0ZTogJ0RvY3VtZW50IGlzIG5vdCB1cGxvYWRlZC4nLFxuICB3cm9uZ09sZFBhc3N3b3JkRXJyb3I6ICdQbGVhc2UgRW50ZXIgY29ycmVjdCBPbGRQYXNzd29yZCcsXG4gIGZhbWlseUxpbmtOb3RTYW1lRXJyb3I6ICdQYXRpbmVudCBpZCBhbmQgZmFtaWx5IG1lbWJlciBpZCB3aWxsIG5vdCBiZSBzYW1lJyxcbiAgc2FtZVNlYXJjaEVycm9yOiAnWW91IGNhbiBub3QgbGluayB5b3VyIHNlbGYgYXMgZmFtaWx5IG1lbWJlcicsXG4gIFVzZXJOb3RGb3VuZDogJ1VzZXIgZGV0YWlsIG5vdCBmb3VuZC4nLFxufTtcblxuY29uc3Qgc3ViamVjdCA9IHtcbiAgd2VsY29tZVRvQUhTOiAnV2VsY29tZS4nLFxufTtcblxuY29uc3Qgc21zQ29udGVudCA9IHtcbiAgd2VsY29tZTogYEhlbGxvICNDVVNUT01FUl9OQU1FLFxuICBZb3VyIHBhc3N3b3JkIGlzICNQQVNTV09SRFxuICBQbGVhc2UgdXNlIGFib3ZlIGNyZWRlbnRpYWxzIHRvIGxvZ2luIGluIEFkdmFuY2UgSGVhbHRoIFN5c3RlbSBzaXRlICNBRFZBTkNFX0hFQUxUSF9TWVNZVEVNX1BBVElFTlRfU0lURV9VUkwuIElmIHlvdSBoYXZlIGFueSBxdWVyaWVzLCBwbGVhc2UgY29ubmVjdCB3aXRoIHVzIG9uICNHT09HTEVfRk9STV9MSU5LLlxuICBcbiAgQ2hlZXJzLFxuICBBZHZhbmNlIEhlYWx0aCBTeXN0ZW0gVGVhbS5gLFxufTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3VjY2VzcyxcbiAgZXJyb3IsXG4gIHN1YmplY3QsXG4gIHNtc0NvbnRlbnQsXG59O1xuIiwiLyoqIG1haWwgc2VuZCBmdW5jdGlvblxuICogQGF1dGhvcjogSkQ5ODk4IDxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbjogc2VuZCBtYWlsIHVzaW5nIG5vZGVtYWlsZXJcbiAqL1xuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSAnbm9kZW1haWxlcic7XG5pbXBvcnQgZWpzIGZyb20gJ2Vqcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGZvcmdvdENvbmZpZyB9IGZyb20gJy4uL2FwaS9mb3Jnb3RQYXNzd29yZC9mb3Jnb3QuY29uZmlnJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uL2hlbHBlcnMvdXRpbHMvaW5kZXgnO1xuXG4vKiogY3JlYXRlIG1haWwgVHJhbnNwb3J0ZXJcbiAqIEBhdXRob3I6IEpEOTg5OCA8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gKiBAZGVzY3JpcHRpb246IHRoaXMgYSBtYWlsIHRyYW5zcG9ydGVyIGZvciBzZW5kaW5nIG1haWxcbiAqL1xuY29uc3QgbWFpbFRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICBzZXJ2aWNlOiAnZ21haWwnLFxuICBhdXRoOiB7XG4gICAgdXNlcjogZm9yZ290Q29uZmlnLnVzZXJNYWlsLFxuICAgIHBhc3M6IGZvcmdvdENvbmZpZy5wYXNzd29yZCxcbiAgfSxcbn0pO1xuLyoqIHNlbmQgbWFpbCBmdW5jdGlvblxuICogQGF1dGhvcjogSkQ5ODk4IDxqYXlkZWVwLm1hbGF2aXlhQGRhdGFwcm9waGV0cy5pbj5cbiAqIEBkZXNjcmlwdGlvbjogdGhpcyBpcyBzZW5kIG1haWwgZnVuY3Rpb24gZm9yIG1haWwgc2VuZCB1c2luZyBlanMgdGVtcGxhdGUgYW5kIG1haWwgZGF0YVxuICovXG5jb25zdCBzZW5kTWFpbCA9IGFzeW5jIChcbiAgbWFpbERhdGE6IGFueSxcbiAgZmlsZU5hbWU6IGFueSxcbiAgc3ViamVjdDogYW55LFxuICBvdHBkYXRhOiBhbnksXG4pID0+IHtcbiAgY29uc3QgcmVxdWlyZWRQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgYC4uLy9zcmMvdmlldy8ke2ZpbGVOYW1lfWApO1xuXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBlanMucmVuZGVyRmlsZShyZXF1aXJlZFBhdGgsIG1haWxEYXRhLCBzdWJqZWN0LCBvdHBkYXRhKTtcblxuICBjb25zdCBtYWluT3B0aW9ucyA9IHtcbiAgICBmcm9tOiBmb3Jnb3RDb25maWcudXNlck1haWwsXG4gICAgdG86IG1haWxEYXRhLmVtYWlsLFxuICAgIHN1YmplY3QsXG4gICAgaHRtbDogZGF0YSxcbiAgfTtcblxuICBtYWlsVHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbk9wdGlvbnMsIChlcnI6IGFueSwgaW5mbzogeyByZXNwb25zZTogYW55IH0pID0+IHtcbiAgICBpZiAoZXJyKSBsb2dnZXIuaW5mbyhlcnIpO1xuICAgIGVsc2UgY29uc29sZS5pbmZvKGBNZXNzYWdlIHNlbnQ6ICR7aW5mby5yZXNwb25zZX1gKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzZW5kTWFpbDtcbiIsIi8qKiBtYWlsIHNlbmQgZnVuY3Rpb25cbiAqIEBhdXRob3I6IEpEOTg5OCA8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gKiBAZGVzY3JpcHRpb246IHNlbmQgbWFpbCB1c2luZyBub2RlbWFpbGVyXG4gKi9cbmltcG9ydCBub2RlbWFpbGVyIGZyb20gJ25vZGVtYWlsZXInO1xuaW1wb3J0IGVqcyBmcm9tICdlanMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBmb3Jnb3RDb25maWcgfSBmcm9tICcuLi9hcGkvZm9yZ290UGFzc3dvcmQvZm9yZ290LmNvbmZpZyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi9oZWxwZXJzL3V0aWxzL2luZGV4JztcblxuLyoqIGNyZWF0ZSBtYWlsIFRyYW5zcG9ydGVyXG4gKiBAYXV0aG9yOiBKRDk4OTggPGpheWRlZXAubWFsYXZpeWFAZGF0YXByb3BoZXRzLmluPlxuICogQGRlc2NyaXB0aW9uOiB0aGlzIGEgbWFpbCB0cmFuc3BvcnRlciBmb3Igc2VuZGluZyBtYWlsXG4gKi9cbmNvbnN0IG1haWxUcmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgc2VydmljZTogJ2dtYWlsJyxcbiAgYXV0aDoge1xuICAgIHVzZXI6IGZvcmdvdENvbmZpZy51c2VyTWFpbCxcbiAgICBwYXNzOiBmb3Jnb3RDb25maWcucGFzc3dvcmQsXG4gIH0sXG59KTtcbi8qKiBzZW5kIG1haWwgZnVuY3Rpb25cbiAqIEBhdXRob3I6IEpEOTg5OCA8amF5ZGVlcC5tYWxhdml5YUBkYXRhcHJvcGhldHMuaW4+XG4gKiBAZGVzY3JpcHRpb246IHRoaXMgaXMgc2VuZCBtYWlsIGZ1bmN0aW9uIGZvciBtYWlsIHNlbmQgdXNpbmcgZWpzIHRlbXBsYXRlIGFuZCBtYWlsIGRhdGFcbiAqL1xuY29uc3Qgc2VuZE1haWwgPSBhc3luYyAobWFpbERhdGE6IGFueSwgZmlsZU5hbWU6IGFueSwgc3ViamVjdDogYW55KSA9PiB7XG4gIGNvbnN0IHJlcXVpcmVkUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsIGAuLi8vc3JjL3ZpZXcvJHtmaWxlTmFtZX1gKTtcblxuICBjb25zdCBkYXRhID0gYXdhaXQgZWpzLnJlbmRlckZpbGUocmVxdWlyZWRQYXRoLCBtYWlsRGF0YSwgc3ViamVjdCk7XG5cbiAgY29uc3QgbWFpbk9wdGlvbnMgPSB7XG4gICAgZnJvbTogZm9yZ290Q29uZmlnLnVzZXJNYWlsLFxuICAgIHRvOiBtYWlsRGF0YS5lbWFpbCxcbiAgICBzdWJqZWN0LFxuICAgIGh0bWw6IGRhdGEsXG4gIH07XG5cbiAgbWFpbFRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haW5PcHRpb25zLCAoZXJyOiBhbnksIGluZm86IHsgcmVzcG9uc2U6IGFueSB9KSA9PiB7XG4gICAgaWYgKGVycikgbG9nZ2VyLmluZm8oZXJyKTtcbiAgICBlbHNlIGNvbnNvbGUuaW5mbyhgTWVzc2FnZSBzZW50OiAke2luZm8ucmVzcG9uc2V9YCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2VuZE1haWw7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAc2VudHJ5L25vZGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXdzLXNka1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhd3Mtc2RrL2NsaWVudHMvczNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3MtcHJvbWlzZS13cmFwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdlbmVyYXRlLXBhc3N3b3JkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwLXN0YXR1cy1jb2Rlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqb2lcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1pbmltaXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibXVsdGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGVtYWlsZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3RwLWdlbmVyYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3dhZ2dlci11aS1leHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uLWRhaWx5LXJvdGF0ZS1maWxlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=