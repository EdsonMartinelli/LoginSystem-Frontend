import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import {
  orientationAuthAnimation,
  typeState,
} from "../../../interfaces/AnimatedAuth";
import { AuthAnimation } from "./AuthAnimation";

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
      <AuthAnimation
        orientation={orientation}
        previousOrientation={previousOrientation}
      >
        <Outlet context={{ orientation }} />
      </AuthAnimation>
    </Box>
  );
}
