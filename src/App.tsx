import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { StoreProvider, useStore } from "./context/StoreContext";
import { CartProvider, useCart } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Product } from "./data/products";
import AnimatedLogin from "./components/auth/AnimatedLogin";
import AnimatedSignup from "./components/auth/AnimatedSignup";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import DeliveryDashboard from "./components/delivery/DeliveryDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProducts from "./components/admin/AdminProducts";
import AdminOrders from "./components/admin/AdminOrders";
import AdminCustomers from "./components/admin/AdminCustomers";
import AdminSettings from "./components/admin/AdminSettings";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import CartSidebar from "./components/CartSidebar";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import StaticPage from "./components/StaticPage";
import { ProductGridSkeleton } from "./components/Skeleton";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./hooks/useScrollAnimation";

// ============ AUTH SCREENS ============
function AuthScreen() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <AnimatePresence mode="wait">
      {mode === "login" ? (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatedLogin onSwitchToSignup={() => setMode("signup")} />
        </motion.div>
      ) : (
        <motion.div
          key="signup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatedSignup onSwitchToLogin={() => setMode("login")} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============ STORE FRONT ============
function StoreFront({ onGoToDashboard }: { onGoToDashboard: () => void }) {
  const { products } = useStore();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isCartOpen, setIsCartOpen } = useCart();

  // Simulate loading for skeleton demo
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* User Welcome Bar */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">{user?.avatar}</span>
            <span className="text-xs text-amber-700">
              Shopping as <span className="font-semibold">{user?.name}</span>
            </span>
          </div>
          <button
            onClick={onGoToDashboard}
            className="px-4 py-1.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-medium rounded-full flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            My Dashboard
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://image.qwenlm.ai/generated-images/ea6fd9dc-2119-4f4f-bbbb-de4af6bd1077/_result.png"
            alt="Artisanal foods"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-white/60 to-white" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full mb-4 tracking-wide uppercase">
                  ✨ Handpicked with Love
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-900 mb-4 leading-tight">
                  Curated Provisions for the
                  <span className="text-amber-700"> Discerning Palate</span>
                </h2>
                <p className="text-amber-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                  Discover exceptional artisanal foods sourced from the world's finest producers.
                  Each item is hand-selected for quality, provenance, and extraordinary flavor.
                </p>
                <div className="flex items-center justify-center gap-6 mt-6 text-sm text-amber-600">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Free shipping over $75
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Ethically sourced
                  </span>
                  <span className="hidden sm:flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Freshness guaranteed
                  </span>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
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

        {isLoading ? (
          <ProductGridSkeleton count={6} />
        ) : filteredProducts.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
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
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />

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
        <Checkout onClose={() => setShowCheckout(false)} />
      )}
    </div>
  );
}

// ============ ADMIN PANEL ============
function AdminPanel() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const { logout } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <AdminDashboard />;
      case "products": return <AdminProducts />;
      case "orders": return <AdminOrders />;
      case "customers": return <AdminCustomers />;
      case "settings": return <AdminSettings />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onLogout={logout}
    >
      {renderPage()}
    </AdminLayout>
  );
}

// ============ MAIN ROUTER ============
function AppRouter() {
  const { isAuthenticated, user } = useAuth();
  const [showStore, setShowStore] = useState(false);
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  // Handle static page navigation
  const handleNavigate = (page: string) => {
    if (page === "home" || page === "shop") {
      setCurrentPage(null);
      setShowStore(true);
    } else {
      setCurrentPage(page);
    }
  };

  // If not authenticated, show auth screens
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  // Show static page if selected
  if (currentPage) {
    return <StaticPage page={currentPage} onNavigate={handleNavigate} />;
  }

  // Route based on role
  switch (user?.role) {
    case "admin":
      return <AdminPanel />;
    case "delivery":
      return <DeliveryDashboard />;
    case "customer":
      if (showStore) {
        return <StoreFront onGoToDashboard={() => setShowStore(false)} />;
      }
      return <CustomerDashboardWithStore onBrowseStore={() => setShowStore(true)} />;
    default:
      return <AuthScreen />;
  }
}

// Customer Dashboard with option to browse store
function CustomerDashboardWithStore({ onBrowseStore }: { onBrowseStore: () => void }) {
  return (
    <div>
      <CustomerDashboard />
      {/* Floating Browse Store Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        onClick={onBrowseStore}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-full shadow-xl hover:shadow-2xl transition-all"
      >
        <span>🏪</span>
        <span className="text-sm font-medium">Browse Store</span>
      </motion.button>
    </div>
  );
}

// ============ APP ROOT ============
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StoreProvider>
          <CartProvider>
            <AppRouter />
          </CartProvider>
        </StoreProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
