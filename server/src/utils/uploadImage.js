import { v2 as cloudinary } from "cloudinary";

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
}

const bufferToDataUri = (mimetype, buffer) => {
  const base64 = buffer.toString("base64");
  return `data:${mimetype};base64,${base64}`;
};

export const uploadImage = async (file) => {
  if (!isCloudinaryConfigured) {
    return null;
  }

  const dataUri = bufferToDataUri(file.mimetype, file.buffer);
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: process.env.CLOUDINARY_FOLDER || "photo-portfolio"
  });

  return result.secure_url;
};

export const canUploadFiles = () => isCloudinaryConfigured;
