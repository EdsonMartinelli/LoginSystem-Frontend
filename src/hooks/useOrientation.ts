import { useOutletContext } from "react-router-dom";
import { typeOrientationAuthAnimation } from "../interfaces/AnimatedAuth";

interface ContextType {
  orientation: typeOrientationAuthAnimation | undefined;
}

export function useOrientation() {
  return useOutletContext<ContextType>();
}
