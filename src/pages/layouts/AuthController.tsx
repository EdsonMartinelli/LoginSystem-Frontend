import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatedAuthLeftToRight } from "../../animations/AnimatedAuthLeftToRight";
import { AnimatedAuthRightToLeft } from "../../animations/AnimatedAuthRighToLeft";
import {
  orientationAuthAnimation,
  typeState,
} from "../../interfaces/AnimatedAuth";

export interface animatedAuthProps {
  orientation: orientationAuthAnimation;
  previousOrientation: orientationAuthAnimation | undefined;
  size: number;
  children: ReactNode;
}

const CONTENT_SIZE = 1000;

export function AuthController({
  orientation,
}: {
  orientation: orientationAuthAnimation;
}) {
  const location = useLocation();
  const previousOrientation = (location.state as typeState)?.orientation;
  console.log(window.innerWidth);
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
            <Outlet context={{ orientation }} />
          </AnimatedAuthRightToLeft>
        ) : (
          <AnimatedAuthLeftToRight
            orientation={orientation}
            previousOrientation={previousOrientation}
            size={CONTENT_SIZE}
          >
            <Outlet context={{ orientation }} />
          </AnimatedAuthLeftToRight>
        )}
      </Box>
    </Box>
  );
}

/*
id="background"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "calc(100vh - 48px)",
      }}
*/
