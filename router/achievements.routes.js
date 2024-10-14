import { Router } from "express";
import verifyClubAuth from "../middleware/club.auth.middleware";
import {
  createAchievement,
  deleteAchievement,
  getUpComingAchievements,
  updateAchievement,
} from "../controller/achievement.controller";

const router = Router();

// admin middleware

// create
router.route("/create").post(verifyClubAuth, createAchievement);
// update
router.route("/update").put(verifyClubAuth, updateAchievement);
// delete
router.route("/delete").delete(verifyClubAuth, deleteAchievement);

// trending achievements - only 3
router.route("/upcoming").get(getUpComingAchievements);

export default router;
