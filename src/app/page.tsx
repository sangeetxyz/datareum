"use client";
import Cursor from "@/components/cursor";
import Footer from "@/components/footer";
import HomeHeader from "@/components/homeHeader";
import React, { useState } from "react";
import HeroSection from "@/components/heroSection";
import Toaster from "@/components/Toaster";
import Container from "@/components/container";

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
