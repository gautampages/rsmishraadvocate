import AssistantProvider from "./components/AssistantProvider";
import ChatWidget from "./components/ChatWidget";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CaseTracker from "./components/CaseTracker";
import Achievements from "./components/Achievements";
import Philosophy from "./components/Philosophy";
import Services from "./components/Services";
import WhyChoose from "./components/WhyChoose";
import Blog from "./components/Blog";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import AskAI from "./components/AskAI";
import VisitOffice from "./components/VisitOffice";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <AssistantProvider>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <CaseTracker />
        <Achievements />
        <Philosophy />
        <Services />
        <WhyChoose />
        <Blog />
        <Testimonials />
        <Faq />
        <AskAI />
        <VisitOffice />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BackToTop />
    </AssistantProvider>
  );
}
