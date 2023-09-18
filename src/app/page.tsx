"use client";
import Cursor from "@/components/cursor/cursor";
import Footer from "@/components/footers/footer";
import HomeHeader from "@/components/headers/homeHeader";
import React, { useState } from "react";
import HeroSection from "@/components/home/heroSection";
import Toaster from "@/components/containers/Toaster";
import Container from "@/components/containers/container";

const Home = () => {
  const [variant, setVariant] = useState("default");
  const variantCB = (data: string) => {
    setVariant(data);
  };

  return (
    <div className="md:cursor-none">
      <Container>
        <HomeHeader setVariant={variantCB} />
        <Cursor variant={variant} />
        <HeroSection setVariant={variantCB} />
        <Footer />
        <Toaster />
      </Container>
    </div>
  );
};

export default Home;
