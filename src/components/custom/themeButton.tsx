import React from "react";
import { motion } from "framer-motion";

const ThemeButton = (props: {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  const buttonClasses = `cursor-pointer text-zinc-50 text-center rounded-lg bg-gradient-to-tr from-violet-500 to-teal-500 px-3 py-2 text-sm uppercase xl:mt-0 ${
    props.disabled ? "opacity-50 pointer-events-none" : ""
  } ${props.className || ""}`;
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className={buttonClasses}
      onClick={props.onClick}
    >
      {props.title}
    </motion.div>
  );
};

export default ThemeButton;
