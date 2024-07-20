import { Router } from "express";
const router = Router();
import { addPayment, getPayments } from "../controllers/paymentController";

router.post("/", addPayment);
router.get("/", getPayments);

export default router;
