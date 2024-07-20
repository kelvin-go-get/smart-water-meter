import { Router } from "express";
import Meter from "../models/Meter.js";
import {
  addMeter,
  deleteMeter,
  getMeters,
  updateMeter,
} from "../controllers/meterController.js"; // Ensure the path and extension are correct

const router = Router();

router.post("/add", addMeter);
router.put("/update/:id", updateMeter); // Ensure proper route for update
router.delete("/delete/:id", deleteMeter); // Ensure proper route for delete
router.get("/all", getMeters);

export default router;
