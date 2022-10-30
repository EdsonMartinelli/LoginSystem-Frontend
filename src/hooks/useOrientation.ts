import { useOutletContext } from "react-router-dom";
import { orientationAuthAnimation } from "../interfaces/AnimatedAuth";

interface ContextType {
  orientation: orientationAuthAnimation | undefined;
}

export function useOrientation() {
  return useOutletContext<ContextType>();
}
