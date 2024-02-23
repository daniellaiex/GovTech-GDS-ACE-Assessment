import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import StaffModel from '../models/Staff';
import staffRouter from '../routes/staff';

const app = express();
app.use(express.json());
app.use('/api/staff', staffRouter);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING!);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /', () => {
  it('should return all staff', async () => {
    const staff = [
      new StaffModel({ staff_pass_id: '1', team_name: 'Team 1', created_at: Date.now() }),
      new StaffModel({ staff_pass_id: '2', team_name: 'Team 2', created_at: Date.now() }),
    ];
    await StaffModel.insertMany(staff);

    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('staff_pass_id', staff[0].staff_pass_id);
    expect(res.body[0]).toHaveProperty('team_name', staff[0].team_name);
    expect(res.body[0]).toHaveProperty('created_at', staff[0].created_at);
    expect(res.body[1]).toHaveProperty('staff_pass_id', staff[1].staff_pass_id);
    expect(res.body[1]).toHaveProperty('team_name', staff[1].team_name);
    expect(res.body[1]).toHaveProperty('created_at', staff[1].created_at);
  });

  it('should return 404 if no staff are found', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(404);
  });
});

describe('GET /:staffPassId', () => {
  it('should return a staff by id', async () => {
    const staff = new StaffModel({ staff_pass_id: '1', team_name: 'Team 1', created_at: Date.now() });
    await staff.save();

    const res = await request(app).get(`/${staff.staff_pass_id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('staff_pass_id', staff.staff_pass_id);
    expect(res.body).toHaveProperty('team_name', staff.team_name);
    expect(res.body).toHaveProperty('created_at', staff.created_at);
  });

  it('should return 404 if no staff is found', async () => {
    const res = await request(app).get('/nonexistent');

    expect(res.status).toBe(404);
  });
});