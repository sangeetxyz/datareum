import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-zinc-100 selection:bg-teal-500 selection:text-zinc-100">
      {children}
      <ToastContainer />
    </div>
  );
};

export default Container;
