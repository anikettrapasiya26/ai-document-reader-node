import request from 'supertest';
import express from 'express';
import router from '../../api.router';

const app = express();
app.use(express.json());
app.use(router);

describe('user Route Testing : /resetPassword', () => {
  // Reset Password Successfully//

  test('Password reset successfully', async () => {
    const res = await request(app).put(`/password/reset_password`).send({
      newPassword: 'Vraj1@1235',
    });

    expect(res.status).toBe(200);
  });

  // NewPassword Same as oldPassword//
  test('You can not set new password same as old password ', async () => {
    const res = await request(app).put(`/password/reset_password`).send({
      newPassword: 'Vraj@123',
    });

    expect(res.status).toEqual(402);
  });

  // API not found//
  test('ResetPassword API not found', async () => {
    const res = await request(app).put(`/password/resetpassword`);

    expect(res.status).toBe(404);
  });
});
