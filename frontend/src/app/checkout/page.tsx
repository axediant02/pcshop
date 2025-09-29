"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Truck, Lock, CreditCard, Clock, XCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";


interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  disabled: boolean;
  unavailableText?: string;
}

export default function CheckoutPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");

  const mockRouterPush = (path: string) => {
    console.log(`Mock Navigation: Navigating to ${path}`);
  };
  const router = useRouter();
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
    {
      id: 3,
      name: "Ergonomic Office Chair",
      price: 199.99,
      quantity: 1,
      image_url: "https://via.placeholder.com/50x50/33FF57/FFFFFF?text=OC",
    },
    {
      id: 4,
      name: "Smartwatch",
      price: 89.95,
      quantity: 1,
      image_url: "https://via.placeholder.com/50x50/FF33A1/FFFFFF?text=SW",
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "cod",
      name: "Cash on Delivery (COD)",
      description: "Pay with cash upon delivery.",
      icon: Truck,
      disabled: false,
    },
    {
      id: "gcash",
      name: "Gcash (E-Wallet)",
      description: "Fast, secure mobile payment.",
      icon: CreditCard,
      disabled: true,
      unavailableText: "Temporarily unavailable.",
    },
    {
      id: "paylater",
      name: "Paylater (Installment)",
      description: "Buy now, pay in installments.",
      icon: Clock,
      disabled: true,
      unavailableText: "Coming soon.",
    },
    {
      id: "paymaya",
      name: "Paymaya (E-Wallet)",
      description: "Secure payments via Paymaya.",
      icon: CreditCard,
      disabled: true,
      unavailableText: "Temporarily unavailable.",
    },
  ];

  const subtotal = useMemo(() =>
    orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [orderItems]
  );

  const shippingCost = 7.50;
  const total = useMemo(() => subtotal + shippingCost, [subtotal]);

  const handlePlaceOrder = () => {
    if (selectedPaymentMethod === "cod") {
      toast.success("Order placed successfully! You chose Cash on Delivery.", { autoClose: 3000 });
      console.log("Order placed with COD.");
    } else {
      toast.error("Please select a valid payment method.", { autoClose: 3000 });
    }
  };

  const handleCancelOrder = () => {
    toast.info("Order cancelled. Returning to products page.", { autoClose: 2000 });
    router.push("/products");
  };

  const visibleItems = orderItems.slice(0, 2);
  const otherItemsCount = orderItems.length - 2;

  const toastStyle = {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    zIndex: 9999,
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <ToastContainer position="top-right" autoClose={2000} style={toastStyle} />

      <div className="container mx-auto p-4 sm:p-8 pt-6 max-w-6xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Final Checkout</h1>
        <p className="text-gray-500 mb-8 text-lg">Review your order and select your payment method.</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          <div className="lg:col-span-3 space-y-6">

            <Card className="p-6 shadow-lg border-t-4 border-blue-500 rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-3">Your Items ({orderItems.length})</h2>
              
              <div className="space-y-4">
                {visibleItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 border-b last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover shadow-sm"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/40x40/aaaaaa/FFFFFF?text=Item'; }}
                      />
                      <div className="flex flex-col">
                        <span className="text-base font-medium text-gray-800">{item.name}</span>
                        <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="text-base font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                {otherItemsCount > 0 && (
                  <div className="text-center pt-2 text-sm text-blue-600 font-medium bg-blue-50 p-2 rounded-lg">
                    And {otherItemsCount} other item(s) in your order.
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6 shadow-lg rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-3">Choose Payment Method</h2>

              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
                className="space-y-4"
              >
                {paymentMethods.map((method) => (
                  <Label
                    key={method.id}
                    htmlFor={method.id}
                    className={`
                      flex items-center justify-between p-5 border-2 rounded-xl transition-all duration-200
                      ${
                        method.disabled
                          ? 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                          : selectedPaymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-500'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-white cursor-pointer'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value={method.id} id={method.id} disabled={method.disabled} className="w-5 h-5 text-blue-600" />
                      <method.icon className={`w-6 h-6 ${method.disabled ? 'text-gray-400' : 'text-blue-600'}`} />
                      
                      <div className="flex flex-col">
                        <span className={`text-lg font-bold ${method.disabled ? 'text-gray-400' : 'text-gray-800'}`}>
                          {method.name}
                          {method.disabled && (
                             <span className="ml-2 text-xs font-normal text-red-500 bg-red-100 px-2 py-0.5 rounded-full border border-red-200">
                               {method.unavailableText || "Unavailable"}
                             </span>
                          )}
                        </span>
                        <span className="text-sm text-gray-500">
                          {method.description}
                        </span>
                      </div>
                    </div>
                    {selectedPaymentMethod === method.id && !method.disabled && (
                      <Check className="h-6 w-6 text-blue-500 bg-white rounded-full p-0.5" />
                    )}
                    {method.disabled && <Lock className="h-5 w-5 text-gray-400" />}
                  </Label>
                ))}
              </RadioGroup>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white shadow-xl rounded-xl sticky top-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 border-b pb-3">Payment Details</h2>
              <div className="space-y-4 text-gray-700">
                
                <div className="flex justify-between text-base">
                  <span>Subtotal ({orderItems.length} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span>Shipping Fee</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between font-extrabold text-2xl text-gray-900">
                  <span>Order Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2 text-sm font-semibold">
                <Check className="h-4 w-4" />
                Paying with: {paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name || "Unknown"}
              </div>

              </div>

              <div className="flex flex-col gap-3 mt-8">
                <Button
                  className="w-full text-lg py-3 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50 transition-transform transform hover:scale-[1.01]"
                  onClick={handlePlaceOrder}
                  disabled={selectedPaymentMethod !== 'cod'}
                >
                  Confirm & Place Order
                </Button>
                <Button
                  className="w-full text-lg py-3"
                  variant="outline"
                  onClick={handleCancelOrder}
                >
                  <XCircle className="w-5 h-5 mr-2 text-red-500" />
                  Cancel Order
                </Button>
              </div>
              
              <p className="text-xs text-center text-gray-400 mt-4">
                By placing this order, you agree to our Terms and Conditions.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
