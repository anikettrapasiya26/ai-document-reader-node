import { QueryTypes } from 'sequelize';
import fs from 'fs';
import { logger } from '../../helpers/utils/index';
import { DBConnection } from '../../db/db.connection';
import queries from '../helpers/query';

export default class SuperAdminService {
  static async DocumentUpload<TDetail = any>(
    data: any,
    req: any,
    file: any,
  ): Promise<any> {
    // send response from here
    // logger.info(files);
    const update: any = await DBConnection.executeSampleQuery(
      queries.userQueries.insert_document,
      {
        fileName: file.filename,
        fileType: file.mimetype,
        key: data.Key,
        location: data.Location,
        userId: req.user.id,
      },
      QueryTypes.UPDATE,
    );
    logger.info(update[0][0]);
    // logger.info(update);
    if (update[1] > 0) {
      return update[0][0];
    }
    return null;
  }

  static async chat<TDetail = any>(req: any): Promise<any> {
    // send response from here
    // logger.info(files);
    const [update]: any = await DBConnection.executeSampleQuery(
      queries.userQueries.find_documents,
      {
        userId: req.user.id,
      },
      QueryTypes.UPDATE,
    );
    logger.info(update);
    return update;
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

  static async removeFile<TDetail = any>(req: any): Promise<any> {
    // send response from here
    // logger.info(files);
    const deletes: any = await DBConnection.executeSampleQuery(
      queries.userQueries.removeFile,
      {
        userId: req.user.id,
      },
      QueryTypes.UPDATE,
    );
    logger.info(deletes);
    return deletes;
  }
}
