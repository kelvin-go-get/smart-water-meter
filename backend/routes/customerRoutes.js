// routes/customerRoutes.js
import { Router } from "express";
import {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
} from "../controllers/customerController.js";

const router = Router();

router.post("/add", addCustomer);
router.put("/update/:id", updateCustomer);
router.delete("/delete/:id", deleteCustomer);
router.get("/all", getCustomers);

export default router;
