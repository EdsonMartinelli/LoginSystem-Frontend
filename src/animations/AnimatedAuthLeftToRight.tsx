import { motion } from "framer-motion";
import { AsideAuthContent } from "../components/AsideAuthContent";
import { animatedAuthProps } from "../layouts/AuthController";
import "./AnimatedAuth.css";

export function AnimatedAuthLeftToRight({
  orientation,
  previousOrientation,
  size,
  children,
}: animatedAuthProps) {
  return (
    <>
      <motion.main
        className="content outlet glass"
        initial={{
          opacity: 1,
          borderRadius: "10px 0px 0px 10px",
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            borderRadius: "10px 0px 0px 10px",
          }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {children}
        </motion.div>
      </motion.main>
      <motion.aside
        className="content aside glass"
        initial={
          orientation === previousOrientation ||
          previousOrientation === undefined
            ? {
                x: 0,
                borderRadius: "0px 10px 10px 0px",
              }
            : {
                x: - (Math.round(size / 2)),
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
    </>
  );
}
