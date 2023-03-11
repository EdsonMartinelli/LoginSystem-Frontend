import { Box, Button, LightMode, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import home from "../assets/home.svg";
import home2 from "../assets/home2.svg";

export function Home() {
  const navigate = useNavigate();
  return (
    <Box
      width="100%"
      height="calc(100vh - 64px)"
      boxSizing="border-box"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        padding="5%"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width="40%"
        >
          <Text
            as={motion.p}
            fontSize="5xl"
            fontWeight="bold"
            textAlign="center"
            marginBottom="48px"
            initial={{
              opacity: 0,
              x: "-10%",
              transitionDuration: "0.5s",
              transitionTimingFunction: "linear",
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: "-200%",
              transitionDuration: "0.5s",
              transitionTimingFunction: "linear",
            }}
          >
            A simple Login System
          </Text>
          <Text
            as={motion.p}
            fontSize="2xl"
            textAlign="center"
            marginBottom="32px"
            initial={{
              opacity: 0,
              x: "-10%",
              transitionDelay: "0.2s",
              transitionDuration: "0.5s",
              transitionTimingFunction: "linear",
            }}
            animate={{
              opacity: 1,
              x: 0,
              transitionDelay: "0s",
            }}
            exit={{
              opacity: 0,
              x: "-200%",
              transitionDuration: "0.5s",
              transitionTimingFunction: "linear",
            }}
          >
            Login system using React, Chakra UI, Formik, Yup, Framer-motion and
            Axios.
          </Text>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="20px"
          >
            <LightMode>
              <Button
                as={motion.button}
                colorScheme="messenger"
                width="200px"
                height="50px"
                initial={{
                  opacity: 0,
                  y: "20px",
                  transitionDuration: "0.5s",
                  transitionTimingFunction: "linear",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: "200px",
                  transitionDuration: "0.5s",
                  transitionTimingFunction: "linear",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log In
              </Button>
            </LightMode>
            <LightMode>
              <Button
                as={motion.button}
                colorScheme="messenger"
                width="200px"
                height="50px"
                initial={{
                  opacity: 0,
                  y: "20px",
                  transitionDuration: "0.5s",
                  transitionTimingFunction: "linear",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: "200px",
                  transitionDuration: "0.5s",
                  transitionTimingFunction: "linear",
                }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
            </LightMode>
          </Box>
        </Box>

        <Box
          width="40%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Image
            as={motion.img}
            borderRadius="full"
            boxSize="400px"
            border="5px solid #0078ff"
            outlineOffset="20px"
            outline="10px solid #0078ff"
            boxSizing="border-box"
            backgroundColor="AppWorkspace"
            src={home}
            initial={{
              opacity: 0,
              x: "10%",
              transitionDuration: "0.5s",
              transitionTimingFunction: "linear",
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: "200%",
              transitionDuration: "0.5s",
              transitionTimingFunction: "linear",
            }}
          />
          <Image
            as={motion.img}
            borderRadius="full"
            boxSize="300px"
            position="relative"
            top="-100px"
            left="-50px"
            border="5px solid #0078ff"
            outlineOffset="20px"
            outline="10px solid #0078ff"
            boxSizing="border-box"
            backgroundColor="AppWorkspace"
            src={home2}
            initial={{
              opacity: 0,
              x: "10%",
              transitionDelay: "0.2s",
              transitionDuration: "0.5s",
              transitionTimingFunction: "linear",
            }}
            animate={{
              opacity: 1,
              x: 0,
              transitionDelay: "0s",
            }}
            exit={{
              opacity: 0,
              x: "200%",
              transitionDuration: "0.5s",
              transitionTimingFunction: "linear",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
