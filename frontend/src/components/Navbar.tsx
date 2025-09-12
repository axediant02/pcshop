"use client";

import { useState } from "react";
import SignupModal from "@/components/SignupModal";
import LoginModal from "@/components/LoginModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Features", id: "features" },
    { label: "Shop", href: "/products" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav className="w-full bg-white shadow fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleScroll("hero")}
              className="text-2xl font-bold text-blue-600 hover:opacity-80 transition"
              aria-label="Go to hero section"
            >
              MyShop
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, i) =>
                link.href ? (
                  <a
                    key={i}
                    href={link.href}
                    className="hover:text-blue-600 transition "
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={i}
                    onClick={() => handleScroll(link.id!)}
                    className="hover:text-blue-600 transition cursor-pointer"
                  >
                    {link.label}
                  </button>
                )
              )}

              {/* Auth Buttons */}
              <button
                onClick={() => setShowLogin(true)}
                className="text-blue-600 border border-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50 transition cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => setShowSignup(true)}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                Create Account
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow-inner">
            {navLinks.map((link, i) =>
              link.href ? (
                <a
                  key={i}
                  href={link.href}
                  className="block hover:text-blue-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={i}
                  onClick={() => handleScroll(link.id!)}
                  className="block hover:text-blue-600 transition"
                >
                  {link.label}
                </button>
              )
            )}

            {/* Divider */}
            <hr className="my-2" />

            {/* Auth Buttons */}
            <button
              onClick={() => {
                setShowSignup(true);
                setIsOpen(false);
              }}
              className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create Account
            </button>
            <button
              onClick={() => {
                setShowLogin(true);
                setIsOpen(false);
              }}
              className="w-full text-blue-600 border border-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </button>
          </div>
        )}
      </nav>

      {/* Modals */}
      <SignupModal open={showSignup} onClose={() => setShowSignup(false)} />
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
