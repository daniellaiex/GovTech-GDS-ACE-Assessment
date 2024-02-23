import { RequestHandler } from "express";
import StaffModel from "../models/Staff";
import createHttpError from "http-errors";

export const getAllStaff: RequestHandler = async (req, res, next) => {
  try {
    const staff = await StaffModel.find().exec();
    res.status(200).json(staff);
  } catch (error) {
    next(error);
  }
};

export const getStaffById: RequestHandler = async (req, res, next) => {
  const staffPassId = req.params.staffPassId;
  try {
    const staff = await StaffModel.find({ staff_pass_id: new RegExp('^' + staffPassId, 'i') }).exec();

    if (!staff || staff.length === 0) {
      throw createHttpError(404, "Staff not found");
    }

    res.status(200).json(staff);
  } catch (error) {
    next(error);
  }
};