import express from "express";
import { getFavorites, toggleFavorite } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/favorites", protect, getFavorites);
router.patch("/favorites/:photoId", protect, toggleFavorite);

export default router;
