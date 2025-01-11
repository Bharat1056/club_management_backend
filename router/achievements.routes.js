import { Router } from "express";
import verifyClubAuth from "../middleware/club.auth.middleware.js";
import {
  createAchievement,
  deleteAchievement,
  getUpComingAchievements,
  updateAchievement,
  AllAchievements
} from "../controller/achievement.controller.js";

const router = Router();

// admin middleware

// create
router.route("/create").post(verifyClubAuth, createAchievement);
// update
router.route("/update/:id").put(verifyClubAuth, updateAchievement);
// delete
router.route("/delete/:id").delete(verifyClubAuth, deleteAchievement);

// trending achievements - only 3
router.route("/upcoming").get(getUpComingAchievements);
router.route("/getAllAchievements").get(AllAchievements);
export default router;
