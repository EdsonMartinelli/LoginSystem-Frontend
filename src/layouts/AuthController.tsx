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
  size: number;
  children: ReactNode;
}

const CONTENT_SIZE = 1000;

export function AuthController({
  orientation,
}: {
  orientation: typeOrientationAuthAnimation;
}) {
  const location = useLocation();
  const previousOrientation = (location.state as typeState)?.orientation;

  return(
    <div
      id="background"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "calc(100vh - 48px)",
      }}
    >
      <div
        id="content"
        style={{
          display: "flex",
          width: `${CONTENT_SIZE}px`,
          height: "65%",
          flexDirection: "row",
        }}
      >
      { 
        (orientation === "RightToLeft") ?
          <AnimatedAuthRightToLeft
            orientation={orientation}
            previousOrientation={previousOrientation}
            size={CONTENT_SIZE}
          >
            <Outlet context={{ orientation }} />
          </AnimatedAuthRightToLeft>
        :
          <AnimatedAuthLeftToRight
            orientation={orientation}
            previousOrientation={previousOrientation}
            size={CONTENT_SIZE}
          >
            <Outlet context={{ orientation }} />
          </AnimatedAuthLeftToRight>
      }
      </div>
    </div>
  )
}
