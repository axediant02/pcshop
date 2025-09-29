"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash, Minus, Plus, Truck, Headset, MessageSquare, Gift, ShoppingCart, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { cartService } from "@/services/cartService";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  isChecked: boolean;
}

type CartItemApi = {
  id: number;
  product_id: number;
  quantity: number;
  price?: number;
  product?: {
    name?: string;
    price?: number;
    image_url?: string;
  };
};

type CartApiResponse = {
  cart_id: number;
  items: CartItemApi[];
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await cartService.getCart();
        const { items = [] } = (data ?? {}) as Partial<CartApiResponse>;
        const apiItems: CartItemApi[] = Array.isArray(items) ? items : [];

        const formatted: CartItem[] = apiItems.map((item) => ({
          id: item.id,
          name: item.product?.name ?? `Product #${item.product_id}`,
          price: Number(item.price ?? item.product?.price ?? 0),
          quantity: item.quantity,
          image_url: item.product?.image_url ?? "https://placehold.co/80x80?text=Item",
          isChecked: true,
        }));
        setCartItems(formatted);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        toast.error("Unable to load cart.");
      }
    };
    fetchCart();
  }, []);

  const handleRemoveItem = async (id: number) => {
    try {
      await cartService.deleteCartItem(id);
      setCartItems(cartItems.filter((item) => item.id !== id));
      toast.error("Item removed from cart!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item.");
    }
  };

  const handleUpdateQuantity = async (id: number, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );

    try {
      const item = cartItems.find((i) => i.id === id);
      if (item) {
        await cartService.updateCartItem(id, Math.max(1, item.quantity + delta));
      }
    } catch (error) {
      toast.error("Failed to update quantity.");
    }
  };

  const handleToggleCheck = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => (item.isChecked ? acc + item.price * item.quantity : acc),
      0
    );
  }, [cartItems]);

  const total = useMemo(() => {
    const calculatedTotal = subtotal - discount;
    return Math.max(0, calculatedTotal);
  }, [subtotal, discount]);

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "save20") {
      setDiscount(subtotal * 0.2);
      toast.success("Coupon applied! You got 20% off.");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* NAVBAR */}
      <nav className="bg-white shadow-sm py-4 border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            MyShop
          </Link>
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

      {/* MAIN */}
      <div className="container mx-auto p-4 sm:p-8 pt-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Shopping Bag</h1>
        <p className="text-gray-600 mb-8">
          {cartItems.filter((item) => item.isChecked).length} item(s) in your bag selected
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4 sm:p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <p className="text-xl">Your cart is empty.</p>
                  <Link
                    href="/products"
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
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
                          <h2 className="text-base font-medium text-gray-900 line-clamp-1">
                            {item.name}
                          </h2>
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
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
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

          {/* SIDEBAR */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Coupon Code</h2>
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
                  <span>
                    Subtotal ({cartItems.filter((item) => item.isChecked).length} items)
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
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
              <Link href="/checkout">
                <Button className="w-full mt-6 text-lg py-3">Proceed to Checkout</Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
