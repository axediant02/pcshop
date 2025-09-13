"use client";

import Link from "next/link";
import { useState } from "react";

const categories = ["All", "GPUs", "CPUs", "Keyboards", "Monitors", "Storage", "Memory"];

export default function ProductsNavBar({
  onSearch,
  onCategoryChange,
}: {
  onSearch?: (q: string) => void;
  onCategoryChange?: (c: string) => void;
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(q);
  };

  const changeCat = (c: string) => {
    setCat(c);
    onCategoryChange?.(c);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
        <Link href="/" className="font-extrabold text-xl tracking-tight">
          MyShop
        </Link>

        <nav className="hidden md:flex items-center gap-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => changeCat(c)}
              className={`px-3 py-1.5 rounded-md text-sm transition ${
                cat === c ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {c}
            </button>
          ))}
        </nav>

        <form onSubmit={submit} className="ml-auto flex-1 max-w-xl">
          <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
              Search
            </button>
          </div>
        </form>

        <div className="hidden sm:flex items-center gap-2">
          <Link href="/cart" className="px-3 py-2 rounded-md hover:bg-gray-100">
            Cart
          </Link>
          <Link href="/account" className="px-3 py-2 rounded-md hover:bg-gray-100">
            Account
          </Link>
        </div>
      </div>

      <div className="md:hidden border-t border-gray-200 px-6 py-2">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => changeCat(c)}
              className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${
                cat === c ? "bg-gray-900 text-white" : "text-gray-700 bg-gray-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
