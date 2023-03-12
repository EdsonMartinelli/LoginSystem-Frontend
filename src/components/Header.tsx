import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  LightMode,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  return (
    <>
      <header
        style={{
          height: "64px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "32px",
          paddingRight: "32px",
        }}
      >
        <Heading
          as="h4"
          size="md"
          color={colorMode === "dark" ? "white" : "messenger.500"}
          onClick={() => {
            navigate("/");
          }}
          cursor="pointer"
        >
          Login System
        </Heading>
        <LightMode>
          <ButtonGroup
            isAttached
            colorScheme={colorMode === "dark" ? "messenger" : "gray"}
          >
            <Button
              variant={colorMode === "dark" ? "solid" : "outline"}
              onClick={colorMode === "light" ? toggleColorMode : undefined}
              padding="0px"
            >
              <MoonIcon />
            </Button>

            <Button
              variant={colorMode === "light" ? "solid" : "outline"}
              onClick={colorMode === "dark" ? toggleColorMode : undefined}
              padding="0px"
            >
              <SunIcon />
            </Button>
          </ButtonGroup>
        </LightMode>
      </header>
      <Outlet />
    </>
  );
}
