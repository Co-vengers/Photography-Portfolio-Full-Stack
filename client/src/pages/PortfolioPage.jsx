import { useEffect, useMemo, useState } from "react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import PhotoCard from "../components/PhotoCard";
import PhotoModal from "../components/PhotoModal";
import SectionHeading from "../components/SectionHeading";

const filters = ["all", "wedding", "portrait", "nature", "event"];

function PortfolioPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const { user, updateUser } = useAuth();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await api.get("/photos");
        setPhotos(data.photos);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") {
      return photos;
    }
    return photos.filter((photo) => photo.category === activeFilter);
  }, [activeFilter, photos]);

  const toggleFavorite = async (photoId) => {
    if (!user) {
      return;
    }
    const { data } = await api.patch(`/users/favorites/${photoId}`);
    updateUser(data.user);
  };

  if (loading) {
    return <Loader label="Curating the gallery..." />;
  }

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Portfolio"
        title="A gallery built around story, texture, and natural light."
        description="Browse by category, preview each frame, and save favorites to your dashboard."
      />
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-5 py-2 text-sm capitalize transition ${
              activeFilter === filter ? "bg-white text-slate-950" : "border border-white/10 bg-white/5 text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo._id}
            photo={photo}
            onPreview={setSelectedPhoto}
            onToggleFavorite={toggleFavorite}
            isFavorite={Boolean(user?.favorites?.includes(photo._id))}
          />
        ))}
      </div>
      <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}

export default PortfolioPage;
