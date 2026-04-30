import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Camera, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import SectionHeading from "../components/SectionHeading";

function HomePage() {
  return (
    <div className="space-y-24">
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
          <p className="text-sm uppercase tracking-[0.35em] text-accent">Editorial photography studio</p>
          <h1 className="max-w-3xl font-display text-5xl leading-tight text-white sm:text-7xl">
            Intimate frames for weddings, portraits, and wild landscapes.
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Luma Studio blends cinematic composition with soft documentary storytelling. Explore the work, save your
            favorite frames, and book a session in minutes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/portfolio" className="rounded-full bg-white px-6 py-3 font-medium text-slate-950">
              Explore portfolio
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-white"
            >
              Plan your shoot <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {[
              ["120+", "Sessions delivered"],
              ["18", "Destination weddings"],
              ["24h", "Average reply time"]
            ].map(([value, label]) => (
              <div key={label} className="glass-panel p-4">
                <p className="font-display text-3xl text-white">{value}</p>
                <p className="mt-1 text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10"
        >
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"
            alt="Photography hero"
            className="h-[560px] w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="glass-panel p-4">
                <Camera className="text-accent" />
                <p className="mt-3 text-sm text-slate-300">Signature portrait direction</p>
              </div>
              <div className="glass-panel p-4">
                <CalendarDays className="text-accent" />
                <p className="mt-3 text-sm text-slate-300">Simple booking workflow</p>
              </div>
              <div className="glass-panel p-4">
                <Sparkles className="text-accent" />
                <p className="mt-3 text-sm text-slate-300">Curated gallery experience</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Book a session"
          title="Tell us about your date, location, and vision."
          description="Use the inquiry form to request weddings, portraits, branding shoots, or nature collaborations."
        />
        <BookingForm />
      </section>
    </div>
  );
}

export default HomePage;
