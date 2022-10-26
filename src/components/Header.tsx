import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, LightMode, useColorMode } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <header
        style={{
          height: "48px",
          width: "100%",
        }}
      >
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
