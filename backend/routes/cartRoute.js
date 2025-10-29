import express from "express";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  updateCartProduct,
  updateOptionId,
} from "../controllers/cartController.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

 
router.get("/" , authUser, fetchCart);
router.post("/add" , authUser, addToCart);
router.post("/remove" , authUser,removeFromCart);
router.put("/update",authUser , updateCartProduct);
router.put("/updateOption",authUser , updateOptionId);


export default router;