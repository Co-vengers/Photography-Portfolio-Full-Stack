import { Heart } from "lucide-react";
import { motion } from "framer-motion";

function PhotoCard({ photo, onPreview, onToggleFavorite, isFavorite, showActions = true }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
    >
      <button onClick={() => onPreview(photo)} className="relative w-full overflow-hidden text-left">
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{photo.category}</p>
          <h3 className="mt-2 text-xl font-medium text-white">{photo.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-slate-300">{photo.description}</p>
        </div>
      </button>
      {showActions ? (
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-sm text-slate-400">{photo.location}</span>
          <button
            onClick={() => onToggleFavorite(photo._id)}
            className={`rounded-full p-2 transition ${
              isFavorite ? "bg-accent text-slate-950" : "bg-white/10 text-white"
            }`}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      ) : null}
    </motion.article>
  );
}

export default PhotoCard;
