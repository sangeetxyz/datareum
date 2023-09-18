import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
const Magnetic = (props: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMouseMove = (event: React.MouseEvent) => {
    const { width, height, left, top } = ref.current!.getBoundingClientRect();
    setPosition({
      x: event.clientX - (left + width / 2),
      y: event.clientY - (top + height / 2),
    });
  };

  const onMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 10,
        mass: 0.1,
      }}
    >
      {props.children}
    </motion.div>
  );
};

export default Magnetic;
