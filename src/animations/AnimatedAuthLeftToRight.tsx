import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  typeOrientationAuthAnimation,
  typeState,
} from "../interfaces/AnimatedAuth";
import "./AnimatedAuth.css";

export function AnimatedAuthLeftToRight() {
  const navigate = useNavigate();
  const location = useLocation();
  const orientation: typeOrientationAuthAnimation = "LeftToRight";
  const previousOrientation = (location.state as typeState)?.orientation;

  function goToSignUp() {
    navigate("/signup", { state: { orientation } });
  }

  return (
    <div className="content">
      <motion.main
        className="outlet-content glass"
        initial={{ 
          opacity: 0,
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "0px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "10px",
        }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Outlet />
      </motion.main>
      <motion.aside
        className="image-content glass"
        initial={
          (orientation === previousOrientation)||
          previousOrientation === undefined ?
          {
            x : 0,
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "0px",
          }
          :
          {
            x: -450,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "10px",
          }
        }
        animate={{
          x: 0,
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          borderBottomLeftRadius: "0px",
        }}
        exit={{ x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <button
          className="image-content-button"
          onClick={() => {
            goToSignUp();
          }}
        >
          Sign Up
        </button>
      </motion.aside>
    </div>
  );
}
