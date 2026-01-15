"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-[#0A0A0A]/80 backdrop-blur-xl" : "bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="mx-auto max-w-[1370px] px-8 md:px-16 lg:px-24 xl:px-32 py-6 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="/"
            className="text-xl font-light tracking-tight hover:text-[#C9A86C] transition-colors duration-300 text-[#C9A86C]"
            aria-label="Home"
          >
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-[#8A8A85] hover:text-[#F5F5F0] transition-colors duration-300 tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="mailto:f.vasturzo@live.it?subject=Let's Talk"
            className="hidden md:block px-6 py-3 border border-[#2A2A2A] rounded-full text-xs tracking-[0.15em] uppercase hover:border-[#C9A86C] hover:text-[#C9A86C] transition-all duration-300 text-[#C9A86C]"
            aria-label="Contact me via email"
          >
            Let's talk
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[#2A2A2A] hover:border-[#C9A86C] transition-colors duration-300 text-[#C9A86C]"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] md:hidden"
          >
            <div className="h-full flex flex-col justify-center px-8 space-y-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-light tracking-tight hover:text-[#C9A86C] transition-colors duration-300"
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="self-start px-8 py-4 bg-[#C9A86C] rounded-full text-sm tracking-[0.15em] uppercase font-medium text-[#C9A86C]"
              >
                Let's talk
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
