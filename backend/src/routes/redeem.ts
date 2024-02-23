import express from "express";
import * as RedeemController from "../controllers/redeem";

const router = express.Router();

router.get("/", RedeemController.getAllTeams);

router.patch("/:teamName", RedeemController.updateTeamRedeemed);

export default router;