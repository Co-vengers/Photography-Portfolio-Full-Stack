import { useState } from "react";
import api from "../lib/api";

const photoDefaults = {
  title: "",
  category: "wedding",
  description: "",
  location: "",
  lens: "",
  imageUrl: "",
  image: null
};

const blogDefaults = {
  title: "",
  excerpt: "",
  content: ""
};

function AdminPanel({ photos, bookings, blogs, onRefresh }) {
  const [photoForm, setPhotoForm] = useState(photoDefaults);
  const [blogForm, setBlogForm] = useState(blogDefaults);
  const [busy, setBusy] = useState("");

  const updateBookingStatus = async (id, status) => {
    setBusy(id);
    try {
      await api.patch(`/bookings/${id}/status`, { status });
      await onRefresh();
    } finally {
      setBusy("");
    }
  };

  const submitPhoto = async (event) => {
    event.preventDefault();
    setBusy("photo");
    try {
      const formData = new FormData();
      formData.append("title", photoForm.title);
      formData.append("category", photoForm.category);
      formData.append("description", photoForm.description);
      formData.append("location", photoForm.location);
      formData.append("lens", photoForm.lens);
      if (photoForm.image) {
        formData.append("image", photoForm.image);
      }
      if (photoForm.imageUrl) {
        formData.append("imageUrl", photoForm.imageUrl);
      }

      await api.post("/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setPhotoForm(photoDefaults);
      await onRefresh();
    } finally {
      setBusy("");
    }
  };

  const submitBlog = async (event) => {
    event.preventDefault();
    setBusy("blog");
    try {
      await api.post("/blogs", blogForm);
      setBlogForm(blogDefaults);
      await onRefresh();
    } finally {
      setBusy("");
    }
  };

  const deletePhoto = async (id) => {
    setBusy(id);
    try {
      await api.delete(`/photos/${id}`);
      await onRefresh();
    } finally {
      setBusy("");
    }
  };

  return (
    <div className="grid gap-6">
      <section className="glass-panel p-6">
        <h3 className="text-xl font-semibold text-white">Upload portfolio photo</h3>
        <form onSubmit={submitPhoto} className="mt-4 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={photoForm.title}
              onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
              placeholder="Title"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              required
            />
            <select
              value={photoForm.category}
              onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <option value="wedding">Wedding</option>
              <option value="portrait">Portrait</option>
              <option value="nature">Nature</option>
              <option value="event">Event</option>
            </select>
            <input
              value={photoForm.location}
              onChange={(e) => setPhotoForm({ ...photoForm, location: e.target.value })}
              placeholder="Location"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              required
            />
            <input
              value={photoForm.lens}
              onChange={(e) => setPhotoForm({ ...photoForm, lens: e.target.value })}
              placeholder="Lens / Setup"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            />
            <input
              value={photoForm.imageUrl}
              onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
              placeholder="Image URL (optional if uploading)"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 md:col-span-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoForm({ ...photoForm, image: e.target.files?.[0] || null })}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 md:col-span-2"
            />
          </div>
          <textarea
            value={photoForm.description}
            onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
            placeholder="Description"
            rows="4"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            required
          />
          <button className="w-fit rounded-full bg-white px-5 py-3 text-slate-950">
            {busy === "photo" ? "Saving..." : "Add photo"}
          </button>
        </form>
      </section>

      <section className="glass-panel p-6">
        <h3 className="text-xl font-semibold text-white">Manage bookings</h3>
        <div className="mt-4 grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-white">{booking.name}</p>
                  <p>{booking.eventType}</p>
                  <p>{booking.email}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateBookingStatus(booking._id, "approved")}
                    disabled={busy === booking._id}
                    className="rounded-full bg-emerald-500 px-4 py-2 text-slate-950"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateBookingStatus(booking._id, "rejected")}
                    disabled={busy === booking._id}
                    className="rounded-full bg-rose-500 px-4 py-2 text-white"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel p-6">
        <h3 className="text-xl font-semibold text-white">Add blog post</h3>
        <form onSubmit={submitBlog} className="mt-4 grid gap-4">
          <input
            value={blogForm.title}
            onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
            placeholder="Post title"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            required
          />
          <input
            value={blogForm.excerpt}
            onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
            placeholder="Short excerpt"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            required
          />
          <textarea
            value={blogForm.content}
            onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
            rows="5"
            placeholder="Write the blog post..."
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            required
          />
          <button className="w-fit rounded-full bg-white px-5 py-3 text-slate-950">
            {busy === "blog" ? "Publishing..." : "Publish post"}
          </button>
        </form>
        <div className="mt-5 grid gap-3">
          {blogs.map((blog) => (
            <div key={blog._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-white">{blog.title}</p>
              <p className="mt-1 text-sm text-slate-400">{blog.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel p-6">
        <h3 className="text-xl font-semibold text-white">Current portfolio items</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {photos.map((photo) => (
            <div key={photo._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-white">{photo.title}</p>
                  <p className="text-sm text-slate-400">{photo.category}</p>
                </div>
                <button
                  onClick={() => deletePhoto(photo._id)}
                  disabled={busy === photo._id}
                  className="rounded-full bg-rose-500 px-4 py-2 text-sm text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminPanel;
