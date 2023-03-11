import {
  Box,
  BoxProps,
  Button,
  forwardRef,
  useColorMode,
} from "@chakra-ui/react";
import { motion, MotionConfig } from "framer-motion";
import { ReactNode } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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

interface contentStyleBoxProps extends BoxProps {
  children: ReactNode;
}

const ContentStyleBox = forwardRef<contentStyleBoxProps, "div">(
  ({ children, ...props }: contentStyleBoxProps, ref) => {
    return (
      <Box
        flex="1"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow={{ base: "none", md: "0 8px 32px 0 rgba(31, 38, 135, 0.2)" }}
        boxSizing="border-box"
        overflow="hidden"
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

export function AuthLayout({
  orientation,
}: {
  orientation: orientationAuthAnimation;
}) {
  const { colorMode } = useColorMode();
  const durationAnimation: number = 0.5;
  const location = useLocation();
  const previousOrientation = (location.state as typeState)?.orientation;

  const navigate = useNavigate();

  function goTo() {
    navigate(orientation === "LeftToRight" ? "/signup" : "/login", {
      state: { orientation },
    });
  }

  return (
    <Box
      id="background"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
      height="calc(100vh - 64px)"
      overflow="hidden"
    >
      <Box
        id="content"
        display="flex"
        width={{ base: "100%", sm: "100%", md: "650px", lg: "1000px" }}
        height="580px"
        flexDirection={orientation === "LeftToRight" ? "row" : "row-reverse"}
      >
        <MotionConfig
          transition={{ duration: durationAnimation, ease: "easeOut" }}
        >
          <ContentStyleBox
            as={motion.main}
            border={{
              base: "none",
              sm: "none",
              md: `1px solid rgba${
                colorMode === "dark"
                  ? "(255, 255, 255, 0.18)"
                  : "(0, 0, 0, 0.18)"
              }`,
            }}
            borderRadius={
              orientation === "LeftToRight"
                ? "10px 0px 0px 10px"
                : "0px 10px 10px 0px"
            }
            boxSizing="border-box"
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
          </ContentStyleBox>

          <ContentStyleBox
            as={motion.aside}
            zIndex="2"
            display={{ base: "none", sm: "none", md: "flex", lg: "flex" }}
            initial={
              orientation === previousOrientation ||
              previousOrientation === undefined
                ? {
                    opacity: previousOrientation === undefined ? 0 : 1,
                    x: 0,
                    borderRadius:
                      orientation === "LeftToRight"
                        ? "0px 10px 10px 0px"
                        : "10px 0px 0px 10px",
                    transitionDuration: "0.1s",
                  }
                : {
                    opacity: previousOrientation === undefined ? 0 : 1,
                    x: orientation === "LeftToRight" ? "-100%" : "100%",
                    borderRadius:
                      orientation === "LeftToRight"
                        ? "10px 0px 0px 10px"
                        : "0px 10px 10px 0px",
                    transitionDuration: "0.1s",
                  }
            }
            animate={{
              opacity: 1,
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
          </ContentStyleBox>
        </MotionConfig>
      </Box>

      <Button
        display={{ base: "block", sm: "block", md: "none", lg: "none" }}
        width="200px"
        height="50px"
        backgroundColor="messenger.500"
        color="white"
        onClick={() => goTo()}
      >
        {orientation === "LeftToRight" ? "Sign Up" : "Login"}
      </Button>
    </Box>
  );
}
