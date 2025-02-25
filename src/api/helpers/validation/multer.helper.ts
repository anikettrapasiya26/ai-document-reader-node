import { Request } from 'express';
import { Multer } from 'multer';

export default interface MulterRequest extends Request {
  files: {
    [fieldname: string]: Express.Multer.File[];
  };
}
