import Photo from "../models/Photo.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getPhotos = asyncHandler(async (_req, res) => {
  const photos = await Photo.find().sort({ createdAt: -1 });
  res.json({ photos });
});

export const createPhoto = asyncHandler(async (req, res) => {
  const imageUrl = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : req.body.imageUrl;

  if (!imageUrl) {
    const error = new Error("Image file or image URL is required");
    error.statusCode = 400;
    throw error;
  }

  const photo = await Photo.create({
    ...req.body,
    imageUrl,
    createdBy: req.user._id
  });

  res.status(201).json({ photo });
});

export const deletePhoto = asyncHandler(async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  if (!photo) {
    const error = new Error("Photo not found");
    error.statusCode = 404;
    throw error;
  }

  await photo.deleteOne();
  res.json({ message: "Photo deleted" });
});
