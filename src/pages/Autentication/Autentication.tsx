import { motion } from "framer-motion";
import "./Autentication.css"
import { Outlet, useLocation, useNavigate } from "react-router-dom";


export function Autentication(){
  const location = useLocation();
  
  function getLastPage(){
    const pages = location.pathname.split("/")
    return pages[pages.length - 1]
  }

  const navigate = useNavigate();

  function handleClick() {
    if(getLastPage() == "login"){
      navigate("/auth/signup");
    } else {
      navigate("/auth/login");
    }
  }

  return (
    <motion.div 
      className="content"
        initial={{flexDirection: (getLastPage() == "login") ? "row-reverse" : "row"}}
        animate={{}}
        exit={{}}
        transition={{ duration: 0 , delay: 1 }}
      >
      <motion.aside 
        className="signup-content"
        initial={{x: 0 }}
        animate={{x: 0 }}
        exit={{x: (getLastPage() == "login") ? 500 : -500}}
        transition={{ duration: 1 }}
      >
        <button onClick={() => {handleClick()}}> teste</button>
      </motion.aside>

      <motion.main 
        className="login-content"
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