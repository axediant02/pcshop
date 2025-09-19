// components/ProductsNavBar.tsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "next/navigation";

interface ProductsNavBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

const categories = ["All", "Electronics", "Apparel", "Furniture", "Home Goods", "Fitness"];

export default function ProductsNavBar({ onSearch, onCategoryChange }: ProductsNavBarProps) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(search);
  };
  
  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm py-4 border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Products</div>
        <div className="flex items-center space-x-4 flex-grow justify-end">
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-sm">
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="pl-10 pr-4"
          />

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          </form>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Categories <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((cat) => (
                <DropdownMenuItem key={cat} onClick={() => onCategoryChange(cat === "All" ? "" : cat)}>
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}