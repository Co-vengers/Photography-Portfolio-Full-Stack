import SectionHeading from "../components/SectionHeading";

function AboutPage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6">
        <SectionHeading
          eyebrow="About"
          title="Photography that feels editorial, but never distant."
          description="We build galleries with emotion, calm direction, and a lot of attention to detail."
        />
        <p className="text-slate-300">
          Luma Studio specializes in wedding stories, refined portraits, and destination landscape work. The approach
          is guided, but never stiff. Quiet moments matter just as much as statement frames.
        </p>
        <p className="text-slate-300">
          From moodboarding to delivery, the experience is designed to feel easy, personal, and visually consistent.
        </p>
      </div>
      <div className="overflow-hidden rounded-[2.5rem] border border-white/10">
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80"
          alt="Photographer portrait"
          className="h-full min-h-[420px] w-full object-cover"
        />
      </div>
    </div>
  );
}

export default AboutPage;
