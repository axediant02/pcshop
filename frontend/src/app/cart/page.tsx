"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash, Minus, Plus, Truck, Headset, MessageSquare, Gift, ShoppingCart, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  isChecked: boolean;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 120.50,
      quantity: 1,
      image_url: "https://via.placeholder.com/100x100/3357FF/FFFFFF?text=Headphones",
      isChecked: true,
    },
    {
      id: 2,
      name: "Gaming Keyboard",
      price: 79.99,
      quantity: 2,
      image_url: "https://via.placeholder.com/100x100/FFC300/000000?text=Keyboard",
      isChecked: true,
    },
    {
      id: 3,
      name: "Ergonomic Office Chair",
      price: 199.99,
      quantity: 1,
      image_url: "https://via.placeholder.com/100x100/33FF57/FFFFFF?text=Office+Chair",
      isChecked: false,
    },
  ]);

  // Removed shippingCountry and shippingZip state
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.error("Item removed from cart!");
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleToggleCheck = (id: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  // Removed calculateShippingCost function
  // Removed shippingCost useMemo hook, setting it to 0 as shipping is no longer calculated
  const shippingCost = 0; 

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => 
      item.isChecked ? acc + item.price * item.quantity : acc, 0
    );
  }, [cartItems]);

  const total = useMemo(() => {
    // Updated total calculation to remove shippingCost
    const calculatedTotal = subtotal - discount;
    return Math.max(0, calculatedTotal);
  }, [subtotal, discount]);

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "save20") {
      setDiscount(subtotal * 0.20);
      toast.success("Coupon applied! You got 20% off.");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} />
      {/* Top Navbar Placeholder - integrate your actual Navbar here */}
      <nav className="bg-white shadow-sm py-4 border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">MyShop</Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4 sm:p-8 pt-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Shopping Bag</h1>
        <p className="text-gray-600 mb-8">{cartItems.filter(item => item.isChecked).length} item(s) in your bag selected</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4 sm:p-6">
              <div className="hidden sm:grid grid-cols-12 gap-4 items-center text-sm font-semibold text-gray-500 pb-2 border-b border-gray-200">
                <span className="col-span-6">Product</span>
                <span className="col-span-2 text-right">Price</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Total Price</span>
              </div>
              {cartItems.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <p className="text-xl">Your cart is empty.</p>
                  <Link href="/products" className="text-blue-600 hover:underline mt-2 inline-block">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {cartItems.map(item => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 items-center py-4">
                      <div className="col-span-12 sm:col-span-6 flex items-center gap-3">
                        <Checkbox 
                          checked={item.isChecked}
                          onCheckedChange={() => handleToggleCheck(item.id)}
                          aria-label={`Select ${item.name}`}
                        />
                        <img
                          src={item.image_url}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover border border-gray-100"
                        />
                        <div>
                          <h2 className="text-base font-medium text-gray-900 line-clamp-1">{item.name}</h2>
                          <p className="text-xs text-gray-500">Color: Black</p>
                          <p className="text-xs text-gray-500">Size: 42</p>
                        </div>
                      </div>
                      <span className="hidden sm:block col-span-2 text-right text-base font-medium text-gray-700">
                        ${item.price.toFixed(2)}
                      </span>
                      <div className="col-span-7 sm:col-span-2 flex items-center justify-center gap-1 mt-2 sm:mt-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="col-span-5 sm:col-span-2 flex flex-col items-end justify-between">
                        <span className="text-base font-bold text-gray-900 mb-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:bg-red-50 hover:text-red-700 h-8 w-8"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
            {/* Removed the "Calculated Shipping" Card */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Coupon Code</h2>
              <p className="text-sm text-gray-600 mb-3">
                Have a coupon? Enter your code below to get a discount on your purchase.
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleApplyCoupon}>Apply</Button>
              </div>
            </Card>
            <Card className="p-4 sm:p-6 bg-blue-50 border-blue-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Cart Total</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.filter(item => item.isChecked).length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {/* Removed Shipping line item */}
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator className="my-3 border-blue-200" />
                <div className="flex justify-between font-bold text-xl text-gray-900">
                  <span>Order Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full mt-6 text-lg py-3">
                Proceed to Checkout
              </Button>
            </Card>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <Card className="p-4 text-center">
            <Truck className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">Free Shipping</h3>
            <p className="text-sm text-gray-600">On all orders over $50</p>
          </Card>
          <Card className="p-4 text-center">
            <Headset className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">24/7 Support</h3>
            <p className="text-sm text-gray-600">Call us anytime</p>
          </Card>
          <Card className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">Live Chat</h3>
            <p className="text-sm text-gray-600">Chat with us directly</p>
          </Card>
          <Card className="p-4 text-center">
            <Gift className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">Gift Cards</h3>
            <p className="text-sm text-gray-600">Perfect for any occasion</p>
          </Card>
        </div>
      </div>
    </div>
  );
}