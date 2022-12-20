import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const breakpoints = {
  sm: "480px",
  md: "768px",
  lg: "1024px",
};

export const theme = extendTheme({ config, breakpoints });
