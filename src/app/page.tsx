"use client";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/HomeHeader";
import React, { useState } from "react";
import HeroSection from "@/components/Hero";
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
