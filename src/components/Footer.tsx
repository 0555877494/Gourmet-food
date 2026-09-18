import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 4000);
    }
  };

  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-amber-900 text-amber-100">
      {/* Newsletter Section */}
      <div className="border-b border-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Join Our Culinary Circle ✉️
              </h3>
              <p className="text-amber-200 text-sm">
                Subscribe for exclusive recipes, early access to new arrivals, and 10% off your first order.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-full bg-amber-800/50 border border-amber-700 text-white placeholder-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="px-6 py-3 bg-white text-amber-900 rounded-full text-sm font-semibold hover:bg-amber-50 transition-colors disabled:opacity-70"
              >
                {subscribed ? "✓ Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img 
                src="https://image.qwenlm.ai/generated-images/0ac7ab97-8192-4258-b440-253435684dd5/_result.png" 
                alt="Saveur & Co." 
                className="h-8 w-auto"
              />
              <h4 className="font-serif text-lg font-bold text-white">Saveur & Co.</h4>
            </div>
            <p className="text-sm text-amber-300 leading-relaxed mb-4">
              Bringing the world's finest artisanal foods to your doorstep since 2020.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-amber-800 hover:bg-amber-700 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-amber-800 hover:bg-amber-700 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 bg-amber-800 hover:bg-amber-700 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.189 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" aria-label="Pinterest" className="w-9 h-9 bg-amber-800 hover:bg-amber-700 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 bg-amber-800 hover:bg-amber-700 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h5 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Shop</h5>
            <ul className="space-y-2 text-sm text-amber-300">
              <li><button onClick={() => handleNav("shop")} className="hover:text-white transition-colors">All Products</button></li>
              <li><button onClick={() => handleNav("shop")} className="hover:text-white transition-colors">Oils & Vinegars</button></li>
              <li><button onClick={() => handleNav("shop")} className="hover:text-white transition-colors">Honey & Preserves</button></li>
              <li><button onClick={() => handleNav("shop")} className="hover:text-white transition-colors">Chocolates</button></li>
              <li><button onClick={() => handleNav("shop")} className="hover:text-white transition-colors">Gift Sets</button></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Help</h5>
            <ul className="space-y-2 text-sm text-amber-300">
              <li><button onClick={() => handleNav("contact")} className="hover:text-white transition-colors">Contact Us</button></li>
              <li><button onClick={() => handleNav("faq")} className="hover:text-white transition-colors">FAQ</button></li>
              <li><button onClick={() => handleNav("shipping")} className="hover:text-white transition-colors">Shipping & Returns</button></li>
              <li><button onClick={() => handleNav("track")} className="hover:text-white transition-colors">Track Order</button></li>
              <li><button onClick={() => handleNav("returns")} className="hover:text-white transition-colors">Return Policy</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Company</h5>
            <ul className="space-y-2 text-sm text-amber-300">
              <li><button onClick={() => handleNav("about")} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => handleNav("blog")} className="hover:text-white transition-colors">Our Blog</button></li>
              <li><button onClick={() => handleNav("careers")} className="hover:text-white transition-colors">Careers</button></li>
              <li><button onClick={() => handleNav("press")} className="hover:text-white transition-colors">Press</button></li>
              <li><button onClick={() => handleNav("sustainability")} className="hover:text-white transition-colors">Sustainability</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-amber-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-amber-400">
            © 2026 Saveur & Co. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-amber-400">
            <button onClick={() => handleNav("privacy")} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => handleNav("terms")} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => handleNav("cookies")} className="hover:text-white transition-colors">Cookie Policy</button>
            <button onClick={() => handleNav("accessibility")} className="hover:text-white transition-colors">Accessibility</button>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-400">
            <span>🔒 Secure Payments</span>
            <span className="flex gap-1">
              <span className="px-1.5 py-0.5 bg-amber-800 rounded">VISA</span>
              <span className="px-1.5 py-0.5 bg-amber-800 rounded">MC</span>
              <span className="px-1.5 py-0.5 bg-amber-800 rounded">AMEX</span>
              <span className="px-1.5 py-0.5 bg-amber-800 rounded">PP</span>
            </span>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
          >
            <span>✓</span> Welcome to our culinary circle! Check your email for 10% off.
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
