import { motion } from "framer-motion";

function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-2xl"
    >
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h2 className="font-display text-4xl text-white sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-slate-300">{description}</p> : null}
    </motion.div>
  );
}

export default SectionHeading;
