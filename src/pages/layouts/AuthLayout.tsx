import { Box, useColorMode } from "@chakra-ui/react";
import { motion, MotionConfig } from "framer-motion";
import { CSSProperties, ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AsideAuthContent } from "../../components/AsideAuthContent";
import {
  orientationAuthAnimation,
  typeState,
} from "../../interfaces/AnimatedAuth";

export interface animatedAuthProps {
  orientation: orientationAuthAnimation;
  previousOrientation: orientationAuthAnimation | undefined;
  children: ReactNode;
}

const contentStyle: CSSProperties = {
  flex: "1",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
  boxSizing: "border-box",
  overflow: "hidden",
};

export function AuthLayout({
  orientation,
}: {
  orientation: orientationAuthAnimation;
}) {
  const { colorMode } = useColorMode();
  const durationAnimation: number = 0.5;
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
        width={{ base: "300px", md: "500px", lg: "1000px" }}
        height="580px"
        flexDirection={orientation === "LeftToRight" ? "row" : "row-reverse"}
      >
        <MotionConfig
          transition={{ duration: durationAnimation, ease: "easeOut" }}
        >
          <motion.main
            style={{
              ...contentStyle,
              border: `1px solid rgba${
                colorMode === "dark"
                  ? "(255, 255, 255, 0.18)"
                  : "(0, 0, 0, 0.18)"
              }`,
              borderRadius:
                orientation === "LeftToRight"
                  ? "10px 0px 0px 10px"
                  : "0px 10px 10px 0px",
              boxSizing: "border-box",
            }}
            initial={{
              opacity: 0,
              x: orientation === "LeftToRight" ? "100%" : "-100%",
              transitionDelay: "0.1s",
              transitionDuration: `${durationAnimation - 0.1}s`,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transitionDelay: "0s",
            }}
            exit={{
              opacity: 0,
              x: orientation === "LeftToRight" ? "100%" : "-100%",
              transitionDuration: "0s",
            }}
          >
            <Box width="100%" padding="0px 9%">
              <Outlet context={{ orientation }} />
            </Box>
          </motion.main>

          <motion.aside
            style={{
              ...contentStyle,
              zIndex: "2",
              overflow: "hidden",
            }}
            initial={
              orientation === previousOrientation ||
              previousOrientation === undefined
                ? {
                    x: 0,
                    borderRadius:
                      orientation === "LeftToRight"
                        ? "0px 10px 10px 0px"
                        : "10px 0px 0px 10px",
                  }
                : {
                    x: orientation === "LeftToRight" ? "-100%" : "100%",
                    borderRadius:
                      orientation === "LeftToRight"
                        ? "10px 0px 0px 10px"
                        : "0px 10px 10px 0px",
                  }
            }
            animate={{
              x: 0,
              borderRadius:
                orientation === "LeftToRight"
                  ? "0px 10px 10px 0px"
                  : "10px 0px 0px 10px",
            }}
          >
            <AsideAuthContent
              buttonName={orientation === "LeftToRight" ? "Sign Up" : "Login"}
              path={orientation === "LeftToRight" ? "/signup" : "/login"}
              orientation={orientation}
            />
          </motion.aside>
        </MotionConfig>
      </Box>
    </Box>
  );
}
