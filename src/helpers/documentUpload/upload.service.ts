require('dotenv').config();
import fs from 'fs';
import errorHandler from '../../lang/handlers/error';
import message from '../../lang/message';
import S3 from 'aws-sdk/clients/s3';

function uploadFile(
  file: any,
  accessKeyId: string,
  secretAccessKey: string,
  bucketName: string,
  folderName: string,
  region: string,
) {
  const fileStream: any = fs.createReadStream(
    __dirname + `/../uploads/${file.filename}`,
  );
  try {
    const s3: any = new S3({
      accessKeyId,
      secretAccessKey,
      region,
    });
    console.log(file);
    const uploadParams: any = {
      Bucket: bucketName,
      Body: fileStream,
      Key: folderName + '/' + file.filename,
    };

    return s3.upload(uploadParams).promise();
  } catch (err) {
    return errorHandler(file.path, 404, message.error.fileNotFoundError);
  }
}
export default uploadFile;
