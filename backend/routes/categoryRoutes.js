import express from "express";
const router = express.Router();
import { getProductsByCategory } from "../controllers/productController.js";

router.route("/:category").get(getProductsByCategory);

export default router;
