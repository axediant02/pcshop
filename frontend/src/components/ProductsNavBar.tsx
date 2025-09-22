// components/ProductsNavBar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ShoppingCart, User, X, LayoutGrid } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

interface ProductsNavBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

const categories = ["All", "Laptops", "Desktops", "PC Components", "Peripherals", "Monitors", "Keyboard", "Storage"];

export default function ProductsNavBar({ onSearch, onCategoryChange }: ProductsNavBarProps) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(search);
    setIsSearchOpen(false);
  };

  const handleLogout = () => {
    toast.info("You have been logged out.");
    console.log("Logged out");
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category === "All" ? "" : category);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm py-4 border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        <Link href="/" className="hidden sm:block">
          <div className="text-2xl font-bold hover:text-blue-600 transition-colors whitespace-nowrap">
            MyShop
          </div>
        </Link>
        
        <div className="flex-1">
          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-lg hidden sm:block mx-auto">
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              className="pl-10 pr-4 w-full"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          </form>

          {/* Mobile Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:hidden">
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              className="pl-10 pr-4 w-full"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          </form>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Categories Segmented Control (Desktop) */}
          <div className="hidden sm:flex rounded-full border border-gray-300 bg-gray-100 p-1">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                className={`rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-900'
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          
          {/* Categories Dropdown (Mobile) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="sm:hidden">
              <Button variant="outline" className="flex items-center gap-2">
                <span className="sm:hidden">
                  <LayoutGrid className="w-5 h-5" />
                </span>
                <span className="hidden sm:block">
                  Categories
                  <ChevronDown className="w-4 h-4" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((cat) => (
                <DropdownMenuItem key={cat} onClick={() => handleCategoryClick(cat)}>
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.info("Viewing Profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Viewing Settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-white transition-all duration-300">
          <div className="container mx-auto px-4 py-4 flex items-center gap-2">
            <form onSubmit={handleSearchSubmit} className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                className="pl-10 pr-4 w-full"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            </form>
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}