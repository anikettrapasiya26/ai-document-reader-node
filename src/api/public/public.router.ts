import { Router } from 'express';
import Swagger from '../api.swagger';
import publicController from './public.controller';

const router = Router();
router.route('/welcome').get(publicController.welcome);
router.use('/docs', Swagger.getMiddlewares());

export default router;
