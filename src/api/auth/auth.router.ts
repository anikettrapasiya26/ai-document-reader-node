import { Router } from 'express';
import ApiHelper from '../helpers/api.helper';
import AuthController from './auth.controller';

const authController = new AuthController();
const router = Router();
/**
 * signIn and signUp router
 */
router.post('/signin', ApiHelper.wrapHandler(authController.signIn));
router.post('/signup', ApiHelper.wrapHandler(authController.signUp));

export default router;
