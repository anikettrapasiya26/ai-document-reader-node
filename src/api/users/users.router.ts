/**patientdetails routers
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description:Add all routers for Patient Profile details with show family member is here.
 */
import multer from 'multer';
import fs from 'fs';
import { Router } from 'express';

import UserController from './users.controller';

const userController = new UserController();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(`${__dirname}/../../../../uploads`)) {
      fs.mkdirSync(`${__dirname}/../../../../uploads`);
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
}).single('file');

const router = Router({ mergeParams: true });
router.route('/detail').post(userController.detail);
router.route('/update_profile').put(uploading, userController.ProfileUpdate);

export default router;
