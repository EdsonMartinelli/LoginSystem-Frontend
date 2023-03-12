import { useAuth } from "../hooks/useAuth";
import { Box, Button, LightMode, Text, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";

export function Profile() {
  const { user, userLogout } = useAuth();
  const { colorMode } = useColorMode();

  return (
    <Box
      width="100%"
      height="calc(100vh - 64px)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="5%"
    >
      <Box
        as={motion.div}
        width="100%"
        maxWidth="400px"
        height="fit-content"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        borderRadius="10px 10px 10px 10px"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.2)"
        boxSizing="border-box"
        padding="50px"
        paddingTop="0px"
        border={`1px solid rgba${
          colorMode === "dark" ? "(255, 255, 255, 0.18)" : "(0, 0, 0, 0.18)"
        }`}
        gap="16px"
        initial={{
          opacity: 0,
          scale: 0.8,
          transitionDuration: "0.1s",
          transitionTimingFunction: "linear",
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0,
          transitionDuration: "0.2s",
          transitionTimingFunction: "linear",
        }}
      >
        <LightMode>
          <Box
            borderRadius="full"
            boxSize="144px"
            border="5px solid #0078ff"
            boxSizing="border-box"
            backgroundColor="InfoBackground"
            position="relative"
            top="-72px"
            overflow="hidden"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="InfoText"
            marginBottom="-48px"
          >
            <p
              style={{
                fontSize: "50px",
              }}
            >
              {user?.username.substring(0, 2) ?? "XX"}
            </p>
          </Box>

          <Text>ID: {user?.id ?? "sdfsdfsdfsdfasd"}</Text>
          <Text>Username: {user?.username ?? "sdfsdfsdfsdfasd"}</Text>
          <Text>E-mail: {user?.email ?? "sdfsdfsdfsdfasd"}</Text>
          <Button
            marginTop="32px"
            width="208px"
            height="48px"
            colorScheme="messenger"
            onClick={() => userLogout()}
          >
            Log out
          </Button>
        </LightMode>
      </Box>
    </Box>
  );
}
