"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify"; 
import { Input } from "@/components/ui/input";
import ProductsNavBar from "@/components/ProductsNavBar";

// Define a Product interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string; // Optional image URL for product display
}

async function getProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Stylish T-Shirt", description: "Comfortable cotton t-shirt, perfect for everyday wear. Available in multiple sizes and colors.", price: 25.00, image_url: "https://via.placeholder.com/300x200/FF5733/FFFFFF?text=T-Shirt" },
        { id: 2, name: "Ergonomic Office Chair", description: "Designed for maximum comfort and support during long working hours. Features adjustable lumbar support and armrests.", price: 199.99, image_url: "https://via.placeholder.com/300x200/33FF57/FFFFFF?text=Office+Chair" },
        { id: 3, name: "Wireless Headphones", description: "High-fidelity sound with noise-cancelling features for an immersive audio experience. Long-lasting battery life.", price: 120.50, image_url: "https://via.placeholder.com/300x200/3357FF/FFFFFF?text=Headphones" },
        { id: 4, name: "Smartwatch", description: "Track your fitness, receive notifications, and stay connected on the go. Water-resistant design.", price: 89.95, image_url: "https://via.placeholder.com/300x200/FF33A1/FFFFFF?text=Smartwatch" },
        { id: 5, name: "Portable Bluetooth Speaker", description: "Compact and powerful speaker with rich bass and clear highs. Perfect for outdoor adventures.", price: 45.00, image_url: "https://via.placeholder.com/300x200/A1FF33/FFFFFF?text=Speaker" },
        { id: 6, "name": "Designer Backpack", description: "Durable and stylish backpack with multiple compartments for all your essentials. Ideal for travel or daily commute.", price: 75.00, image_url: "https://via.placeholder.com/300x200/33A1FF/FFFFFF?text=Backpack" },
        { id: 7, name: "Gaming Keyboard", description: "Mechanical gaming keyboard with customizable RGB lighting and responsive keys for competitive play.", price: 79.99, image_url: "https://via.placeholder.com/300x200/FFC300/000000?text=Keyboard" },
        { id: 8, name: "Coffee Maker", description: "Programmable coffee maker with a built-in grinder for fresh, aromatic coffee every morning.", price: 60.00, image_url: "https://via.placeholder.com/300x200/C70039/FFFFFF?text=Coffee+Maker" },
      ]);
    }, 1000); // Simulate network delay of 1 second
  });
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); // New state for the search input

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts(); // Fetch products using the mock function
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        const errorMessage = "Failed to load products. Please try again later.";
        setError(errorMessage);
        toast.error(errorMessage); // Display error using toast notification
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Filter products based on the search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return products; // If no search term, return all products
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedSearchTerm) ||
        product.description.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [products, searchTerm]); // Re-filter only when products or search term changes

  // Removed handleAddToCart and handleBuyNow functions as per instructions.

  const handleSearch = (q: string) => {
    // TODO: wire to your filtering/query params
    // e.g., router.push(`/products?search=${encodeURIComponent(q)}`)
    console.log("search:", q);
  };

  const handleCategory = (c: string) => {
    // TODO: wire to your filtering/query params
    console.log("category:", c);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <ProductsNavBar onSearch={handleSearch} onCategoryChange={handleCategory} />
      <div className="container mx-auto p-8">

        {filteredProducts.length === 0 ? ( // Display message if no products match the search
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-600">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => ( // Map over filtered products
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-3xl font-extrabold text-blue-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  {/* Removed Add to Cart and Buy Now buttons as per instructions */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
