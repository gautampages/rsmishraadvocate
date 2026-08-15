import LegalDoc from "../components/LegalDoc";
import { privacyPolicy } from "../data/legal";

export default function Privacy() {
  return <LegalDoc doc={privacyPolicy} path="/privacy-policy" />;
}
