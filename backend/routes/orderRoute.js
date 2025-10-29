import express from "express";

import authUser from "../middleware/authUser.js";
import { addOrder, fetchOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get("/" , authUser, fetchOrders);
router.post("/add" , authUser, addOrder);

export default router;