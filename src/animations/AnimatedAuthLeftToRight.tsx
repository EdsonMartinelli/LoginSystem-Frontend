import { motion } from "framer-motion";
import { AsideAuthContent } from "../components/AsideAuthContent";
import { animatedAuthProps } from "../components/AuthController";

import "./AnimatedAuth.css";

export function AnimatedAuthLeftToRight({
  orientation,
  previousOrientation,
  children
}: animatedAuthProps) {
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
        {children}
      </motion.main>
      <motion.aside
        className="image-content glass"
        initial={
          orientation === previousOrientation ||
          previousOrientation === undefined
            ? {
                x: 0,
                borderRadius: "0px 10px 10px 0px",
              }
            : {
                x: -500,
                borderRadius: "10px 0px 0px 10px",
              }
        }
        animate={{
          x: 0,
          borderRadius: "0px 10px 10px 0px",
        }}
        exit={{ x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <AsideAuthContent
          buttonName="Sign Up"
          path="/signup"
          orientation={orientation}
        />
      </motion.aside>
    </div>
  );

}
