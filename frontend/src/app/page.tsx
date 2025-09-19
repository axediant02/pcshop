// app/page.tsx
"use client"; // This directive is necessary for using React hooks like useState

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image"; // Make sure to import the Image component
import { FeatureCard } from "@/components/FeatureCard";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Truck, Gem, Smile } from "lucide-react"; // Icons for feature cards

// Import modal components and toast notifications
import { SignUpDialog } from "@/components/SignUpDialog";
import { LoginDialog } from "@/components/LogInDialog";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Mock data for demonstration
const mockProducts = [
  { id: "1", title: "Mechanical Keyboard", price: "$129", imageUrl: "/images/keyboard.jpg", href: "/products/1" },
  { id: "2", title: "Gaming Mouse", price: "$79", imageUrl: "/images/mouse.jpg", href: "/products/2" },
  { id: "3", title: "4K Monitor", price: "$499", imageUrl: "/images/monitor.jpg", href: "/products/3" },
  { id: "4", title: "RTX 4080 GPU", price: "$1199", imageUrl: "/images/gpu.jpg", href: "/products/4" },
];

// Define initial form states
const initialSignupFormState = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const initialLoginFormState = {
  email: "",
  password: "",
};

export default function LandingPage() {
  // State for controlling modal visibility
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  
  // State for form data
  const [signupForm, setSignupForm] = useState(initialSignupFormState);
  const [loginForm, setLoginForm] = useState(initialLoginFormState);
  
  // State for loading indicators
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Handlers to open the modals
  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };
  
  const handleSignupClick = () => {
    setIsSignupOpen(true);
  };
  
  // Handlers for form input changes
// Handlers for form input changes
const onSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
};

const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
};

// Handlers for form submissions
const onSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSignupLoading(true);
  try {
    if (signupForm.password !== signupForm.passwordConfirmation) {
      toast.error("Passwords do not match.");
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Account created successfully!");
    setIsSignupOpen(false);
    setSignupForm(initialSignupFormState); // Reset form
  } catch  {
    toast.error("Failed to create account.");
  } finally {
    setIsSignupLoading(false);
  }
};

const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoginLoading(true);
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Logged in successfully!");
    setIsLoginOpen(false);
    setLoginForm(initialLoginFormState); // Reset form
  } catch  {
    toast.error("Failed to log in.");
  } finally {
    setIsLoginLoading(false);
  }
};



  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
      {/* Navbar with click handlers passed as props */}
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />

      {/* Hero Section */}
      <section id="hero" className="relative pt-24 pb-12 md:pt-36 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left: Headline and CTA */}
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter">
                Build the Beast – <br /> Unleash Peak Performance
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto md:mx-0">
                Custom PCs, components, and gear curated for gamers, creators, and power users.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link href="/products" passHref>
                  <Button size="lg" className="px-8 py-3 bg-blue-600 hover:bg-blue-700">
                    Start Shopping
                  </Button>
                </Link>
                <Link href="#features" passHref>
                  <Button size="lg" variant="outline" className="px-8 py-3">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="hidden md:block">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl animate-pulse" />
                <div className="absolute inset-4 rounded-3xl overflow-hidden shadow-2xl">
                   <Image src="/images/hero-pc.jpg" alt="Gaming PC setup" fill className="object-cover" priority />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Shop With Us?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard title="Fast Delivery" description="Quick and reliable shipping, so you never wait too long for your gear." icon={Truck} />
            <FeatureCard title="Quality Guaranteed" description="All products are carefully selected and quality checked for peak performance." icon={Gem} />
            <FeatureCard title="Dedicated Support" description="Our team is here to help you find the perfect components for your build." icon={Smile} />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Categories</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <CategoryCard label="GPUs" emoji="🎮" href="/products?cat=GPUs" />
            <CategoryCard label="CPUs" emoji="🧠" href="/products?cat=CPUs" />
            <CategoryCard label="Keyboards" emoji="⌨️" href="/products?cat=Keyboards" />
            <CategoryCard label="Monitors" emoji="🖥️" href="/products?cat=Monitors" />
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section id="bestsellers" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Best Sellers</h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
                href={product.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <TestimonialCard quote="Blazing fast delivery and top-notch build quality! My new PC is a beast." author="Alex G." />
            <TestimonialCard quote="The best prices I found online, hands down. Saved a ton on my new GPU." author="Jamie L." />
            <TestimonialCard quote="Excellent support helped me pick the right parts for my custom build. Truly grateful!" author="Chris M." />
          </div>
        </div>
      </section>

      {/* Newsletter / Call to Action */}
      <section id="cta" className="py-20 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to find your next favorite product?</h2>
            <p className="text-lg opacity-90">Join our newsletter for exclusive deals and build tips.</p>
            <form action="#" className="mt-8 flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-md px-4 py-3 text-gray-900 focus:ring-2 focus:ring-white focus:outline-none dark:bg-gray-100 dark:text-gray-900"
              />
              <Button type="submit" className="bg-white text-blue-600 hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 text-center bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Modals for login and signup */}
      <LoginDialog
        open={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        form={loginForm}
        onFormChange={onLoginChange}
        onSubmit={onLoginSubmit}
        isLoading={isLoginLoading}
      />
      <SignUpDialog
        open={isSignupOpen}
        onOpenChange={setIsSignupOpen}
        form={signupForm}
        onFormChange={onSignupChange}
        onSubmit={onSignupSubmit}
        isLoading={isSignupLoading}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  );
}