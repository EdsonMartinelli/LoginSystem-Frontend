import { AnimatedAuth } from './animated/AnimatedAuth'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Home } from './pages/Home/Home'
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { RecoverPassword } from './pages/RecoverPassword'
import { ConfirmEmail } from './pages/ConfirmEmail'
import { AccountActivated } from './pages/AccountActivated'

/* 
   You need to wrap the entire app with AnimationPresence. The attribute 
   exitBeforeEnter will wait a render component finish the animetion for 
   start another.

   You need to pass location, and key in Routes because frame-motion use 
   this information internally in page animation transition and others
   animations.

*/

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route element={<AnimatedAuth />}> 
          <Route path="/login" element={<Login />}/>
          <Route path="/recover" element={<RecoverPassword />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/signup/active/:id" element={<ConfirmEmail />}/>
          <Route path="/signup/activated" element={<AccountActivated />}/>
        </Route>
        <Route path="/home" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AppRoutes