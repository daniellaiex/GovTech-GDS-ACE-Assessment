import { RequestHandler } from "express";
import RedeemModel from "../models/Redeem";
import createHttpError from "http-errors";

export const getAllTeams: RequestHandler = async (req, res, next) => {
  try {
    const teams = await RedeemModel.find().exec();

    if (!teams) {
      throw createHttpError(404, "Teams not found");
    }

    res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
};

export const updateTeamRedeemed: RequestHandler = async (req, res, next) => {
  const teamName = req.params.teamName;

  try {
    if (!teamName) {
      throw createHttpError(400, "Invalid Team Name");
    }

    const team = await RedeemModel.findOneAndUpdate({team_name: teamName}, {redeemed: true, updated_at: Date.now()}, {new: true}).exec();

    if (!team) {
      throw createHttpError(404, "Team not found");
    }

    const updatedTeams = await RedeemModel.find().exec();

    res.status(200).json(updatedTeams);
  } catch (error) {
    next(error);
  }
};