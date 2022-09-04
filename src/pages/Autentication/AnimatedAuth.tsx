import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./AnimatedAuth.css"

type typeState = {
  from: string,
  outletSide: string
} | undefined

export function AnimatedAuth(){
  const location = useLocation();
  const page = location.pathname;
  const navigate = useNavigate();
  const outletSide = (page.split("/")[1] == "signup") ? "right": "left"
  const outletPreviousSide = (location.state as typeState)?.outletSide

  function handleClick() {
    (outletSide == "left") ? 
      navigate("/signup", { state: { from: page, outletSide} }) 
    :
      navigate("/login", { state: { from: page, outletSide} })
  }

  function accountActivated() {
    navigate("/signup/activated", { state: { from: page, outletSide} }) 
  }

  function recoverPassword() {
    navigate("/recover", { state: { from: page, outletSide} }) 
  }

  function animationImage(){
    if( outletSide == outletPreviousSide) return 0
    return (outletSide == "right") ? -500 : 500
  }

  return (
    <motion.div 
      className="content"
      initial={{flexDirection: (outletSide == "right") ? "row" : "row-reverse"}}
      transition={{ delay: 1 }}
    >
      <motion.aside 
        className="image-content"
        initial={{x: 0 }}
        animate={{x: 0 }}
        exit={{x: animationImage()}}
        transition={{ duration: 1 }}
      >
        <button 
          className="image-content-button"
          onClick={() => {handleClick()}}
        > 
          {(outletSide == "left")? "Sign Up" : "Login"}
        </button>
        <button 
          className="image-content-button"
          onClick={() => {accountActivated()}}
        > 
          Account Activated
        </button>
        <button 
          className="image-content-button"
          onClick={() => {recoverPassword()}}
        > 
          Recover Password
        </button>
      </motion.aside>
      <motion.main 
        className="outlet-content"
        initial={{opacity :0 }}
        animate={{opacity :1 }}
        exit={{opacity :0 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.main>
    </motion.div>
  )
}