import { motion, MotionConfig } from "framer-motion";
import { AsideAuthContent } from "../../components/AsideAuthContent";
import {
  animatedAuthProps,
  asideStyle,
  contentStyle,
  outletStyle,
} from "./AuthController";

export function AnimatedAuthLeftToRight({
  orientation,
  previousOrientation,
  size,
  children,
}: animatedAuthProps) {
  return (
    <>
      <MotionConfig transition={{ duration: 0.5, ease: "easeOut" }}>
        <motion.main
          className="content outlet"
          style={{
            ...contentStyle,
            ...outletStyle,
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
            x: Math.round(size / 4),
          }}
        >
          {children}
        </motion.main>

        <motion.aside
          style={{ ...contentStyle, ...asideStyle }}
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
        >
          <AsideAuthContent
            buttonName="Sign Up"
            path="/signup"
            orientation={orientation}
          />
        </motion.aside>
      </MotionConfig>
    </>
  );
}
