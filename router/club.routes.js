import { Router } from "express";
import {
  createClub,
  deleteClub,
  getAllClubs,
  getOneClub,
  updateClub,
} from "../controller/club.controller.js";

const router = Router();

// create club
router.route("/create").post(createClub);

// show all club
router.route("/getAll").get(getAllClubs);

// show one club
router.route("/get/:id").get(getOneClub);

// update club details
router.route("/update/:id").put(updateClub);

// delete club
router.route("/delete/:id").delete(deleteClub);

export default router;
