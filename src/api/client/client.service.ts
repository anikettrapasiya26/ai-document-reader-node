/** userdetails services
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description:user Profile details services is here.
 */
import { QueryTypes } from 'sequelize';
import config, { ConfigKey } from '../../config/config';
import { DBConnection } from '../../db/db.connection';
import queries from '../helpers/query';
import UpdateData from '../api.definitions';
import { Request } from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import moment from 'moment';
const generator = require('generate-password');
import sendClientMail from '../../view/client.mail.helper';
import message from '../../lang/message';
import { forgotConfig } from '../forgotPassword/forgot.config';
import { logger } from '../../helpers/utils/index';
export default class ClientService {
  /**Get userdetails services
   * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
   * @description:GET user Profile details using Email.
   * @return: all the users details you need.
   */

  static async email(req: Request) {
    const [users]: any = await DBConnection.executeSampleQuery(
      queries.userQueries.get_user_by_mail,
      { email: req.body.email },
    );

    if (!users[0]) {
      return true;
    }
    return null;
  }

  static async username(req: Request) {
    const [users]: any = await DBConnection.executeSampleQuery(
      queries.userQueries.get_user_by_username,
      { username: req.body.username },
    );

    if (!users[0]) {
      return true;
    }
    return null;
  }

  static async userList<TDetail = any>(req: any): Promise<TDetail> {
    try {
      // logger.info('userid', req.user.id);
      const [userList]: any = await DBConnection.executeSampleQuery(
        queries.userQueries.userList,
        {},
      );
      if (userList) return userList;
      return null;
    } catch (err) {
      return null;
    }
  }

  static async userDetail<TDetail = any>(req: any): Promise<TDetail> {
    try {
      const [userDetail]: any = await DBConnection.executeSampleQuery(
        queries.userQueries.userDetail,
        {
          userId: req.query.userId,
        },
      );
      if (userDetail) return userDetail;
      return null;
    } catch (err) {
      return null;
    }
  }

  static async userUpdate<TDetail = UpdateData>(
    data: UpdateData,
  ): Promise<any> {
    // send response from here
    const update: any = await DBConnection.executeSampleQuery(
      queries.userQueries.userUpdate,
      { ...data },
      QueryTypes.UPDATE,
    );
    return update[1];
  }

  static async userDelete<TDetail = UpdateData>(
    data: UpdateData,
  ): Promise<any> {
    // send response from here
    const update: any = await DBConnection.executeSampleQuery(
      queries.userQueries.userDelete,
      { ...data,
        userId: data.userId },
      QueryTypes.DELETE,
    );
    return update[1];
  }

  /**Update userdetails controller
   * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
   * @description:Update user Profile details with update query.
   * @return: updated row with data.
   */

  static async ProfileUpdate<TDetail = UpdateData>(
    data: UpdateData,
  ): Promise<any> {
    // send response from here
    const update: any = await DBConnection.executeSampleQuery(
      queries.userQueries.update_user,
      { ...data },
      QueryTypes.UPDATE,
    );
    return update[1];
  }

  static addClient = async (res: any, req: any) => {
    // const hash = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email.toLowerCase();

    const gender = req.body.gender?.toLowerCase();
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
    const password = await bcrypt.hash(genSinglePassword, 10);
    const dob = moment(
      `${req.body.dob} 00:00:00.00`,
      'MM/DD/YYYY hh:mm:ss.ms',
    ).format('YYYY-MM-DD hh:mm:ss.ms');
console.log(req.body);

    const saveuser: any = await DBConnection.executeSampleQuery(
      queries.userQueries.add_client_detail,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password,
        createdAt: new Date(),
      },
      'insert',
    );
    if (saveuser) {
      await sendClientMail(
        {
          email: req.body.email.toLowerCase(),
          password: genSinglePassword,
          mailLink: forgotConfig.mailLink,
          googleLink: forgotConfig.googleFormLink,
        },
        'AddClient.ejs',
        { email: req.body.email.toLowerCase(), password: genSinglePassword },
        message.subject.welcomeToAHS,
      );
    }

    const [newUser]: any = await DBConnection.executeSampleQuery(
      queries.userQueries.get_user_by_mail,
      {
        email: req.body.email,
      },
      'select',
    );
    logger.info(newUser);
    if (newUser[0]) {
      return newUser[0];
    }
    return null;
  };

  static createUserSchema = {
    blog: Joi.object()
      .keys({
        username: Joi.string().required(),
        // patient_unique_id: Joi.string().required(),
        first_name: Joi.string()
          .required()
          .regex(/^([a-zA-Z ]){2,30}$/),
        // middle_name: Joi.string()
        //   .required()
        //   .regex(/^([a-zA-Z ]){1,30}$/),
        last_name: Joi.string()
          .required()
          .regex(/^([a-zA-Z ]){2,30}$/),
        street: Joi.string(),
        phone: Joi.string().regex(/^[0-9]{9,14}$/),
        email: Joi.string()
          .email()
          .lowercase()
          .required()
          .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i),
        password: Joi.string()
          .required()
          .min(8)
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/,
          )
          .label('password')
          .messages({
            'string.min': 'Must have at least 8 characters',
            'object.regex': 'Must have at least 8 characters(User#@123)',
            'string.pattern.base': 'Password format is incorrect',
          }),
      })
      .with('firstName', 'email'),
  };

  static createClientSchema = {
    blog: Joi.object()
      .keys({
        name: Joi.string()
          .required()
          .regex(/^([a-zA-Z ]){2,30}$/),
        phone: Joi.string().regex(/^[0-9]{9,14}$/),
        email: Joi.string()
          .email()
          .lowercase()
          .required()
          .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i),
      })
      .with('name', 'email'),
  };

  /**view user profile details services
   * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
   * @description:view family member in user Profile using user_id.
   * @return: family member list.
   */

  // static async ViewFamily<TDetail = any>(req: Request): Promise<any> {
  //   // send response from here
  //   const id: any = req.query.user_id;
  //   const list: any = req.query.page_size;
  //   const page_no: any = req.query.page_no;
  //   const limit: any = list > 0 ? list : 10;
  //   const offset: number = page_no * limit > 0 ? page_no * limit : 0;
  //   const result: any = await DBConnection.executeSampleQuery(
  //     queries.userQueries.view_family,
  //     { user_id: id, page_size: limit, page_no: offset },
  //     QueryTypes.SELECT,
  //   );
  //   return result[0];
  // }
}
