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
import { logger } from '../../helpers/utils/index';

export default class UsersService {
  /**Get userdetails services
   * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
   * @description:GET user Profile details using Email.
   * @return: all the users details you need.
   */
  static async detail<TDetail = any>(req: any): Promise<TDetail> {
    // send response from here
    // logger.info('req.user.id', req.user.id);
    const bucket_name = config.get<string>(ConfigKey.AWS_S3_BUCKET);
    const folder_name = config.get<string>(ConfigKey.AWS_S3_FOLDER);
    const base_url = config.get<string>(ConfigKey.AWS_BASE_URL);
    const [result]: any = await DBConnection.executeSampleQuery(
      queries.userQueries.get_user,
      { id: req.user.id, base_url, bucket_name, folder_name },
      QueryTypes.SELECT,
    );

    return result[0];
  }

  /**Update userdetails controller
   * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
   * @description:Update user Profile details with update query.
   * @return: updated row with data.
   */
  static async ProfileUpdateWithImage<TDetail = UpdateData>(
    data: UpdateData,
    profile: any,
  ): Promise<any> {
    // send response from here
    const update: any = await DBConnection.executeSampleQuery(
      queries.userQueries.update_user_with_image,
      {
        name: data.name,
        phone: data.phone,
        userId: data.userId,
        profile: profile,
      },
      QueryTypes.UPDATE,
    );
    return update[1];
  }
  static async ProfileUpdate<TDetail = UpdateData>(
    data: UpdateData,
  ): Promise<any> {
    // send response from here
    const update: any = await DBConnection.executeSampleQuery(
      queries.userQueries.update_user,
      {
        name: data.name,
        phone: data.phone,
        userId: data.userId,
      },
      QueryTypes.UPDATE,
    );
    return update[1];
  }
}
