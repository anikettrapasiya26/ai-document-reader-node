import { Router } from 'express';
import { authenticate } from './auth/auth.middlewares';
import usersRouter from './users/users.router';
import clientRouter from './client/client.router';
import authRouter from './auth/auth.router';
import forgotRouter from './forgotPassword/forgot.router';
import S3Router from './s3bucket/s3router';
import passwordRouter from './resetPassword/reset.router';
import publicRouter from './public/public.router';

const router = Router({ mergeParams: true });

router.use('/auth', forgotRouter);
router.use('/ahs', publicRouter);
router.use('/auth', authRouter);
router.use(authenticate);

router.use('/user', usersRouter);
router.use('/client', clientRouter);
router.use('/upload', S3Router);
router.use('/password', passwordRouter);

export default router;
