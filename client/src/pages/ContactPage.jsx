import BookingForm from "../components/BookingForm";
import SectionHeading from "../components/SectionHeading";

function ContactPage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-6">
        <SectionHeading
          eyebrow="Contact"
          title="Reach out for bookings, collaborations, and editorial work."
          description="Share your date, venue, and creative direction. Replies are usually sent within 24 hours."
        />
        <div className="glass-panel space-y-3 p-6 text-slate-300">
          <p>Email: hello@lumastudio.com</p>
          <p>Phone: +91 90000 12345</p>
          <p>Based in: Jaipur, available worldwide</p>
        </div>
      </div>
      <BookingForm />
    </div>
  );
}

export default ContactPage;
