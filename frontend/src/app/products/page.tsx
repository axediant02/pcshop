// app/products/page.tsx
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingCart, Zap } from "lucide-react"; // Import icons

// UI Components
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductsNavBar from "@/components/ProductsNavBar";

// Skeletons for the loading state
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
// import Image from "next/image";

// Define a Product interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category: string;
}

// Mock API call to get products
async function getProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Stylish T-Shirt", description: "Comfortable cotton t-shirt, perfect for everyday wear. Available in multiple sizes and colors.", price: 25.00, image_url: "https://via.placeholder.com/300x200/FF5733/FFFFFF?text=T-Shirt", category: "Apparel" },
        { id: 2, name: "Ergonomic Office Chair", description: "Designed for maximum comfort and support during long working hours. Features adjustable lumbar support and armrests.", price: 199.99, image_url: "https://via.placeholder.com/300x200/33FF57/FFFFFF?text=Office+Chair", category: "Furniture" },
        { id: 3, name: "Wireless Headphones", description: "High-fidelity sound with noise-cancelling features for an immersive audio experience. Long-lasting battery life.", price: 120.50, image_url: "https://via.placeholder.com/300x200/3357FF/FFFFFF?text=Headphones", category: "Electronics" },
        { id: 4, name: "Smartwatch", description: "Track your fitness, receive notifications, and stay connected on the go. Water-resistant design.", price: 89.95, image_url: "https://via.placeholder.com/300x200/FF33A1/FFFFFF?text=Smartwatch", category: "Electronics" },
        { id: 5, name: "Portable Bluetooth Speaker", description: "Compact and powerful speaker with rich bass and clear highs. Perfect for outdoor adventures.", price: 45.00, image_url: "https://via.placeholder.com/300x200/A1FF33/FFFFFF?text=Speaker", category: "Electronics" },
        { id: 6, name: "Designer Backpack", description: "Durable and stylish backpack with multiple compartments for all your essentials. Ideal for travel or daily commute.", price: 75.00, image_url: "https://via.placeholder.com/300x200/33A1FF/FFFFFF?text=Backpack", category: "Apparel" },
        { id: 7, name: "Gaming Keyboard", description: "Mechanical gaming keyboard with customizable RGB lighting and responsive keys for competitive play.", price: 79.99, image_url: "https://via.placeholder.com/300x200/FFC300/000000?text=Keyboard", category: "Electronics" },
        { id: 8, name: "Coffee Maker", description: "Programmable coffee maker with a built-in grinder for fresh, aromatic coffee every morning.", price: 60.00, image_url: "https://via.placeholder.com/300x200/C70039/FFFFFF?text=Coffee+Maker", category: "Home Goods" },
        { id: 9, name: "Leather Wallet", description: "A sleek and compact wallet made from genuine leather.", price: 40.00, image_url: "https://via.placeholder.com/300x200/3498DB/FFFFFF?text=Wallet", category: "Apparel" },
        { id: 10, name: "Desk Lamp", description: "Modern LED desk lamp with adjustable brightness and color temperature.", price: 35.00, image_url: "https://via.placeholder.com/300x200/9B59B6/FFFFFF?text=Desk+Lamp", category: "Home Goods" },
        { id: 11, name: "Yoga Mat", description: "Non-slip, eco-friendly yoga mat for all your fitness needs.", price: 30.00, image_url: "https://via.placeholder.com/300x200/1ABC9C/FFFFFF?text=Yoga+Mat", category: "Fitness" },
        { id: 12, name: "Fitness Tracker", description: "Monitors heart rate, steps, and sleep patterns.", price: 95.00, image_url: "https://via.placeholder.com/300x200/2ECC71/FFFFFF?text=Fitness+Tracker", category: "Fitness" },
      ]);
    }, 1000); // Simulate network delay of 1 second
  });
}

// Product Card component
const ProductCard = ({ product }: { product: Product }) => {
  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`, { autoClose: 1500 });
    console.log(`Product ${product.name} added to cart.`);
  };

  const handleBuyNow = () => {
    toast.info(`Proceeding to checkout with ${product.name}.`, { autoClose: 1500 });
    console.log(`Buying ${product.name} now.`);
  };
  
  return (
    <Card key={product.id} className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      )}
      <CardContent className="py-5">
        <CardTitle className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </CardTitle>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <p className="text-3xl font-extrabold text-blue-600">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddToCart} variant="outline" className="flex-1">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <Button onClick={handleBuyNow} className="flex-1">
            <Zap className="mr-2 h-4 w-4" /> Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
//TEST
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchTerm = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        const errorMessage = "Failed to load products. Please try again later.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let tempProducts = [...products];

    // Filter by search term
    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedSearchTerm) ||
          product.description.toLowerCase().includes(lowercasedSearchTerm)
      );
    }

    // Filter by category
    if (category) {
      tempProducts = tempProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    return tempProducts;
  }, [products, searchTerm, category]);

  // Update URL with search and category filters
  const handleSearch = useCallback((query: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (query) {
      newSearchParams.set("search", query);
    } else {
      newSearchParams.delete("search");
    }
    router.push(`?${newSearchParams.toString()}`);
  }, [searchParams, router]);

  const handleCategory = useCallback((cat: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (cat) {
      newSearchParams.set("category", cat);
    } else {
      newSearchParams.delete("category");
    }
    router.push(`?${newSearchParams.toString()}`);
  }, [searchParams, router]);

  const handleClearFilters = useCallback(() => {
    router.push("/products");
  }, [router]);

  if (loading) {
    return (
      <main className="bg-white text-gray-900 min-h-screen">
        <ProductsNavBar onSearch={handleSearch} onCategoryChange={handleCategory} />
        <div className="container mx-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-white text-gray-900 min-h-screen">
        <ProductsNavBar onSearch={handleSearch} onCategoryChange={handleCategory} />
        <div className="container mx-auto p-8 flex justify-center items-center h-96">
          <p className="text-xl text-red-600 font-medium">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <ProductsNavBar onSearch={handleSearch} onCategoryChange={handleCategory} />
      <div className="container mx-auto p-8">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {(searchTerm || category) && (
            <span className="font-semibold text-gray-700">Filters:</span>
          )}
          {searchTerm && (
            <Badge variant="secondary" className="px-3 py-1">
              Search: {searchTerm}
              <Button onClick={() => handleSearch("")} variant="ghost" className="h-4 p-0 ml-2 text-gray-500 hover:text-gray-900">x</Button>
            </Badge>
          )}
          {category && (
            <Badge variant="secondary" className="px-3 py-1">
              Category: {category}
              <Button onClick={() => handleCategory("")} variant="ghost" className="h-4 p-0 ml-2 text-gray-500 hover:text-gray-900">x</Button>
            </Badge>
          )}
          {(searchTerm || category) && (
            <Button onClick={handleClearFilters} variant="link" className="text-blue-600">
              Clear All
            </Button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 text-center">
            <p className="text-xl text-gray-600">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  );
}