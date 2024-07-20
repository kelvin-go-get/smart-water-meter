import { Router } from "express";
import { addReading, gatReadings } from "../controllers/readingsController";

const router = Router();

router.post("/add", addReading);
router.get("/all", gatReadings);

export default router;
