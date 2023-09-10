import React from "react";

const Selector = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-zinc-100 selection:bg-teal-500 selection:text-zinc-100">
      {children}
    </div>
  );
};

export default Selector;
