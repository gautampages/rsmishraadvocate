import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PracticeArea from "./pages/PracticeArea";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import Booking from "./pages/Booking";
import ToolsIndex from "./pages/ToolsIndex";
import StampDuty from "./pages/tools/StampDuty";
import CourtFee from "./pages/tools/CourtFee";
import Maintenance from "./pages/tools/Maintenance";
import Limitation from "./pages/tools/Limitation";
import CauseList from "./pages/tools/CauseList";
import Checklists from "./pages/Checklists";
import ChecklistDetail from "./pages/ChecklistDetail";
import Fees from "./pages/Fees";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";

/**
 * Route table. Every path here that should be crawlable must also appear in
 * src/data/routes.js, which drives prerendering and the sitemap.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="practice/:slug" element={<PracticeArea />} />
        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="book" element={<Booking />} />
        <Route path="tools" element={<ToolsIndex />} />
        <Route path="tools/stamp-duty-calculator" element={<StampDuty />} />
        <Route path="tools/court-fee-calculator" element={<CourtFee />} />
        <Route path="tools/maintenance-estimator" element={<Maintenance />} />
        <Route path="tools/limitation-checker" element={<Limitation />} />
        <Route path="tools/cause-list" element={<CauseList />} />
        <Route path="checklists" element={<Checklists />} />
        <Route path="checklists/:slug" element={<ChecklistDetail />} />
        <Route path="fees" element={<Fees />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="disclaimer" element={<Disclaimer />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
