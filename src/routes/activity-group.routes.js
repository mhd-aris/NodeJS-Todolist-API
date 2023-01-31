import { Router } from "express";
const router = Router();

import activityController from "../controllers/activity-group.controller.js";

// Get All
router.get("/", activityController.getActivity);

// Get One
router.get("/:id", activityController.getSingleActivity);

// Create
router.post("/", activityController.createActivity);

// Update
router.patch("/:id", activityController.updateActivity);

// Delete
router.delete("/:id", activityController.deleteActivity);

export default router;
