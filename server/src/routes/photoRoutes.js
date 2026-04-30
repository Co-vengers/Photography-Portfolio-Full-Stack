import express from "express";
import { createPhoto, deletePhoto, getPhotos } from "../controllers/photoController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getPhotos);
router.post("/", protect, adminOnly, upload.single("image"), createPhoto);
router.delete("/:id", protect, adminOnly, deletePhoto);

export default router;
