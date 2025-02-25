/** Patient profile photo router
 * @auther  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description:Patient Profile photo in s3 bucket using aws accounts routers is here.
 */

import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import s3controller from './s3controller';
const S3controller = new s3controller();

const router = Router({ mergeParams: true });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(`${__dirname}/../uploads`)) {
      fs.mkdirSync(`${__dirname}/../uploads`);
    }
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// const upload = multer({ storage });

const uploading = multer({
  storage,
  limits: { fieldSize: 30 * 1024 * 1024 },
}).array('files', 10);

router.route('/upload').post(uploading, S3controller.upload);
router.route('/deleteFile').delete(uploading, S3controller.chat);
router.route('/image').post(uploading, S3controller.ImageUpload);

export default router;
