import { useEffect, useState } from "react";
import AdminPanel from "../components/AdminPanel";
import Loader from "../components/Loader";
import SectionHeading from "../components/SectionHeading";
import api from "../lib/api";
import { formatDate } from "../lib/format";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const [data, setData] = useState({ bookings: [], favorites: [], photos: [], blogs: [] });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadDashboard = async () => {
    const [bookingsResponse, favoritesResponse, photosResponse, blogsResponse] = await Promise.all([
      api.get("/bookings"),
      api.get("/users/favorites"),
      api.get("/photos"),
      api.get("/blogs")
    ]);

    setData({
      bookings: bookingsResponse.data.bookings,
      favorites: favoritesResponse.data.photos,
      photos: photosResponse.data.photos,
      blogs: blogsResponse.data.blogs
    });
  };

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await loadDashboard();
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  if (loading) {
    return <Loader label="Preparing your dashboard..." />;
  }

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Dashboard"
        title={`Welcome, ${user?.name?.split(" ")[0] || "Guest"}`}
        description="Track your booking requests, revisit favorite images, and manage studio content if you're an admin."
      />

      <section className="glass-panel p-6">
        <h3 className="text-xl font-semibold text-white">Your bookings</h3>
        <div className="mt-4 grid gap-4">
          {data.bookings.length ? (
            data.bookings.map((booking) => (
              <div key={booking._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium text-white">{booking.eventType}</p>
                    <p className="text-sm text-slate-400">{formatDate(booking.date)}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm capitalize text-slate-200">
                    {booking.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-300">{booking.message}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-400">No bookings yet. Use the contact form to request a session.</p>
          )}
        </div>
      </section>

      <section className="glass-panel p-6">
        <h3 className="text-xl font-semibold text-white">Favorite photos</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.favorites.length ? (
            data.favorites.map((photo) => (
              <div key={photo._id} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
                <img src={photo.imageUrl} alt={photo.title} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <p className="font-medium text-white">{photo.title}</p>
                  <p className="mt-1 text-sm capitalize text-slate-400">{photo.category}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-400">No favorites saved yet. Explore the portfolio and heart a few images.</p>
          )}
        </div>
      </section>

      {user?.role === "admin" ? (
        <AdminPanel
          photos={data.photos}
          bookings={data.bookings}
          blogs={data.blogs}
          onRefresh={loadDashboard}
        />
      ) : null}
    </div>
  );
}

export default DashboardPage;
