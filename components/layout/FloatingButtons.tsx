"use client";
import { ScrollToTopButton } from "../ui/ScrollToTopButton";
import { ThemeToggle } from "../ui/ThemeToggle";
import { motion } from "framer-motion";

export const FloatingButtons = () => {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ScrollToTopButton />
      <ThemeToggle />
    </motion.div>
  );
};