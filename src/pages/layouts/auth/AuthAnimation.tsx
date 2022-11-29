import { Box } from "@chakra-ui/react";
import { motion, MotionConfig } from "framer-motion";
import { CSSProperties, ReactNode } from "react";
import { AsideAuthContent } from "../../../components/AsideAuthContent";
import { orientationAuthAnimation } from "../../../interfaces/AnimatedAuth";

export interface animatedAuthProps {
  orientation: orientationAuthAnimation;
  previousOrientation: orientationAuthAnimation | undefined;
  children: ReactNode;
}

const contentStyle: CSSProperties = {
  flex: "1",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);",
};

const outletStyle: CSSProperties = {
  border: "1px solid rgba(255, 255, 255, 0.18)",
};

const asideStyle: CSSProperties = {
  zIndex: "2",
  overflow: "hidden",
};

export function AuthAnimation({
  orientation,
  previousOrientation,
  children,
}: animatedAuthProps) {
  return (
    <Box
      id="content"
      display="flex"
      width="1000px"
      height="580px"
      flexDirection={orientation === "LeftToRight" ? "row" : "row-reverse"}
    >
      <MotionConfig transition={{ duration: 0.8, ease: "easeOut" }}>
        <motion.main
          style={{
            ...contentStyle,
            ...outletStyle,
            borderRadius:
              orientation === "LeftToRight"
                ? "10px 0px 0px 10px"
                : "0px 10px 10px 0px",
          }}
          initial={{
            opacity: 0,
            x: orientation === "LeftToRight" ? "100%" : "-100%",
            transitionDelay: "0.1s",
            transitionDuration: "0.7s",
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
          <Box width="100%" padding="0px 90px">
            {children}
          </Box>
        </motion.main>

        <motion.aside
          style={{ ...contentStyle, ...asideStyle }}
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
  );
}
