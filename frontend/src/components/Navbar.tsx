"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  id?: string; // section ID for scrolling
  href?: string; // external link or page
};

const navItems: NavItem[] = [
  { label: "About", id: "about" },
  { label: "Features", id: "features" },
  { label: "Shop", href: "/products" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="w-full bg-white shadow fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleScroll("hero")}
            className="text-2xl font-bold text-blue-600"
          >
            MyShop
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`hover:text-blue-600 ${
                    pathname === item.href ? "text-blue-600 font-semibold" : ""
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  onClick={() => item.id && handleScroll(item.id)}
                  className="hover:text-blue-600"
                >
                  {item.label}
                </button>
              )
            )}

            <a
              href="/register"
              className="ml-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Create Account
            </a>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow-lg animate-slide-down">
          {navItems.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                className="block hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <button
                key={item.label}
                onClick={() => item.id && handleScroll(item.id)}
                className="block hover:text-blue-600"
              >
                {item.label}
              </button>
            )
          )}

          <a
            href="/register"
            className="block w-full text-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Create Account
          </a>
        </div>
      )}
    </nav>
  );
}
