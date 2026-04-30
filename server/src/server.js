import app from "./app.js";
import connectDB from "./config/db.js";
import { seedAdmin } from "./utils/seedAdmin.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    await seedAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server", error);
    process.exit(1);
  }
};

start();
