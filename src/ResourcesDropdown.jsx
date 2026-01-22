// src/ResourcesDropdown.jsx
import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ResourcesDropdown() {
  const [open, setOpen] = useState(false);

  // Use React Router's navigation for better UX
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <div className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-[var(--brand-accent)] transition">
        <FaBook />
        <span>Resources</span>
      </div>

      {/* Dropdown Menu with animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-0 mt-2 w-56 bg-[#0b1a3a] border border-white/10 rounded-lg shadow-lg py-2 z-50"
          >
            <div
              onClick={() => navigateTo("/qas-reports")}
              className="px-4 py-2 text-gray-200 hover:bg-[var(--brand-accent)] hover:text-black cursor-pointer rounded-md transition-colors"
            >
              QAS Reports & Policies
            </div>

            <div
              onClick={() => navigateTo("/training-links")}
              className="px-4 py-2 text-gray-200 hover:bg-[var(--brand-accent)] hover:text-black cursor-pointer rounded-md transition-colors"
            >
              Training Links
            </div>

            <div
              onClick={() => navigateTo("/file-saving-format")}
              className="px-4 py-2 text-gray-200 hover:bg-[var(--brand-accent)] hover:text-black cursor-pointer rounded-md transition-colors"
            >
              File Saving Format
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}