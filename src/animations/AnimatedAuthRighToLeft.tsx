import { motion } from "framer-motion";
import { AsideAuthContent } from "../components/AsideAuthContent";
import { animatedAuthProps } from "../components/AuthController";

import "./AnimatedAuth.css";

export function AnimatedAuthRightToLeft({
  orientation,
  previousOrientation,
  children,
}: animatedAuthProps) {
  return (
    <div className="content ">
      <motion.aside
        className="image-content glass"
        initial={
          orientation === previousOrientation ||
          previousOrientation === undefined
            ? {
                x: 0,
                borderRadius: "10px 0px 0px 10px",
              }
            : {
                x: 500,
                borderRadius: "0px 10px 10px 0px",
              }
        }
        animate={{
          x: 0,
          borderRadius: "10px 0px 0px 10px",
        }}
        exit={{ x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <AsideAuthContent
          buttonName="Log in"
          path="/login"
          orientation={orientation}
        />
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
        transition={{ duration: 0.7 }}
      >
        {children}
      </motion.main>
    </div>
  );
}
