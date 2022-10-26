import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import AppRoutes from "./AppRoutes";
import { theme } from "./theme/themeConfig";

/*

  You need to wrap the entire app with AnimationPresence. The attribute
   exitBeforeEnter will wait a render component finish the animetion for
   start another.

*/

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AuthProvider>
        <BrowserRouter>
          <AnimatePresence exitBeforeEnter>
            <AppRoutes />
          </AnimatePresence>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
