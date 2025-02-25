import router from '../client.router';
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
      name: 'jony',
      email: 'john455@google.com',
      phone: '9495939328',
      password: 'Ajay@123',
    };
  });
  it('create client', async () => {
    const response = await supertest(app).post('/addClient').send(userDetails);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
