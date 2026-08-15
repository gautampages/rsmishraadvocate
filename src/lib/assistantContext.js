import { createContext, useContext } from "react";

/** One conversation, shared by the inline section and the floating widget. */
export const AssistantContext = createContext(null);

export function useAssistant() {
  const value = useContext(AssistantContext);
  if (!value) throw new Error("useAssistant must be used inside <AssistantProvider>");
  return value;
}
