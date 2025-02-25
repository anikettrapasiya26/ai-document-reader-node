import router from '../auth.router';
import express from 'express';
import bodyParser from 'body-parser';
import supertest from 'supertest';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

describe('POST request', () => {
  let userDetails;
  beforeEach(function () {
    userDetails = {
      email: 'john123@gmail.com',
      password: '12345',
    };
  });

  it('signIn user data', async () => {
    const response = await supertest(app).post('/signin').send(userDetails);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('wrong password', async () => {
    const response = await supertest(app).post('/signin').send({
      email: 'john123@gmail.com',
      password: 'Art#@1265',
    });
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('wrong email', async () => {
    const response = await supertest(app).post('/signin').send({
      email: 'john3@gmail.com',
      password: 'Jay#@123',
    });
    expect(response.status).toBe(404);
    expect(response.body.error).toStrictEqual({
      message: 'User does not exists with this email! Please enter valid Email',
      title: 'Error',
    });
  });
});
