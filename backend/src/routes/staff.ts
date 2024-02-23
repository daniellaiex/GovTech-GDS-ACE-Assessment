import express from "express";
import * as StaffController from "../controllers/staff";

const router = express.Router();

router.get("/", StaffController.getAllStaff);

router.get("/:staffPassId", StaffController.getStaffById);

export default router;