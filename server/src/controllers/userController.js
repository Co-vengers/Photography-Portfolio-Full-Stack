import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const serializeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  favorites: user.favorites || []
});

export const toggleFavorite = asyncHandler(async (req, res) => {
  const { photoId } = req.params;
  const user = await User.findById(req.user._id);

  const exists = user.favorites.some((favorite) => favorite.toString() === photoId);
  user.favorites = exists
    ? user.favorites.filter((favorite) => favorite.toString() !== photoId)
    : [...user.favorites, photoId];

  await user.save();

  res.json({ user: serializeUser(user) });
});

export const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("favorites");
  res.json({ photos: user.favorites });
});
