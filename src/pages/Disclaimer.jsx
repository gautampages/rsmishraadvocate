import LegalDoc from "../components/LegalDoc";
import { disclaimer } from "../data/legal";

export default function Disclaimer() {
  return <LegalDoc doc={disclaimer} path="/disclaimer" />;
}
