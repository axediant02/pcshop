"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Truck } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export default function CheckoutPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");

  // Sample data for the order summary
  const orderItems: CartItem[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 120.50,
      quantity: 1,
      image_url: "https://via.placeholder.com/50x50/3357FF/FFFFFF?text=HP",
    },
    {
      id: 2,
      name: "Gaming Keyboard",
      price: 79.99,
      quantity: 2,
      image_url: "https://via.placeholder.com/50x50/FFC300/000000?text=KB",
    },
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 7.50;
  const total = subtotal + shippingCost;

  const handlePlaceOrder = () => {
    if (selectedPaymentMethod === "cod") {
      toast.success("Order placed successfully! You chose Cash on Delivery.", { autoClose: 3000 });
      console.log("Order placed with COD.");
    } else {
      toast.error("Please select a valid payment method.", { autoClose: 3000 });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="container mx-auto p-4 sm:p-8 pt-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600 mb-8">Securely complete your purchase.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column: Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary Card */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Ordered Products</h2>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-base font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-base font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Payment Method Card */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
                className="space-y-4"
              >
                {/* Cash on Delivery (COD) - Useable */}
                <Label
                  htmlFor="cod"
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPaymentMethod === "cod" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="cod" id="cod" className="w-5 h-5" />
                    <div className="flex flex-col">
                      <span className="text-base font-medium">Cash on Delivery (COD)</span>
                      <span className="text-sm text-gray-500">Pay with cash upon delivery.</span>
                    </div>
                  </div>
                  {selectedPaymentMethod === "cod" && (
                    <Check className="h-5 w-5 text-blue-500" />
                  )}
                </Label>

                {/* Gcash - Disabled Placeholder */}
                <Label
                  htmlFor="gcash"
                  className="flex items-center justify-between p-4 border rounded-lg bg-gray-100 cursor-not-allowed"
                >
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="gcash" id="gcash" disabled className="w-5 h-5 opacity-50" />
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-gray-400">Gcash</span>
                      <span className="text-sm text-gray-400">Temporarily unavailable.</span>
                    </div>
                  </div>
                </Label>

                {/* Paylater - Disabled Placeholder */}
                <Label
                  htmlFor="paylater"
                  className="flex items-center justify-between p-4 border rounded-lg bg-gray-100 cursor-not-allowed"
                >
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="paylater" id="paylater" disabled className="w-5 h-5 opacity-50" />
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-gray-400">Paylater</span>
                      <span className="text-sm text-gray-400">Coming soon.</span>
                    </div>
                  </div>
                </Label>

                {/* Paymaya - Disabled Placeholder */}
                <Label
                  htmlFor="paymaya"
                  className="flex items-center justify-between p-4 border rounded-lg bg-gray-100 cursor-not-allowed"
                >
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="paymaya" id="paymaya" disabled className="w-5 h-5 opacity-50" />
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-gray-400">Paymaya</span>
                      <span className="text-sm text-gray-400">Temporarily unavailable.</span>
                    </div>
                  </div>
                </Label>
              </RadioGroup>
            </Card>
          </div>

          {/* Right Column: Order Total */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Total</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Order Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full mt-6 text-lg py-3"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}