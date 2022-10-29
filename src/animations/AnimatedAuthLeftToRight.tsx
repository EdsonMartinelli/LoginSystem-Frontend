import { motion } from "framer-motion";
import { AsideAuthContent } from "../components/AsideAuthContent";
import { animatedAuthProps } from "../pages/layouts/AuthController";
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
        style={{
          borderRadius: "10px 0px 0px 10px",
        }}
        initial={{
          opacity: 0,
          x: Math.round(size / 8),
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: Math.round(size / 2),
        }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          style={{
            width: "100%",
            padding: "0px 90px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
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
                x: -Math.round(size / 2),
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
