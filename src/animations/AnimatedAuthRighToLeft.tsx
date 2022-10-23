import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  typeOrientationAuthAnimation,
  typeState,
} from "../interfaces/AnimatedAuth";
import "./AnimatedAuth.css";

export function AnimatedAuthRightToLeft() {
  const navigate = useNavigate();
  const location = useLocation();
  const orientation: typeOrientationAuthAnimation = "RightToLeft";
  const previousOrientation = (location.state as typeState)?.orientation;

  function goToLogin() {
    navigate("/login", { state: { orientation } });
  }

  return (
    <div className="content">
      <motion.aside
        className="image-content glass"
        initial={
          (orientation === previousOrientation) ||
          previousOrientation === undefined ?
          {
            x : 0,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "10px",
          }
          :
          {
            x: 450,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "10px",
          }
        }
        animate={{ 
          x: 0,
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "0px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "10px",
        }}
        exit={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <button
          className="image-content-button"
          onClick={() => {
            goToLogin();
          }}
        >
          Login
        </button>
      </motion.aside>
      <motion.main
        className="outlet-content glass"
        initial={{ 
          opacity: 0,
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          borderBottomLeftRadius: "0px",
        }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
