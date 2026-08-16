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

// The FAQ block is also emitted as static markup in index.html for the home
// page; repeating it here keeps it correct when a visitor arrives via SPA
// navigation rather than a fresh load.

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      {/* Services (the local, converting content) renders before the
          CaseTracker/AskAI utilities so the page leads with what the
          chamber does at Hajipur, not with the all-India tools. */}
      <Services />
      <CaseTracker />
      <AskAI />
      <Achievements />
      <Philosophy />
      <WhyChoose />
      <BlogTeaser />
      <Testimonials />
      <Faq />
      <VisitOffice />
      <Contact />
    </>
  );
}
