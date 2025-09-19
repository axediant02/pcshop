// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // Make sure to install lucide-react

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export function Navbar({ onLoginClick, onSignupClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Features", href: "/#features" },
    { label: "Shop", href: "/products" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b backdrop-blur-md bg-white/80 dark:bg-gray-900/80 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-gray-50 transition-colors duration-300"
          >
            MyShop
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onLoginClick}
              className="text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Login
            </Button>
            <Button
              onClick={onSignupClick}
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Create Account
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="md:hidden px-2 text-gray-700 dark:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden absolute w-full transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
        } bg-white dark:bg-gray-900 shadow-lg`}
      >
        <div className="flex flex-col space-y-3 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col space-y-2">
            <Button
              variant="ghost"
              onClick={() => {
                onLoginClick();
                setIsOpen(false);
              }}
              className="w-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                onSignupClick();
                setIsOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}