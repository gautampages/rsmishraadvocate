import Hero from "../components/Hero";
import CaseTracker from "../components/CaseTracker";
import Achievements from "../components/Achievements";
import Philosophy from "../components/Philosophy";
import Services from "../components/Services";
import WhyChoose from "../components/WhyChoose";
import BlogTeaser from "../components/BlogTeaser";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
import AskAI from "../components/AskAI";
import VisitOffice from "../components/VisitOffice";
import Contact from "../components/Contact";
import Seo from "../components/Seo";
import { faqs } from "../data/content";

// The FAQ block is also emitted as static markup in index.html for the home
// page; repeating it here keeps it correct when a visitor arrives via SPA
// navigation rather than a fresh load.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <Seo jsonLd={faqJsonLd} />
      <Hero />
      <CaseTracker />
      <AskAI />
      <Achievements />
      <Philosophy />
      <Services />
      <WhyChoose />
      <BlogTeaser />
      <Testimonials />
      <Faq />
      <VisitOffice />
      <Contact />
    </>
  );
}
