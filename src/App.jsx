import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Achievements from "./components/Achievements";
import Philosophy from "./components/Philosophy";
import Services from "./components/Services";
import WhyChoose from "./components/WhyChoose";
import Blog from "./components/Blog";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import VisitOffice from "./components/VisitOffice";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Achievements />
        <Philosophy />
        <Services />
        <WhyChoose />
        <Blog />
        <Testimonials />
        <Faq />
        <VisitOffice />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
