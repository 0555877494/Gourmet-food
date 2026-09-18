import { useState, useMemo, useEffect } from "react";
import { StoreProvider, useStore } from "./context/StoreContext";
import { CartProvider, useCart } from "./context/CartContext";
import { Product } from "./data/products";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import CartSidebar from "./components/CartSidebar";
import Checkout from "./components/Checkout";
import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProducts from "./components/admin/AdminProducts";
import AdminOrders from "./components/admin/AdminOrders";
import AdminCustomers from "./components/admin/AdminCustomers";
import AdminSettings from "./components/admin/AdminSettings";

function StoreFront() {
  const { products } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const { isCartOpen, setIsCartOpen } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, products]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
              Curated Provisions for the
              <span className="text-amber-700"> Discerning Palate</span>
            </h2>
            <p className="text-amber-600 text-base sm:text-lg max-w-2xl mx-auto">
              Discover exceptional artisanal foods sourced from the world's finest producers.
              Each item is hand-selected for quality, provenance, and extraordinary flavor.
            </p>
          </div>
        </div>
        <div className="absolute top-10 left-10 text-4xl opacity-10 animate-pulse">🌿</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-10 animate-pulse">✨</div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-900">
              Our Collection
            </h3>
            <p className="text-sm text-amber-500">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🔍</span>
            <h4 className="text-xl font-serif font-semibold text-amber-800 mb-2">
              No products found
            </h4>
            <p className="text-amber-500">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-6 py-2.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🏪</span>
                <h4 className="font-serif text-lg font-bold text-white">Saveur & Co.</h4>
              </div>
              <p className="text-sm text-amber-300 leading-relaxed">
                Bringing the world's finest artisanal foods to your doorstep since 2020.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-3">Quality Promise</h5>
              <ul className="space-y-2 text-sm text-amber-300">
                <li>✓ Ethically sourced ingredients</li>
                <li>✓ Temperature-controlled shipping</li>
                <li>✓ Satisfaction guaranteed</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-3">Contact</h5>
              <ul className="space-y-2 text-sm text-amber-300">
                <li>hello@saveurco.com</li>
                <li>1-800-SAVEUR</li>
                <li>Mon-Fri 9am-6pm EST</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-amber-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-amber-400">
              © 2026 Saveur & Co. All rights reserved.
            </p>
            <button
              onClick={() => window.location.hash = "admin"}
              className="text-xs text-amber-500 hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Admin Panel
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {isCartOpen && (
        <CartSidebar
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />
      )}

      {showCheckout && (
        <Checkout onClose={handleCloseCheckout} />
      )}
    </div>
  );
}

function AdminPanel({ onLogout, onViewStore }: { onLogout: () => void; onViewStore: () => void }) {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <AdminProducts />;
      case "orders":
        return <AdminOrders />;
      case "customers":
        return <AdminCustomers />;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onLogout={onLogout}
      onViewStore={onViewStore}
    >
      {renderPage()}
    </AdminLayout>
  );
}

function AppRouter() {
  const [view, setView] = useState<"store" | "admin-login" | "admin">(() => {
    return window.location.hash === "#admin" ? "admin-login" : "store";
  });

  const handleLogin = () => {
    setView("admin");
  };

  const handleLogout = () => {
    window.location.hash = "";
    setView("store");
  };

  const handleBackToStore = () => {
    window.location.hash = "";
    setView("store");
  };

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#admin" && view === "store") {
        setView("admin-login");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [view]);

  if (view === "admin-login") {
    return <AdminLogin onLogin={handleLogin} onBack={handleBackToStore} />;
  }

  if (view === "admin") {
    return <AdminPanel onLogout={handleLogout} onViewStore={handleBackToStore} />;
  }

  return <StoreFront />;
}

export default function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </StoreProvider>
  );
}
