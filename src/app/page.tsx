"use client";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/HomeHeader";
import React, { useState } from "react";
import HeroSection from "@/components/Hero";
import Toaster from "@/components/Toaster";
import Selector from "@/components/Selector";

const Home = () => {
  const [variant, setVariant] = useState("default");
  const variantCB = (data: string) => {
    setVariant(data);
  };

  return (
    <div className="md:cursor-none">
      <Selector>
        <HomeHeader setVariant={variantCB} />
        <Cursor variant={variant} />
        <HeroSection setVariant={variantCB} />
        <Footer />
        <Toaster />
      </Selector>
    </div>
  );
};

export default Home;
