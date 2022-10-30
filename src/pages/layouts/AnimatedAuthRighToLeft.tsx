import { motion, MotionConfig } from "framer-motion";
import { AsideAuthContent } from "../../components/AsideAuthContent";
import {
  animatedAuthProps,
  asideStyle,
  contentStyle,
  outletStyle,
} from "./AuthController";

export function AnimatedAuthRightToLeft({
  orientation,
  previousOrientation,
  size,
  children,
}: animatedAuthProps) {
  return (
    <>
      <MotionConfig transition={{ duration: 0.5, ease: "easeOut" }}>
        <motion.aside
          style={{ ...contentStyle, ...asideStyle }}
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
        >
          <AsideAuthContent
            buttonName="Log in"
            path="/login"
            orientation={orientation}
          />
        </motion.aside>

        <motion.main
          style={{
            ...contentStyle,
            ...outletStyle,
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
            x: -Math.round(size / 4),
          }}
        >
          {children}
        </motion.main>
      </MotionConfig>
    </>
  );
}
