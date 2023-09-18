"use client";

import React from "react";
import { motion } from "framer-motion";

const Neumorphic = ({ title }: { title: string }) => {
  return (
    <motion.button
      initial={{}}
      animate={{
        boxShadow:
          "10px 10px 10px -1px rgba(10, 99, 169, 0.16), -10px -10px 10px -1px rgba(255, 255, 255, 0.70)",
      }}
      transition={{
        duration: 1,
      }}
      whileHover={{
        boxShadow: "0",
        fontSize: "15px",
      }}
      whileTap={{
        boxShadow:
          "inset 10px 10px 10px -1px rgba(10, 99, 169, 0.16), inset -10px -10px 10px -1px rgba(255, 255, 255, 0.70)",
        fontSize: "14px",
      }}
      className="rounded-2xl bg-zinc-200 p-4 capitalize"
    >
      {title.toLowerCase()}
    </motion.button>
  );
};

export default Neumorphic;
