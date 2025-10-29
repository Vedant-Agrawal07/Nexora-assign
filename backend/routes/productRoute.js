import express from "express";
import {productFetch,  productSearch } from "../controllers/productController.js";

const router = express.Router();

router.get("/" , productFetch);
router.get("/find", productSearch);

export default router;