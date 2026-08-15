import { Outlet } from "react-router";
import AssistantProvider from "./AssistantProvider";
import AppointmentProvider from "./AppointmentProvider";
import ChatWidget from "./ChatWidget";
import ScrollProgress from "./ScrollProgress";
import BackToTop from "./BackToTop";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollManager from "./ScrollManager";
import AppointmentStatus from "./AppointmentStatus";

/**
 * Shell shared by every route: the chrome (nav, footer, floating actions, the
 * AI assistant and appointment state) mounts once and survives navigation, so
 * the chat thread is not lost when a visitor moves from the home page to a
 * calculator — and revoking an appointment in the popup unlocks the booking
 * form in the same instant.
 */
export default function Layout() {
  return (
    <AssistantProvider>
      <AppointmentProvider>
        <ScrollManager />
        <ScrollProgress />
        <a href="#main" className="skiplink">Skip to content</a>
        <Navbar />
        <main id="main">
          <Outlet />
        </main>
        <Footer />
        <AppointmentStatus />
        <ChatWidget />
        <BackToTop />
      </AppointmentProvider>
    </AssistantProvider>
  );
}
