import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import UserModel from '../models/user';
import userRouter from '../routes/users';

const app = express();
app.use(express.json());
app.use('/api/users', userRouter);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING!);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /', () => {
  it('should return all authenticated users', async () => {
    const users = [
      new UserModel({ username: 'user1', password: 'password1'}),
      new UserModel({ username: 'user2', password: 'password2'}),
    ];

    await UserModel.insertMany(users);

    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('username', users[0].username);
    expect(res.body[0]).toHaveProperty('password', users[0].password);
    expect(res.body[1]).toHaveProperty('username', users[1].username);
    expect(res.body[1]).toHaveProperty('password', users[1].password);
  });

  it('should return 401 if no users are found', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(401);
  });
});

describe('POST /login', () => {
  it('should return the user if the credentials are valid', async () => {
    const user = new UserModel({ username: 'user1', password: 'password1'});
    await user.save();

    const res = await request(app).post('/login').send({ username: user.username, password: user.password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('username', user.username);
    expect(res.body).toHaveProperty('password', user.password);
  });

  it('should return 401 if the credentials are invalid either because of username or password', async () => {
    const res = await request(app).post('/login').send({ username: 'user1', password: 'password1' });

    expect(res.status).toBe(401);
  });
});

describe('POST /logout', () => {
  it('should return 200 if the user is logged out', async () => {
    const res = await request(app).post('/logout');

    expect(res.status).toBe(200);
  });
});