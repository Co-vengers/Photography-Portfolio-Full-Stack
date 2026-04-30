import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import { seedAdmin } from "../src/utils/seedAdmin.js";

let isReady = false;

async function initializeApp() {
  try {
    if (!isReady) {
      await connectDB();
      await seedAdmin();
      isReady = true;
    }
  } catch (error) {
    console.error("Failed to initialize serverless API", error);
    throw error;
  }
}

export default async function handler(req, res) {
  try {
    await initializeApp();

    // Add explicit CORS headers for Vercel serverless
    const origin = req.headers.origin || req.headers.referer?.split("/").slice(0, 3).join("/");
    const allowedOrigins = [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      process.env.CLIENT_URL,
      ...(process.env.CLIENT_URLS || "").split(",").map((o) => o.trim()).filter(Boolean)
    ];

    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Requested-With"
      );
    }

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    app(req, res);
  } catch (error) {
    console.error("Handler error", error);
    res.status(500).json({ message: "Server initialization failed" });
  }
}
