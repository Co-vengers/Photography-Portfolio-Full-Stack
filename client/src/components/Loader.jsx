function Loader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[30vh] flex-col items-center justify-center gap-4 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-accent" />
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}

export default Loader;
