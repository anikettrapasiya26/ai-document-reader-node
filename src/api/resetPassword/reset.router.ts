/**Reset patient sign-in Password routers
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Create ResetPassword routers is here.
 */
import { Router } from 'express';
import PasswordController from './reset.controller';

const passwordController = new PasswordController();

const router = Router({ mergeParams: true });

router.route('/reset_password').put(passwordController.resetPassword);

export default router;
