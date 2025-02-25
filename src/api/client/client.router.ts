/**patientdetails routers
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description:Add all routers for Patient Profile details with show family member is here.
 */
import { Router } from 'express';

import ClientController from './client.controller';

const clientController = new ClientController();

const router = Router({ mergeParams: true });
router.route('/clientList').get(clientController.userList);
router.route('/clientDetail').get(clientController.userDetail);
router.route('/updateClient').put(clientController.userUpdate);
router.route('/deleteClient').delete(clientController.userDelete);
router.route('/addClient').post(clientController.addClient);

export default router;
