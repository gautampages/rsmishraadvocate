import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PracticeArea from "./pages/PracticeArea";
import HajipurCourt from "./pages/HajipurCourt";
import HindiPage from "./pages/HindiPage";
import BnsHub from "./pages/BnsHub";
import BnsSection from "./pages/BnsSection";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import Booking from "./pages/Booking";
import CaseStatus from "./pages/CaseStatus";
import CaseStatusDistrict from "./pages/CaseStatusDistrict";
import Ask from "./pages/Ask";
import CaseLaw from "./pages/CaseLaw";
import CaseLawTopic from "./pages/CaseLawTopic";
import Judgment from "./pages/Judgment";
import ToolsIndex from "./pages/ToolsIndex";
import StampDuty from "./pages/tools/StampDuty";
import LandUnits from "./pages/tools/LandUnits";
import IpcBns from "./pages/tools/IpcBns";
import CourtFee from "./pages/tools/CourtFee";
import Maintenance from "./pages/tools/Maintenance";
import Limitation from "./pages/tools/Limitation";
import CauseList from "./pages/tools/CauseList";
import Mact from "./pages/tools/Mact";
import ChequeBounce from "./pages/tools/ChequeBounce";
import Vanshavali from "./pages/tools/Vanshavali";
import ConsumerFee from "./pages/tools/ConsumerFee";
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
        <Route path="hajipur-civil-court" element={<HajipurCourt />} />
        <Route path="hi" element={<HindiPage />} />
        {/* Section pages sit under /hi/bns before the generic /hi/:slug catch. */}
        <Route path="hi/bns" element={<BnsHub />} />
        <Route path="hi/bns/:slug" element={<BnsSection />} />
        <Route path="hi/bnss/:slug" element={<BnsSection />} />
        <Route path="hi/:slug" element={<HindiPage />} />
        <Route path="bns" element={<BnsHub />} />
        <Route path="bns/:slug" element={<BnsSection />} />
        <Route path="bnss/:slug" element={<BnsSection />} />
        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="book" element={<Booking />} />
        <Route path="case-status" element={<CaseStatus />} />
        <Route path="case-status/:slug" element={<CaseStatusDistrict />} />
        <Route path="ask" element={<Ask />} />
        <Route path="case-law" element={<CaseLaw />} />
        {/* Static segment before the dynamic one: the reader is not a topic. */}
        <Route path="case-law/judgment" element={<Judgment />} />
        <Route path="case-law/:slug" element={<CaseLawTopic />} />
        <Route path="tools" element={<ToolsIndex />} />
        <Route path="tools/stamp-duty-calculator" element={<StampDuty />} />
        <Route path="tools/land-unit-converter" element={<LandUnits />} />
        <Route path="tools/ipc-to-bns-converter" element={<IpcBns />} />
        <Route path="tools/court-fee-calculator" element={<CourtFee />} />
        <Route path="tools/maintenance-estimator" element={<Maintenance />} />
        <Route path="tools/limitation-checker" element={<Limitation />} />
        <Route path="tools/cause-list" element={<CauseList />} />
        <Route path="tools/mact-compensation-calculator" element={<Mact />} />
        <Route path="tools/cheque-bounce-calculator" element={<ChequeBounce />} />
        <Route path="tools/vanshavali-generator" element={<Vanshavali />} />
        <Route path="tools/consumer-court-fee-calculator" element={<ConsumerFee />} />
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
