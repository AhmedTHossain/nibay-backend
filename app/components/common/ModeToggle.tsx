"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <motion.button
      className="w-12 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-start px-1 cursor-pointer shadow-inner"
      onClick={toggleTheme}
      animate={{
        backgroundColor: theme === "light" ? "rgb(229 231 235)" : "rgb(55 65 81)",
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-5 h-5 rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: theme === "light" ? "0%" : "100%",
          backgroundColor: theme === "light" ? "rgb(255, 255, 255)" : "rgb(31, 41, 55)",
        }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      >
        {theme === "light" ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Sun className="h-3 w-3 text-yellow-500" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Moon className="h-3 w-3 text-blue-200" />
          </motion.div>
        )}
      </motion.div>
    </motion.button>
  );
};

