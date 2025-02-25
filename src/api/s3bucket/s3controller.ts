/**Patient profile photo update controller
 * @auther  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Patient Profile photo add-update controller functions
 */

import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
// import convert from '../../helpers/file';
import ImageService from './s3services';
import uploadFile from '../../helpers/documentUpload/upload.service';
import successHandler from '../../lang/handlers/success';
import message from '../../lang/message';
import errorHandler from '../../lang/handlers/error';
import AWS from 'aws-sdk';
import { logger } from '../../helpers/utils/index';

export default class s3controller {
  constructor() {
    this.uploads = this.uploads.bind(this);
  }
  /**Update Patient profile photo controller
   * @auther  JD9898<jaydeep.malaviya@dataprophets.in>
   * @description:Update Patient Profile photo in s3 bucket using aws accounts, this controller for update photo.
   * @return: updated profile photo.
   */

  async uploads(req: any, res: Response): Promise<any> {
    try {
      const file = req.files;
      logger.info(file);
      // const files = req.files.filename;
      // logger.info(file);
      let folder = '';
      if (file.mimetype === 'application/pdf') {
        folder = 'Documents';
      } else {
        folder = 'Images';
      }
      const accessKeyId = process.env.S3_ACCESS_KEY_ID;
      const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
      const bucketName = process.env.AWS_S3_BUCKET;
      const region = process.env.S3_REGION;
      const folderName = `${process.env.AWS_S3_FOLDER}/${req.user.id}/${folder}`;

      const result: any = await uploadFile(
        file,
        accessKeyId,
        secretAccessKey,
        bucketName,
        folderName,
        region,
      );
      logger.info(result);
      const results: any = await ImageService.DocumentUpload(result, req, file);

      // if (!result) {
      //   return errorHandler(res, 400, message.error.somethingWentWrongError);
      // }

      fs.unlink(file.path, function (err) {
        if (err) throw err;
      });

      if (!results[1]) {
        return errorHandler(res, 400, message.error.patientNoteUpdate);
      }
      return successHandler(
        res,
        200,
        message.success.docUploadSuccessFully,
        result,
      );
    } catch (err) {
      logger.info(err, 'error');
      return errorHandler(res, 400, message.error.somethingWentWrongError);
    }
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
  async upload(req: any, res: Response): Promise<any> {
    try {
      const files = req.files;
      logger.info(JSON.stringify(files));
      const accessKeyId = process.env.S3_ACCESS_KEY_ID;
      const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
      const bucketName = process.env.AWS_S3_BUCKET;
      const region = process.env.S3_REGION;

      const results: any = await Promise.all(
        files.map(async (file: any) => {
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
          logger.info(file.mimetype);

          if (
            file.mimetype === 'application/pdf' ||
            file.mimetype ===
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.mimetype === 'application/msword'
          )
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
          const result: any = await uploadFile(
            file,
            accessKeyId,
            secretAccessKey,
            bucketName,
            folderName,
            region,
          );
          // console.log(result);
          // logger.info(result);
          const data: any = await ImageService.DocumentUpload(
            result,
            req,
            file,
          );
          AWS.config.update({
            region: region,
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
          });

          const s3 = new AWS.S3();
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
          logger.info(fileUrl);
          // logger.info(url);
          // logger.info(result.key);
          return {
            key: result.key,
            url: result.Location,
            name: data.file_name,
            fileurl: fileUrl,
            type: file.mimetype,
          };
        }),
      );
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

      files.forEach((file: { path: fs.PathLike }) => {
        fs.unlink(file.path, function (err) {
          if (err) throw err;
        });
      });

      if (!results.length) {
        return errorHandler(res, 400, message.error.patientNoteUpdate);
      }

      return successHandler(
        res,
        200,
        message.success.docUploadSuccessFully,
        results,
      );
    } catch (err) {
      console.log(err);
      logger.info(err, 'error');
      return errorHandler(res, 400, message.error.somethingWentWrongError);
    }
  }

  async ImageUpload(req: any, res: Response): Promise<any> {
    try {
      const files = req.files;
      logger.info(files);
      const accessKeyId = process.env.S3_ACCESS_KEY_ID;
      const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
      const bucketName = process.env.AWS_S3_BUCKET;
      const region = process.env.S3_REGION;

      const results: any = await Promise.all(
        files.map(async (file: { mimetype: string }) => {
          // let folder = '';
          // logger.info(file);
          logger.info(file.mimetype);
          // logger.info(folder);
          const folderName = `${process.env.AWS_S3_FOLDER}/${req.user.id}/Images`;

          const result: any = await uploadFile(
            file,
            accessKeyId,
            secretAccessKey,
            bucketName,
            folderName,
            region,
          );
          return {
            key: result.key,
          };
        }),
      );
      files.forEach((file: { path: fs.PathLike }) => {
        fs.unlink(file.path, function (err) {
          if (err) throw err;
        });
      });
      let result = '';
      results.forEach((obj: any) => {
        result += obj.key + ',';
      });
      result = result.slice(0, -1); // remove the last comma

      console.log(result);
      const data: any = await axios.post(`${process.env.AI_URL}`, {
        message: `OCR | ${result}`,
        sender: req.user.email,
      });
      // console.log(data);
      if (data.data[0].text === 'No text Found in the Image') {
        return errorHandler(res, 400, message.error.imageNotProper);
      }
      console.log(data.data);
      const datas: any = await data.data[0];
      console.log(datas);

      AWS.config.update({
        region: region,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      });

      const s3 = new AWS.S3();
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
      logger.info(fileUrl);
      const Response: any = [
        {
          name: path.basename(datas.text),
          fileurl: fileUrl,
          type: 'application/pdf',
          key: datas.text,
        },
      ];
      if (!fileUrl) {
        return errorHandler(res, 400, message.error.patientNoteUpdate);
      }
      // console.log(results);

      return successHandler(
        res,
        200,
        message.success.docUploadSuccessFully,
        Response,
      );
    } catch (err) {
      console.log(err);
      logger.info(err, 'error');
      return errorHandler(res, 400, message.error.somethingWentWrongError);
    }
  }

  async chat(req: any, res: Response): Promise<any> {
    try {
      const results: any = await ImageService.chat(req);
      logger.info(results);
      // if (!result) {
      //   return errorHandler(res, 400, message.error.somethingWentWrongError);
      // }
      const s3 = new AWS.S3({
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

      const result: any = s3
        .deleteObjects(params, function (err, data) {
          if (err) {
            logger.info('Error deleting objects:', err);
          } else {
            // logger.info('Successfully deleted objects:', data.Deleted);
            return data;
          }
        })
        .promise();
      if (await result) {
        const data: any = await ImageService.removeFile(req);
        if (data[1].rowCount > 0) {
          return successHandler(
            res,
            200,
            message.success.docDeleteSuccessFully,
          );
        }
        return errorHandler(res, 400, message.error.fileNotFoundError);
      }

      return errorHandler(res, 400, message.error.somethingWentWrongError);
    } catch (err) {
      logger.info(err, 'error');
      return errorHandler(res, 400, message.error.somethingWentWrongError);
    }
  }
}
