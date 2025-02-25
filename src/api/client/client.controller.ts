/**patient controller
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Patient Profile controlle functions
 */

import { Request, Response } from 'express';
import ClientService from './client.service';
import successHandler from '../../lang/handlers/success';
import errorHandler from '../../lang/handlers/error';
import message from '../../lang/message';
import UpdateData from '../api.definitions';
import moment from 'moment';
import { logger } from '../../helpers/utils/index';

export default class ClientController {
  constructor() {
    // this.detail = this.detail.bind(this);
    // this.ProfileUpdate = this.ProfileUpdate.bind(this);
    // this.ViewFamily = this.ViewFamily.bind(this);
  }

  async userList(req: Request, res: Response): Promise<any> {
    try {
      const userList = await ClientService.userList(req);
      if (userList)
        return successHandler(
          res,
          200,
          message.success.getUserDataRetriveSuccessFully,
          userList,
        );
      return errorHandler(res, 400, message.error.UserNotFound);
    } catch (err) {
      return errorHandler(res, 401, message.error.somethingWentWrongError);
    }
  }

  async userDetail(req: Request, res: Response): Promise<any> {
    try {
      const userDetail = await ClientService.userDetail(req);
      if (userDetail)
        return successHandler(
          res,
          200,
          message.success.getUserDataRetriveSuccessFully,
          userDetail[0],
        );
      return errorHandler(res, 400, message.error.UserNotFound);
    } catch (err) {
      return errorHandler(res, 401, message.error.somethingWentWrongError);
    }
  }

  async userUpdate(req: Request, res: Response): Promise<any> {
    const data: any = {
      name: req.body.name || '',
      phone: req.body.phone || '',
      userId: req.body.userId || '',
    };
    const result = await ClientService.userUpdate(data);
    if (result.rowCount > 0) {
      return successHandler(res, 200, message.success.userEditSuccessFully);
    }
    return errorHandler(res, 400, message.error.somethingWentWrongError);
  }

  async userDelete(req: Request, res: Response): Promise<any> {
    const data: any = {
      userId: req.query.userId,
      is_active: false,
      is_delete: true,
    };
    console.log(data);
    
    const result = await ClientService.userDelete(data);
    if (!result.rowCount) {
      return errorHandler(res, 400, message.error.somethingWentWrongError);
    }
    return successHandler(res, 200, message.success.userDeletSuccessFully);
  }

  async addClient(req: Request, res: Response) {
    try {
      const result = ClientService.createClientSchema.blog.validate(req.body);
      if (result.error) {
        return errorHandler(res, 400, result.error.details[0].message);
      } else {
        const emailValid = await ClientService.email(req);
        logger.info(emailValid);
        if (emailValid === null) {
          return errorHandler(res, 400, message.error.alreadyExistsError);
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
        const tokenData = await ClientService.addClient(res, req);
        if (tokenData) {
          return successHandler(
            res,
            200,
            message.success.ClientAddSuccessFully,
            tokenData,
          );
        }
        logger.info(tokenData);
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

  /**view patient family details controller
   * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
   * @description:view Patient family details which is already add by patients & register in our side, this details show in patient profile.
   *  @return: family member list.
   */
  // async ViewFamily(req: Request, res: Response): Promise<any> {
  //   const result = await ClientService.ViewFamily(req);
  //   if (!result) {
  //     return errorHandler(res, 400, message.error.somethingWentWrongError);
  //   }
  //   return successHandler(res, 200, message.success.showFamily, result);
  // }
}
