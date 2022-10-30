import { Box } from "@chakra-ui/react";
import { CSSProperties, ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";

import {
  orientationAuthAnimation,
  typeState,
} from "../../interfaces/AnimatedAuth";
import { AnimatedAuthLeftToRight } from "./AnimatedAuthLeftToRight";
import { AnimatedAuthRightToLeft } from "./AnimatedAuthRighToLeft";

export interface animatedAuthProps {
  orientation: orientationAuthAnimation;
  previousOrientation: orientationAuthAnimation | undefined;
  size: number;
  children: ReactNode;
}

export const contentStyle: CSSProperties = {
  flex: "1",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);",
};

export const outletStyle: CSSProperties = {
  width: "100%",
  border: "1px solid rgba(255, 255, 255, 0.18)",
};

export const asideStyle: CSSProperties = {
  zIndex: "2",
  overflow: "hidden",
};

const CONTENT_SIZE = 1000;

export function AuthController({
  orientation,
}: {
  orientation: orientationAuthAnimation;
}) {
  const location = useLocation();
  const previousOrientation = (location.state as typeState)?.orientation;

  return (
    <Box
      id="background"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="calc(100vh - 48px)"
    >
      <Box
        id="content"
        display="flex"
        width={`${CONTENT_SIZE}px`}
        height="65%"
        flexDirection="row"
      >
        {orientation === "RightToLeft" ? (
          <AnimatedAuthRightToLeft
            orientation={orientation}
            previousOrientation={previousOrientation}
            size={CONTENT_SIZE}
          >
            <Box width="100%" padding="0px 90px">
              <Outlet context={{ orientation }} />
            </Box>
          </AnimatedAuthRightToLeft>
        ) : (
          <AnimatedAuthLeftToRight
            orientation={orientation}
            previousOrientation={previousOrientation}
            size={CONTENT_SIZE}
          >
            <Box width="100%" padding="0px 90px">
              <Outlet context={{ orientation }} />
            </Box>
          </AnimatedAuthLeftToRight>
        )}
      </Box>
    </Box>
  );
}
