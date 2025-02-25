/**
 * @author aniket.trapasiya <aniket.trapasiya@dataprophets.in>
 * @description Patient Auth service file
 */

import Joi from 'joi';
import { DBConnection } from '../../db/db.connection';
import bcrypt from 'bcrypt';
import errorHandler from '../../lang/handlers/error';
import message from '../../lang/message';
import { Request, Response } from 'express';
import moment from 'moment';
import query from '../helpers/query';
import { logger } from '../../helpers/utils/index';

export default class AuthService {
  /**
   * signIn authservice function
   * @param email - to check user exists or not
   * @returns user data
   */
  static async signIn(
    email: string,
    password: string,
    expiryDate?: Date,
  ): Promise<any> {
    const [user]: any = await DBConnection.executeSampleQuery(
      query.userQueries.get_user_by_mail,
      {
        email: email,
      },
      'select',
    );
    if (user && user[0]) {
      return user[0];
    } else {
      return null;
    }
  }

  /**
   * signUp authservice function
   * @param req.body.email - to check user exists or not
   * @returns added data of user
   */

  static signUp = async (res: Response, req: Request) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const mail = req.body.email;
    // const gender = req.body.gender?.toLowerCase();

    // const dob = moment(
    //   `${req.body.dob} 00:00:00.00`,
    //   'MM/DD/YYYY hh:mm:ss.ms',
    // ).format('YYYY-MM-DD hh:mm:ss.ms');

    const saveuser: any = await DBConnection.executeSampleQuery(
      query.userQueries.add_user_detail,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
      },
      'insert',
    );
    // logger.info(saveuser);

    const [newUser]: any = await DBConnection.executeSampleQuery(
      query.userQueries.get_user_by_mail,
      {
        email: mail,
      },
      'select',
    );
    logger.info(newUser);
    if (newUser[0]) {
      return newUser[0];
    }
    return null;
  };

  static async email(req: Request) {
    const [users]: any = await DBConnection.executeSampleQuery(
      query.userQueries.get_user_by_mail,
      { email: req.body.email },
    );

    if (!users[0]) {
      return true;
    }
    return null;
  }

  static async username(req: Request) {
    const [users]: any = await DBConnection.executeSampleQuery(
      query.userQueries.get_user_by_username,
      { username: req.body.username },
    );

    if (!users[0]) {
      return true;
    }
    return null;
  }

  static createUserSchema = {
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
      .with('name', 'email'),
  };

  static signinSchema = {
    blog: Joi.object().keys({
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
          'string.pattern.base':
            'Password must have at least 8 character that include at least 1 Uppercase character,1 lowercase character,1 number and 1 special character(!@#$%^&*) in',
        }),
    }),
  };
}
