import Booking from "../models/Booking.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { name, email, eventType, date, time, message } = req.body;
  const booking = await Booking.create({
    name,
    email,
    eventType,
    date,
    time,
    message,
    user: req.user?._id || undefined
  });

  res.status(201).json({ booking });
});

export const getBookings = asyncHandler(async (req, res) => {
  const query = req.user.role === "admin" ? {} : { user: req.user._id };
  const bookings = await Booking.find(query).sort({ createdAt: -1 });
  res.json({ bookings });
});

export const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    const error = new Error("Booking not found");
    error.statusCode = 404;
    throw error;
  }

  booking.status = req.body.status;
  await booking.save();

  res.json({ booking });
});
