import { useState } from "react";
import api from "../lib/api";

const initialState = {
  name: "",
  email: "",
  eventType: "Wedding",
  date: "",
  time: "",
  message: ""
};

function BookingForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      await api.post("/bookings", form);
      setFeedback({ type: "success", message: "Booking request sent successfully." });
      setForm(initialState);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Unable to create booking right now."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel grid gap-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <select
          name="eventType"
          value={form.eventType}
          onChange={handleChange}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
        >
          <option>Wedding</option>
          <option>Portrait</option>
          <option>Nature</option>
          <option>Branding</option>
        </select>
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          required
        />
        <input
          name="time"
          value={form.time}
          onChange={handleChange}
          type="time"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          required
        />
      </div>
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Tell us about your session, venue, or creative direction..."
        rows="5"
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
        required
      />
      {feedback.message ? (
        <p className={feedback.type === "success" ? "text-emerald-400" : "text-rose-400"}>{feedback.message}</p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-white px-6 py-3 font-medium text-slate-950 transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send booking request"}
      </button>
    </form>
  );
}

export default BookingForm;
