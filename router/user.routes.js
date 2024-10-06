import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getAllUsersByClubName
} from "../controller/user.controller.js";

const router = Router();

// create user
router.route("/create").post(createUser);

// show all user
router.route("/getAll").get(getAllUsers);

// show single user
router.route("/get/:id").get(getUserById);

// show users by club name
router.route("/:clubName").get(getAllUsersByClubName);

// update user
router.route("/update/:id").put(updateUser);

// delete user
router.route("/delete/:id").delete(deleteUser);


export default router;
