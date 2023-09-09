import React from "react";

const Selector = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-zinc-100 selection:bg-teal-400 selection:text-white">
      {children}
    </div>
  );
};

export default Selector;
