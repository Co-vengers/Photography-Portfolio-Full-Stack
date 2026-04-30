import Photo from "../models/Photo.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { canUploadFiles, uploadImage } from "../utils/uploadImage.js";

export const getPhotos = asyncHandler(async (_req, res) => {
  const photos = await Photo.find().sort({ createdAt: -1 });
  res.json({ photos });
});

export const createPhoto = asyncHandler(async (req, res) => {
  let imageUrl = req.body.imageUrl;

  if (req.file) {
    if (!canUploadFiles()) {
      const error = new Error("File upload is unavailable. Add Cloudinary env vars or provide image URL.");
      error.statusCode = 400;
      throw error;
    }

    imageUrl = await uploadImage(req.file);
  }

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
