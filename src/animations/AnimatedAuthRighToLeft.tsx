import { motion } from "framer-motion";
import { AsideAuthContent } from "../components/AsideAuthContent";
import { animatedAuthProps } from "../pages/layouts/AuthController";
import "./AnimatedAuth.css";

export function AnimatedAuthRightToLeft({
  orientation,
  previousOrientation,
  size,
  children,
}: animatedAuthProps) {
  return (
    <>
      <motion.aside
        className="content aside glass"
        initial={
          orientation === previousOrientation ||
          previousOrientation === undefined
            ? {
                x: 0,
                borderRadius: "10px 0px 0px 10px",
              }
            : {
                x: Math.round(size / 2),
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
        className="content outlet glass"
        style={{
          borderRadius: "0px 10px 10px 0px",
        }}
        initial={{
          opacity: 0,
          x: -Math.round(size / 8),
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: -Math.round(size / 2),
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
    </>
  );
}
