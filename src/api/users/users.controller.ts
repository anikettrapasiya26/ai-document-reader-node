/**patient controller
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Patient Profile controlle functions
 */

import { Request, Response } from 'express';
import UsersService from './users.service';
import successHandler from '../../lang/handlers/success';
import errorHandler from '../../lang/handlers/error';
import message from '../../lang/message';
import UpdateData from '../api.definitions';
import uploadFile from '../../helpers/documentUpload/upload.service';
import AWS from 'aws-sdk';
import { logger } from '../../helpers/utils/index';

export default class UserController {
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
  async detail(req: Request, res: Response): Promise<any> {
    try {
      const accessKeyId = process.env.S3_ACCESS_KEY_ID;
      const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
      const bucketName = process.env.AWS_S3_BUCKET;
      const region = process.env.S3_REGION;
      AWS.config.update({
        region: region,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      });

      const s3 = new AWS.S3();

      // const url = s3.getSignedUrl('getObject', params);

      const result: any = await UsersService.detail(req);
      if (result.profileUrl) {
        const params = {
          Bucket: bucketName,
          Key: result.profileUrl,
          Expires: 3600,
          // ACL: 'public-read',
          // ResponseContentDisposition: `attachment;filename="${result.Key}"`, // URL expiration time in seconds
        };
        const fileUrl = await s3.getSignedUrl('getObject', params);
        logger.info(fileUrl);
        result.profileUrl = fileUrl;
        logger.info(result);

        if (!result) {
          return errorHandler(res, 400, message.error.somethingWentWrongError);
        }
        return successHandler(
          res,
          200,
          message.success.getUserDataRetriveSuccessFully,
          result,
        );
      }
      if (!result) {
        return errorHandler(res, 400, message.error.somethingWentWrongError);
      }
      return successHandler(
        res,
        200,
        message.success.getUserDataRetriveSuccessFully,
        result,
      );
    } catch (err) {
      logger.info(err, 'error');
      return errorHandler(res, 400, message.error.somethingWentWrongError);
    }
  }

  /**Update patientdetails controller
   * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
   * @description:Update Patient Profile details using Email,Update the details with PUT method.
   * @return: updated row with data.
   */
  async ProfileUpdate(req: any, res: any): Promise<any> {
    try {
      const data: UpdateData = {
        name: req.body.name || '',
        phone: req.body.phone || '',
        userId: req.user.id || '',
        profile: req.file || '',
      };
      if (req.file) {
        console.log(data.profile.mimetype);
        if (!data.profile.mimetype.startsWith('image/')) {
          return errorHandler(res, 400, message.error.fileIsMissingError);
        }
        const accessKeyId = process.env.S3_ACCESS_KEY_ID;
        const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
        const bucketName = process.env.AWS_S3_BUCKET;
        const region = process.env.S3_REGION;
        const folderName = `${process.env.AWS_S3_FOLDER}/Profiles`;
        const results: any = await uploadFile(
          req.file,
          accessKeyId,
          secretAccessKey,
          bucketName,
          folderName,
          region,
        );
        logger.info(results);
        const result = await UsersService.ProfileUpdateWithImage(
          data,
          results.Key,
        );
        if (!result.rowCount) {
          return errorHandler(res, 400, message.error.somethingWentWrongError);
        }
        return successHandler(res, 200, message.success.userEditSuccessFully);
      }
      const result = await UsersService.ProfileUpdate(data);
      if (!result.rowCount) {
        return errorHandler(res, 400, message.error.somethingWentWrongError);
      }
      return successHandler(res, 200, message.success.userEditSuccessFully);
    } catch (err) {
      logger.info(err, 'error');
      return errorHandler(res, 400, message.error.somethingWentWrongError);
    }
  }
}
