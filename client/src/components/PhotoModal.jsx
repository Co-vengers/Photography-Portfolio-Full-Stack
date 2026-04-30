import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

function PhotoModal({ photo, onClose }) {
  return (
    <AnimatePresence>
      {photo ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white"
            >
              <X size={18} />
            </button>
            <div className="grid gap-0 md:grid-cols-[1.4fr_0.9fr]">
              <img src={photo.imageUrl} alt={photo.title} className="h-full max-h-[90vh] w-full object-cover" />
              <div className="flex flex-col justify-center p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{photo.category}</p>
                <h3 className="mt-3 font-display text-4xl text-white">{photo.title}</h3>
                <p className="mt-4 text-slate-300">{photo.description}</p>
                <div className="mt-6 space-y-2 text-sm text-slate-400">
                  <p>Location: {photo.location}</p>
                  <p>Shot type: {photo.lens}</p>
                  <p>Featured: {photo.featured ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default PhotoModal;
