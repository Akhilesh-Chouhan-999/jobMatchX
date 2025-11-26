import express from "express";
import {
  saveJob,
  applyJob,
  ignoreJob,
  getSavedJobs,
  getAppliedJobs
} from "../controllers/application.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/save", protect, saveJob);

router.post("/apply", protect, applyJob);


router.post("/ignore", protect, ignoreJob);


router.get("/saved", protect, getSavedJobs);


router.get("/applied", protect, getAppliedJobs);

export default router;
