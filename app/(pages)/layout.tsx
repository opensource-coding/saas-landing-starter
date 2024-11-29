import React from "react";
import Navbar from "@/components/layout/Navbar";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import Footer from "@/components/layout/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FloatingButtons />
      <Footer />
    </>
  );
};

export default layout;
