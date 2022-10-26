import { Button, useColorMode } from "@chakra-ui/react";
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
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </header>
      <Outlet />
    </>
  );
}
