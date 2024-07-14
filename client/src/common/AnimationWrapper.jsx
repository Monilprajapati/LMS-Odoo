import React from "react";
import { animate, motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const AnimationWrapper = ({
  children,
  keyValue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 0.5 },
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        key={keyValue}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
