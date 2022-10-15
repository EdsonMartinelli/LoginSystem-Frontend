import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { typeOrientationAuthAnimation, typeState } from "../interfaces/AnimatedAuth";
import "./AnimatedAuth.css";

export function AnimatedAuthRightToLeft() {
  const navigate = useNavigate();
  const location = useLocation();
  const orientation: typeOrientationAuthAnimation = "RightToLeft";
  const previousOrientation = (location.state as typeState)?.orientation;

  function goToSignUp() {
    navigate("/signup", { state: { orientation } });
  }

  return (
    <div className="content">
      <motion.main
        className="outlet-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Outlet />
      </motion.main>
      <motion.aside
        className="image-content"
        initial={{
          x:
            orientation === previousOrientation ||
            previousOrientation === undefined
              ? 0
              : -500,
        }}
        animate={{ x: 0 }}
        exit={{ x: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
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
