import express from "express";
import { createBlog, getBlogs } from "../controllers/blogController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", protect, adminOnly, createBlog);

export default router;
