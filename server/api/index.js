import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import { seedAdmin } from "../src/utils/seedAdmin.js";

let isReady = false;

export default async function handler(req, res) {
  try {
    if (!isReady) {
      await connectDB();
      await seedAdmin();
      isReady = true;
    }

    return app(req, res);
  } catch (error) {
    console.error("Failed to initialize serverless API", error);
    return res.status(500).json({ message: "Server initialization failed" });
  }
}
