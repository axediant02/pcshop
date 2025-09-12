"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // close mobile menu after click
    }
  };

  return (
    <nav className="w-full bg-white shadow fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleScroll("hero")}
            className="text-2xl font-bold text-blue-600"
          >
            MyShop
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            <button onClick={() => handleScroll("about")} className="hover:text-blue-600">
              About
            </button>
            <button onClick={() => handleScroll("features")} className="hover:text-blue-600">
              Features
            </button>
            <a href="/products" className="hover:text-blue-600">
              Shop
            </a>
            <button onClick={() => handleScroll("contact")} className="hover:text-blue-600">
              Contact
            </button>
            <a href="/register" className="hover:text-blue-600">
              Create Account
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <button
            onClick={() => handleScroll("about")}
            className="block hover:text-blue-600"
          >
            About
          </button>
          <button
            onClick={() => handleScroll("features")}
            className="block hover:text-blue-600"
          >
            Features
          </button>
          <a href="/products" className="block hover:text-blue-600">
            Shop
          </a>
          <button
            onClick={() => handleScroll("contact")}
            className="block hover:text-blue-600"
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}
