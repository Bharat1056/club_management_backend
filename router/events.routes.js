import { Router } from "express";
import verifyClubAuth from "../middleware/club.auth.middleware.js";
import {
  createEvent,
  deleteEvent,
  getUpComingEvents,
  updateEvent,
} from "../controller/event.controller.js";
const router = Router();

// create
router.post("/create", verifyClubAuth, createEvent);
// update
router.put("/update/:id", verifyClubAuth, updateEvent);
// delete
router.delete("/delete/:id", verifyClubAuth, deleteEvent);

// upcoming events - only 3
router.get("/upcoming", getUpComingEvents);

export default router;
