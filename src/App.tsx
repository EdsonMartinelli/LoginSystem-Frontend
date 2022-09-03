import { Autentication } from './pages/Autentication/Autentication'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Login } from './components/Login'
import { SignUp } from './components/SignUp'
import { AnimatePresence } from 'framer-motion'


/* 
   You need to wrap the entire app with AnimationPresence. The attribute 
   exitBeforeEnter will wait a render component finish the animetion for 
   start another.

   You need to pass location, and key in Routes because frame-motion use 
   this information internally in page animation transition and others
   animations.

*/

function App() {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/auth" element={<Autentication />}> 
          <Route path="/auth/login" element={<Login />}/>
          <Route path="/auth/signup" element={<SignUp />}/>
        </Route>
        <Route path="/home" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
