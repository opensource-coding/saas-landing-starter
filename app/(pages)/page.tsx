"use client";

import CTA from "@/components/home/CTA";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import LogosTicker from "@/components/home/LogosTicker";
import Technologies from "@/components/home/Technologies";

export default function Home() {
  return (
    <>
      <Hero />
      <LogosTicker />
      <Features />
      <Technologies />
      <CTA />
    </>
  );
}
