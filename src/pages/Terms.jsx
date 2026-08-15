import LegalDoc from "../components/LegalDoc";
import { termsOfUse } from "../data/legal";

export default function Terms() {
  return <LegalDoc doc={termsOfUse} path="/terms" />;
}
