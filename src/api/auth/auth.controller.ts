/**
 * @author aniket.trapasiya <aniket.trapasiya@dataprophets.in>
 * @description Patient Auth controller file
 */

import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { DBConnection } from '../../db/db.connection';
import successHandler from '../../lang/handlers/success';
import message from '../../lang/message';
import errorHandler from '../../lang/handlers/error';
import AuthService from './auth.service';
import query from '../helpers/query';
import { logger } from '../../helpers/utils/index';

const JWT = require('../../api/api.jwt');

export default class AuthController {
  /**
   * @description signIn function: find user with email and check password are same or not
   * @return patient data with token
   */

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      // const result = AuthService.signinSchema.blog.validate(req.body);
      // if (result.error) {
      //   return errorHandler(res, 400, result.error.details[0].message);
      // } else {
      const tokenData = await AuthService.signIn(email, password);
      if (tokenData) {
        if (await bcrypt.compare(password, tokenData.password)) {
          const { id } = tokenData;

          const token = JWT.createToken(id);
          if (token) {
            tokenData.token = token;
            const expired_on = Math.floor(Date.now()) + 24 * 60 * 60 * 1000;
            const str = new Date(expired_on).toUTCString();
            const saveAccesstoken: any = await DBConnection.executeSampleQuery(
              query.userQueries.update_access_token,
              {
                token: token,
                exp: str,
                id: tokenData.id,
              },
              'update',
            );
            return successHandler(
              res,
              200,
              message.success.signInSuccessFully,
              tokenData,
            );
          }
          return errorHandler(res, 400, message.error.tokenNotFound);
        } else return errorHandler(res, 401, message.error.wrongPasswordError);
      }
      return errorHandler(res, 404, message.error.emailNotFoundError);
      // }
    } catch (error) {
      return errorHandler(res, 400, message.error.tokenNotFound);
    }
  }

  /**
   * @description signUp function: create new user and create token then save details into Database
   * @return new patient data with token
   */

  async signUp(req: Request, res: Response) {
    try {
      const result = AuthService.createUserSchema.blog.validate(req.body);
      if (result.error) {
        return errorHandler(res, 400, result.error.details[0].message);
      } else {
        const emailValid = await AuthService.email(req);
        logger.info(emailValid, 'email');
        if (emailValid === null) {
          return errorHandler(res, 400, message.error.alreadyExistsError);
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
        const tokenData = await AuthService.signUp(res, req);
        // logger.info(tokenData);
        if (tokenData) {
          return successHandler(
            res,
            200,
            message.success.signUpSuccessFully,
            tokenData,
          );
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
    } catch (err) {
      logger.info('error', err);
      errorHandler(res, 400, message.error.tokenNotFound);
    }
  }
}
