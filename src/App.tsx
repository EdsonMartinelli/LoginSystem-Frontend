import { ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { AuthProvider } from './providers/AuthProvider'


function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <AnimatePresence exitBeforeEnter>
            <AppRoutes />
          </AnimatePresence>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
