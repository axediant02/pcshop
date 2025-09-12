import Navbar from "@/components/Navbar";
import BannerCarousel from "@/components/BannerCarousel";
import Link from "next/link";

// Feature Card
const FeatureCard = ({ title, desc }: { title: string; desc: string }) => (
  <div className="p-6 bg-white rounded-xl shadow border border-gray-200">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

// Category Card
const CategoryCard = ({ label, emoji }: { label: string; emoji: string }) => (
  <a
    href={`/products?cat=${encodeURIComponent(label)}`}
    className="group rounded-xl border border-gray-200 bg-white p-6 shadow hover:shadow-md transition"
  >
    <div className="text-3xl">{emoji}</div>
    <div className="mt-3 font-semibold">{label}</div>
    <div className="text-sm text-gray-500 group-hover:text-gray-700">Shop now →</div>
  </a>
);

// Product Card
const ProductCard = ({ title, price }: { title: string; price: string }) => (
  <div className="rounded-xl bg-white shadow border border-gray-200 overflow-hidden">
    <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300" />
    <div className="p-4">
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-gray-500">High-performance gear</div>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-bold">{price}</span>
        <Link href="/products" className="text-blue-600 hover:underline">View</Link>
      </div>
    </div>
  </div>
);

// Testimonial Card
const TestimonialCard = ({ quote }: { quote: string }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">
    <p className="italic">“{quote}”</p>
    <p className="mt-4 text-sm text-gray-500">— Verified Buyer</p>
  </div>
);

export default function LandingPage() {
  return (
    <main className="bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center px-6 py-20 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
          {/* Left: Headline */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Build the Beast – Unleash Peak Performance
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto md:mx-0">
              Custom PCs, components, and gear curated for gamers, creators, and power users.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="/products"
                className="px-6 py-3 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition"
              >
                Start Shopping
              </Link>
              <Link
                href="#features"
                className="px-6 py-3 rounded-lg bg-gray-100 text-gray-900 shadow hover:bg-gray-200 transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right: Carousel */}
          <BannerCarousel />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Shop With Us?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard title="Affordable Prices" desc="Get the best deals on products you love without breaking the bank." />
            <FeatureCard title="Fast Delivery" desc="Quick and reliable shipping, so you never wait too long." />
            <FeatureCard title="Quality Guaranteed" desc="All products are carefully selected and quality checked." />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="scroll-mt-20 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Featured Categories</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[{ label: "GPUs", emoji: "🎮" }, { label: "CPUs", emoji: "🧠" }, { label: "Keyboards", emoji: "⌨️" }, { label: "Monitors", emoji: "🖥️" }]
              .map((c) => <CategoryCard key={c.label} {...c} />)}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section id="bestsellers" className="scroll-mt-20 py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Best Sellers</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCard key={i} title={`Product ${i + 1}`} price="$199" />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="scroll-mt-20 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">What Customers Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Blazing fast delivery and top-notch build quality!",
              "Best prices I found online.",
              "Excellent support helped me pick the right parts."
            ].map((quote, idx) => (
              <TestimonialCard key={idx} quote={quote} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
          <p className="text-center max-w-3xl mx-auto text-lg text-gray-600">
            At MyShop, we believe shopping should be easy, enjoyable, and affordable. 
            Our mission is to bring high-quality products closer to you, with fast 
            delivery and excellent customer service.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="scroll-mt-20 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-3">Ready to find your next favorite product?</h2>
            <p className="text-gray-600">Join our newsletter for exclusive deals and build tips.</p>
            <form action="#" className="mt-6 flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="px-6 py-3 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="scroll-mt-20 bg-gray-900 text-white py-20 px-6 text-center"
      >
        <div className="max-w-7xl mx-auto">
          <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
