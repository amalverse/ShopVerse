import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleDarkMode}
      className="relative flex items-center justify-center p-2 rounded-xl bg-slate-100 text-slate-800 transition-colors duration-300 shadow-sm border border-slate-200 overflow-hidden"
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        initial={false}
        animate={{ 
          y: isDarkMode ? 0 : 40,
          opacity: isDarkMode ? 1 : 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <HiOutlineMoon className="text-xl" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          y: isDarkMode ? -40 : 0,
          opacity: isDarkMode ? 0 : 1 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute"
      >
        <HiOutlineSun className="text-xl text-orange-500" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
