import User from "../models/User.js";

export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;

  if (!email) {
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return;
  }

  await User.create({
    name: process.env.ADMIN_NAME || "Studio Admin",
    email,
    password: process.env.ADMIN_PASSWORD || "Admin@123",
    role: "admin"
  });

  console.log("Admin account seeded");
};
