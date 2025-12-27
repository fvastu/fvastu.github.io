"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";
import { siteConfig } from "@/constants/siteConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: "Work", href: "#work" },
      { label: "About", href: "#about" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
    social: [
      { label: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin },
      { label: "GitHub", href: siteConfig.social.github, icon: Github },
      {
        label: "Twitter",
        href: `https://twitter.com/${siteConfig.social.twitter.replace(
          "@",
          ""
        )}`,
        icon: Twitter,
      },
    ],
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4 }}
      className="border-t border-[#1A1A1A] bg-[#0A0A0A]"
    >
      {/* Main Footer Content */}
      <div className="px-8 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & Description */}
          <div className="lg:col-span-5">
            <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
              Let's build something
              <br />
              <span className="text-[#C9A86C]">remarkable together</span>
            </h3>
            <p className="text-[#8A8A85] text-sm leading-relaxed max-w-md mb-8">
              Available for select projects. Specializing in product design,
              development, and strategic digital experiences.
            </p>
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="inline-flex items-center gap-2 text-sm text-[#F5F5F0] hover:text-[#C9A86C] transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              {siteConfig.author.email}
            </a>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <span className="text-xs tracking-[0.2em] uppercase text-[#555] mb-6 block">
              Navigation
            </span>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#8A8A85] hover:text-[#F5F5F0] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-4">
            <span className="text-xs tracking-[0.2em] uppercase text-[#555] mb-6 block">
              Connect
            </span>
            <div className="space-y-4">
              {footerLinks.social.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 text-sm text-[#8A8A85] hover:text-[#F5F5F0] transition-colors duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-full border border-[#2A2A2A] flex items-center justify-center group-hover:border-[#C9A86C] transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1A1A1A] px-8 md:px-16 lg:px-24 xl:px-32 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-[#555] tracking-wider">
            © {currentYear} — Crafted with intention
          </span>

          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-xs text-[#555] hover:text-[#C9A86C] transition-colors duration-300 tracking-wider"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-[#555] hover:text-[#C9A86C] transition-colors duration-300 tracking-wider"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
