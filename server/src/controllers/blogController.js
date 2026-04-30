import Blog from "../models/Blog.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getBlogs = asyncHandler(async (_req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json({ blogs });
});

export const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    author: req.user._id
  });

  res.status(201).json({ blog });
});
