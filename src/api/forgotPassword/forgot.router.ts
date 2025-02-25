/**forgot Password with send mail function routers
 * @auther JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: Forgot Password routers with his params
 */
import { Router } from 'express';

import ForgotController from './forgot.controller';

const forgotController = new ForgotController();

const router = Router({ mergeParams: true });

router.route('/forget').post(forgotController.forgot);
router.route('/resendOtp').put(forgotController.resend);
router.route('/verify').put(forgotController.verification);
router.route('/forgot').post(forgotController.forget);
router.route('/verifyLink').put(forgotController.verify);
router.route('/newPassword').put(forgotController.newPassword);

export default router;
