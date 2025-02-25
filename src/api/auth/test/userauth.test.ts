import router from '../../users/users.router';
import express from 'express';
import bodyParser from 'body-parser';
import supertest from 'supertest';
import router2 from '../auth.router';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
const app2 = express();
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));
app2.use(router2);

describe('GET request', () => {
  let temp = '';
  it('signIn user data', async () => {
    const response = await supertest(app2).post('/signin').send({
      email: 'tonnypathan3@gmail.com',
      password: '12345',
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    temp = response.body.data.token;
  });

  it('Invalid token', async () => {
    const response = await supertest(app2)
      .get('/detail')
      .set(
        'Authorization',
        `Bearer xyJhbGcihiJIUzI1NiIsInR5cCI6IbpXVCJ9.eyJpZCI6eyJpZCI6MTV9LCJpYXQiOjE2NTkwMDQ4NzgsImV4cCI6MTY1OTA5MTI3OH0.L_dfMJb1tCbd_WJ6UC41ByK9R-50UCL9mKqkknPcOQ4`,
      );
    expect(response.status).toBe(404);
  });

  it('token is empty', async () => {
    const response = await supertest(app2)
      .get('/detail')
      .set('Authorization', `Bearer`);
    expect(response.status).toBe(404);
  });
});
