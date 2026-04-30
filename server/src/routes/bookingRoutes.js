import express from "express";
import { createBooking, getBookings, updateBookingStatus } from "../controllers/bookingController.js";
import { adminOnly, optionalProtect, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", optionalProtect, createBooking);
router.get("/", protect, getBookings);
router.patch("/:id/status", protect, adminOnly, updateBookingStatus);

export default router;
