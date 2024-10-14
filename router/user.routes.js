import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getAllUsersByClubName
} from "../controller/user.controller.js";
import verifyUserAuth from "../middleware/user.auth.middleware.js";

const router = Router();

// create user
router.route("/create").post(createUser);

// show single user
router.route("/get/:id").get(getUserById);

// update user
router.route("/update").put(verifyUserAuth, updateUser);



export default router;
