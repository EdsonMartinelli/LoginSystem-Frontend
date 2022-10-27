import { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatedAuthLeftToRight } from "../animations/AnimatedAuthLeftToRight";
import { AnimatedAuthRightToLeft } from "../animations/AnimatedAuthRighToLeft";
import {
  typeOrientationAuthAnimation,
  typeState,
} from "../interfaces/AnimatedAuth";

export interface animatedAuthProps {
  orientation: typeOrientationAuthAnimation;
  previousOrientation: typeOrientationAuthAnimation | undefined;
  children: ReactNode;
}

export function AuthController({
  orientation,
}: {
  orientation: typeOrientationAuthAnimation;
}) {
  const location = useLocation();
  const previousOrientation = (location.state as typeState)?.orientation;

  if (orientation === "RightToLeft") {
    return (
      <AnimatedAuthRightToLeft
        orientation={orientation}
        previousOrientation={previousOrientation}
      >
        <Outlet context={{ orientation }} />
      </AnimatedAuthRightToLeft>
    );
  }
  return (
    <AnimatedAuthLeftToRight
      orientation={orientation}
      previousOrientation={previousOrientation}
    >
      <Outlet context={{ orientation }} />
    </AnimatedAuthLeftToRight>
  );
}
