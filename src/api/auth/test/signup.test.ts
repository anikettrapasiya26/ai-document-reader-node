import router from '../auth.router';
import express from 'express';
import bodyParser from 'body-parser';
import supertest from 'supertest';
import nodemailer from 'nodemailer';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

describe('POST request', () => {
  let userDetails;
  beforeEach(async function () {
    userDetails = {
      name: 'art',
      email: (await nodemailer.createTestAccount()).user,
      phone: '4143221212',
      password: 'Jay#@123',
    };
  });

  it('Create user data', async () => {
    const response = await supertest(app).post('/signup').send(userDetails);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('without body', async () => {
    const response = await supertest(app).post('/signup').send();
    expect(response.status).toBe(400);
  });

  it('if Email patterns was wrong', async () => {
    const response = await supertest(app).post('/signup').send({
      name: 'art',
      email: 'john3gmail.com',
      phone: '4143221212',
      password: 'Jay#@123',
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toStrictEqual({
      message: '"email" must be a valid email',
      title: 'Error',
    });
  });

  // it('if password patterns was wrong', async () => {
  //   const response = await supertest(app).post('/signup').send({
  //     name: 'art',
  //     email: 'john3@gmail.com',
  //     phone: '4143221212',
  //     password: 'jay#@123',
  //   });
  //   expect(response.status).toBe(400);
  // });

  // it('if password length is less than 8', async () => {
  //   const response = await supertest(app).post('/signup').send({
  //     name: 'art',
  //     email: 'john3@gmail.com',
  //     phone: '4143221212',
  //     password: 'jay#@12',
  //   });
  //   expect(response.status).toBe(400);
  // });

  it('If patient was Already signup', async () => {
    const response = await supertest(app).post('/signup').send({
      name: 'art',
      email: 'john123@gmail.com',
      phone: '4143221212',
      password: 'Jay#@123',
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toStrictEqual({
      message:
        'The mail id you entered is already exists. Please try another mail id.',
      title: 'Error',
    });
  });

  // it('If any field was empty', async () => {
  //   const response = await supertest(app).post('/signup').send({
  //     name: 'art',
  //     email: 'john123@gmail.com',
  //     phone: '4143221212',
  //     password: 'Jay#@123',
  //   });
  //   expect(response.status).toBe(400);
  //   expect(response.body.error).toStrictEqual({
  //     message: '"country_code" is not allowed to be empty',
  //     title: 'Error',
  //   });
  // });

  // it('Field Required Error', async () => {
  //   const response = await supertest(app).post('/signup').send({
  //     name: 'art',
  //     email: 'john123@gmail.com',
  //     phone: '4143221212',
  //     password: 'Jay#@123',
  //   });
  //   expect(response.status).toBe(400);
  //   expect(response.body.error).toStrictEqual({
  //     message: '"country_code" is required',
  //     title: 'Error',
  //   });
  // });
});
