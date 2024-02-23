import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import RedeemModel from '../models/Redeem';
import redeemRouter from '../routes/redeem';

const app = express();
app.use(express.json());
app.use('/api/redeem', redeemRouter);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING!);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /', () => {
  it('should return all teams', async () => {
    const teams = [
      new RedeemModel({ team_name: 'Team 1', redeemed: false, created_at: Date.now() }),
      new RedeemModel({ team_name: 'Team 2', redeemed: false, created_at: Date.now() }),
    ];
    await RedeemModel.insertMany(teams);

    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('team_name');
    expect(res.body[0]).toHaveProperty('redeemed');
    expect(res.body[0]).toHaveProperty('created_at');
  });

  it('should return 404 if no teams are found', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(404);
  });
});

describe('PATCH /:teamName', () => {
  it('should return all teams with the updated value in redeemed', async () => {
    const teams = [
      new RedeemModel({ team_name: 'Team 3', redeemed: false, updated_at: Date.now() }),
      new RedeemModel({ team_name: 'Team 4', redeemed: false, updated_at: Date.now() }),
    ];
    await RedeemModel.insertMany(teams);

    const res = await request(app).patch('/Team 3');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('team_name', teams[0].team_name);
    expect(res.body[0]).toHaveProperty('redeemed', true);
    expect(res.body[0]).toHaveProperty('created_at', teams[0].updated_at);
    expect(res.body[1]).toHaveProperty('team_name', teams[1].team_name);
    expect(res.body[1]).toHaveProperty('redeemed', false);
    expect(res.body[1]).toHaveProperty('created_at', teams[1].updated_at);
  });

  it('should respond with a 404 status code for non-existing team', async () => {
    const res = await request(app).patch('/nonExistingTeamName');
    expect(res.status).toBe(404);
  });

  it('should respond with a 400 status code for invalid team name', async () => {
    const res = await request(app).patch('/');
    expect(res.status).toBe(400);
  });
});