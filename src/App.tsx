import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import AppRoutes from "./AppRoutes";
import { theme } from "./theme/themeConfig";
import { axiosUserHttpClient } from "./services/axios/axiosUserHttpClient";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AuthProvider userHttpClient={axiosUserHttpClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
