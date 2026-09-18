import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";
import { Product } from "../../data/products";

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "favorites" | "addresses" | "payments" | "profile">("overview");
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem(`wishlist_${user?.email}`);
    return saved ? JSON.parse(saved) : [1, 3, 5];
  });
  const [showReorder, setShowReorder] = useState<string | null>(null);
  const [showTracking, setShowTracking] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showCancelOrder, setShowCancelOrder] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Persist wishlist to localStorage
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(favorites));
    }
  }, [favorites, user?.email]);

  // Address book
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", street: "123 Main St", city: "New York", state: "NY", isDefault: true },
    { id: 2, label: "Work", street: "456 Office Blvd", city: "New York", state: "NY", isDefault: false },
  ]);
  const [showAddAddress, setShowAddAddress] = useState(false);

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Visa", last4: "4242", expiry: "12/27", isDefault: true },
    { id: 2, type: "Mastercard", last4: "8888", expiry: "08/26", isDefault: false },
  ]);
  const [showAddPayment, setShowAddPayment] = useState(false);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const mockOrders = [
    {
      id: "SV-A8K3M2",
      date: "Jan 15, 2026",
      status: "delivered" as const,
      total: 167.98,
      items: [
        { name: "Truffle-Infused Olive Oil", image: products[0]?.image || "", qty: 1, price: 42.99 },
        { name: "Mānuka Honey UMF 20+", image: products[2]?.image || "", qty: 1, price: 124.99 },
      ],
      trackingSteps: [
        { label: "Order Placed", date: "Jan 15, 10:30 AM", done: true },
        { label: "Confirmed", date: "Jan 15, 11:00 AM", done: true },
        { label: "Shipped", date: "Jan 16, 2:15 PM", done: true },
        { label: "Out for Delivery", date: "Jan 18, 8:00 AM", done: true },
        { label: "Delivered", date: "Jan 18, 3:45 PM", done: true },
      ],
    },
    {
      id: "SV-E3P7R6",
      date: "Jan 10, 2026",
      status: "delivered" as const,
      total: 167.97,
      items: [
        { name: "Truffle-Infused Olive Oil", image: products[0]?.image || "", qty: 1, price: 42.99 },
        { name: "25-Year Aged Balsamic Vinegar", image: products[1]?.image || "", qty: 1, price: 89.99 },
        { name: "Persian Saffron Threads", image: products[4]?.image || "", qty: 1, price: 34.99 },
      ],
      trackingSteps: [
        { label: "Order Placed", date: "Jan 10, 9:15 AM", done: true },
        { label: "Confirmed", date: "Jan 10, 9:45 AM", done: true },
        { label: "Shipped", date: "Jan 11, 1:00 PM", done: true },
        { label: "Out for Delivery", date: "Jan 13, 10:00 AM", done: true },
        { label: "Delivered", date: "Jan 13, 4:30 PM", done: true },
      ],
    },
    {
      id: "SV-F5R9T8",
      date: "Jan 5, 2026",
      status: "delivered" as const,
      total: 42.99,
      items: [
        { name: "Truffle-Infused Olive Oil", image: products[0]?.image || "", qty: 1, price: 42.99 },
      ],
      trackingSteps: [
        { label: "Order Placed", date: "Jan 5, 2:00 PM", done: true },
        { label: "Confirmed", date: "Jan 5, 2:30 PM", done: true },
        { label: "Shipped", date: "Jan 6, 10:00 AM", done: true },
        { label: "Out for Delivery", date: "Jan 8, 9:00 AM", done: true },
        { label: "Delivered", date: "Jan 8, 1:15 PM", done: true },
      ],
    },
  ];

  const totalSpent = mockOrders.reduce((s, o) => s + o.total, 0);
  const loyaltyPoints = Math.floor(totalSpent / 10);
  const nextTier = 500;
  const progressToNext = Math.min((loyaltyPoints / nextTier) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://image.qwenlm.ai/generated-images/0ac7ab97-8192-4258-b440-253435684dd5/_result.png" 
              alt="Saveur & Co." 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-sm font-serif font-bold text-amber-900">Saveur & Co.</h1>
              <p className="text-xs text-amber-500">My Account</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center text-sm">
                {user?.avatar}
              </div>
              <span className="text-sm font-medium text-amber-800 hidden sm:block">{user?.name}</span>
            </div>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="text-xs text-amber-500 hover:text-red-500 transition-colors px-2 py-1"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Welcome Card with Loyalty */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-800 via-amber-700 to-orange-700 rounded-2xl p-6 text-white mb-6 relative overflow-hidden"
        >
          {/* Decorative food pattern */}
          <div className="absolute top-0 right-0 opacity-10 text-8xl">🍽️</div>
          <div className="absolute bottom-0 left-0 opacity-5 text-6xl">🌿</div>
          
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif font-bold mb-1">
                Welcome back, {user?.name?.split(" ")[0]}! 👋
              </h2>
              <p className="text-amber-200 text-sm">
                Your curated collection of fine foods awaits.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <span className="text-xs text-amber-200">Loyalty Points</span>
                  <p className="text-lg font-bold">{loyaltyPoints}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <span className="text-xs text-amber-200">Member Since</span>
                  <p className="text-sm font-medium">{user?.joinDate}</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-48">
              <div className="flex justify-between text-xs text-amber-200 mb-1">
                <span>Gold Tier</span>
                <span>{loyaltyPoints}/{nextTier}</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full"
                />
              </div>
              <p className="text-xs text-amber-300 mt-1">
                {nextTier - loyaltyPoints} pts to Platinum
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Orders", value: mockOrders.length.toString(), icon: "📦", color: "from-blue-50 to-blue-100" },
            { label: "Favorites", value: favorites.length.toString(), icon: "❤️", color: "from-red-50 to-red-100" },
            { label: "Total Spent", value: `$${totalSpent.toFixed(0)}`, icon: "💰", color: "from-green-50 to-green-100" },
            { label: "Reward Points", value: loyaltyPoints.toString(), icon: "⭐", color: "from-amber-50 to-amber-100" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} rounded-xl border border-white p-4 text-center`}
            >
              <span className="text-xl mb-1 block">{stat.icon}</span>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {[
            { id: "overview" as const, label: "Overview", icon: "🏠" },
            { id: "orders" as const, label: "Orders", icon: "📦" },
            { id: "favorites" as const, label: "Favorites", icon: "❤️" },
            { id: "addresses" as const, label: "Addresses", icon: "📍" },
            { id: "payments" as const, label: "Payments", icon: "💳" },
            { id: "profile" as const, label: "Profile", icon: "👤" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-amber-800 text-white shadow-md"
                  : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Latest Order with Tracking */}
              <div className="bg-white rounded-2xl border border-amber-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-amber-900">Latest Order</h3>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                    ✓ Delivered
                  </span>
                </div>
                
                {/* Order Items */}
                <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                  {mockOrders[0].items.map((item, i) => (
                    <div key={i} className="flex-shrink-0 w-20">
                      <div className="w-20 h-20 rounded-xl overflow-hidden mb-1 border border-amber-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs text-amber-800 truncate">{item.name}</p>
                    </div>
                  ))}
                </div>

                {/* Tracking Timeline */}
                <div className="relative pl-6 border-l-2 border-amber-200 space-y-3">
                  {mockOrders[0].trackingSteps.map((step, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-[25px] w-4 h-4 rounded-full border-2 ${
                        step.done ? "bg-green-500 border-green-500" : "bg-white border-amber-300"
                      }`} />
                      <div className="ml-2">
                        <p className={`text-sm font-medium ${step.done ? "text-amber-900" : "text-gray-400"}`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-gray-500">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-amber-50">
                  <button
                    onClick={() => setShowReorder(mockOrders[0].id)}
                    className="flex-1 py-2.5 bg-amber-800 hover:bg-amber-900 text-white text-sm font-medium rounded-xl transition-all"
                  >
                    🔄 Reorder
                  </button>
                  <button className="flex-1 py-2.5 bg-amber-50 text-amber-700 text-sm font-medium rounded-xl hover:bg-amber-100 transition-all">
                    View Details
                  </button>
                </div>

                {/* Reorder Toast */}
                <AnimatePresence>
                  {showReorder === mockOrders[0].id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center gap-2"
                    >
                      <span>✅</span> Items added to cart! Ready to checkout.
                      <button
                        onClick={() => setShowReorder(null)}
                        className="ml-auto text-green-500 hover:text-green-700"
                      >
                        ✕
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Recommended */}
              <div className="bg-white rounded-2xl border border-amber-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-amber-900">Recommended for You</h3>
                  <span className="text-xs text-amber-500">Based on your taste</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {products.slice(0, 3).map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -2 }}
                      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl overflow-hidden border border-amber-100 cursor-pointer"
                    >
                      <div className="w-full h-28 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-medium text-amber-900 truncate">{product.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm font-bold text-amber-700">${product.price.toFixed(2)}</p>
                          <button
                            onClick={() => toggleFavorite(product.id)}
                            className={`text-sm ${favorites.includes(product.id) ? "text-red-500" : "text-gray-300 hover:text-red-400"}`}
                          >
                            {favorites.includes(product.id) ? "❤️" : "🤍"}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Seasonal Picks */}
              <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🎄</span>
                  <h3 className="font-serif font-bold">Holiday Collection</h3>
                </div>
                <p className="text-sm text-amber-200 mb-4">
                  Discover our curated selection of perfect gifts for the festive season.
                </p>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {products.slice(3, 6).map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-28">
                      <div className="w-28 h-28 rounded-xl overflow-hidden mb-2">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs font-medium truncate">{product.name}</p>
                      <p className="text-xs text-amber-300">${product.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl border border-amber-100 p-5"
            >
              <h3 className="font-serif font-bold text-amber-900 mb-4">Order History</h3>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border border-amber-100 rounded-xl p-4 hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-sm font-mono text-amber-700">{order.id}</span>
                        <p className="text-xs text-amber-500">{order.date}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full capitalize font-medium">
                        ✓ {order.status}
                      </span>
                    </div>
                    
                    {/* Order Items Preview */}
                    <div className="flex gap-2 mb-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="w-12 h-12 rounded-lg overflow-hidden border border-amber-100">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="flex items-center text-xs text-amber-500 ml-1">
                        {order.items.length} item{order.items.length > 1 ? "s" : ""}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-amber-50">
                      <span className="text-sm font-bold text-amber-900">${order.total.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setShowReorder(order.id);
                            showToast("Items added to cart!");
                          }}
                          className="text-xs px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                        >
                          Reorder
                        </button>
                        <button
                          onClick={() => setShowTracking(order.id)}
                          className="text-xs px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                        >
                          Track
                        </button>
                        <button
                          onClick={() => setShowCancelOrder(order.id)}
                          className="text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                    {/* Reorder Toast */}
                    <AnimatePresence>
                      {showReorder === order.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center gap-2"
                        >
                          <span>✅</span> Items added to cart!
                          <button
                            onClick={() => setShowReorder(null)}
                            className="ml-auto text-green-500 hover:text-green-700"
                          >
                            ✕
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "favorites" && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl border border-amber-100 p-5"
            >
              <h3 className="font-serif font-bold text-amber-900 mb-4">My Favorites</h3>
              {favoriteProducts.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl mb-2 block">💔</span>
                  <p className="text-amber-500">No favorites yet. Browse our collection!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {favoriteProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100 hover:shadow-sm transition-all"
                    >
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-amber-900 truncate">{product.name}</p>
                        <p className="text-xs text-amber-500">{product.origin}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-amber-200"}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-amber-500">{product.rating}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-amber-800">${product.price.toFixed(2)}</p>
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="text-xs text-red-400 hover:text-red-600 mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "addresses" && (
            <motion.div
              key="addresses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl border border-amber-100 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-amber-900">Address Book</h3>
                <button
                  onClick={() => setShowAddAddress(true)}
                  className="px-4 py-2 bg-amber-800 text-white text-sm rounded-xl hover:bg-amber-900 transition-colors"
                >
                  + Add Address
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📍</span>
                        <span className="font-medium text-amber-900">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Default</span>
                        )}
                      </div>
                      <button className="text-xs text-amber-600 hover:text-amber-800">Edit</button>
                    </div>
                    <p className="text-sm text-amber-700">{addr.street}</p>
                    <p className="text-sm text-amber-700">{addr.city}, {addr.state}</p>
                  </div>
                ))}
              </div>

              {/* Add Address Modal */}
              <AnimatePresence>
                {showAddAddress && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={() => setShowAddAddress(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h3 className="font-serif text-xl font-bold text-amber-900 mb-4">Add New Address</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-amber-700 mb-1">Label</label>
                          <input type="text" placeholder="e.g., Home, Work" className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-amber-700 mb-1">Street Address</label>
                          <input type="text" className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-amber-700 mb-1">City</label>
                            <input type="text" className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-amber-700 mb-1">State</label>
                            <input type="text" className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => setShowAddAddress(false)} className="flex-1 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100">Cancel</button>
                        <button onClick={() => { setShowAddAddress(false); showToast("Address added successfully!"); }} className="flex-1 py-2.5 bg-amber-800 text-white rounded-xl text-sm font-medium hover:bg-amber-900">Save Address</button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === "payments" && (
            <motion.div
              key="payments"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl border border-amber-100 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-amber-900">Payment Methods</h3>
                <button
                  onClick={() => setShowAddPayment(true)}
                  className="px-4 py-2 bg-amber-800 text-white text-sm rounded-xl hover:bg-amber-900 transition-colors"
                >
                  + Add Payment
                </button>
              </div>
              <div className="space-y-3">
                {paymentMethods.map((pm) => (
                  <div key={pm.id} className="flex items-center justify-between p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gradient-to-r from-amber-600 to-amber-800 rounded flex items-center justify-center text-white text-xs font-bold">
                        {pm.type.slice(0, 4)}
                      </div>
                      <div>
                        <p className="font-medium text-amber-900">{pm.type} •••• {pm.last4}</p>
                        <p className="text-xs text-amber-500">Expires {pm.expiry}</p>
                      </div>
                      {pm.isDefault && (
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Default</span>
                      )}
                    </div>
                    <button className="text-xs text-amber-600 hover:text-amber-800">Remove</button>
                  </div>
                ))}
              </div>

              {/* Add Payment Modal */}
              <AnimatePresence>
                {showAddPayment && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={() => setShowAddPayment(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h3 className="font-serif text-xl font-bold text-amber-900 mb-4">Add Payment Method</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-amber-700 mb-1">Card Number</label>
                          <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-amber-700 mb-1">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-amber-700 mb-1">CVV</label>
                            <input type="text" placeholder="123" className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => setShowAddPayment(false)} className="flex-1 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100">Cancel</button>
                        <button onClick={() => { setShowAddPayment(false); showToast("Payment method added!"); }} className="flex-1 py-2.5 bg-amber-800 text-white rounded-xl text-sm font-medium hover:bg-amber-900">Add Card</button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl border border-amber-100 p-5"
            >
              <h3 className="font-serif font-bold text-amber-900 mb-4">My Profile</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center text-3xl border-2 border-white shadow-md">
                    {user?.avatar}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-amber-900">{user?.name}</p>
                    <p className="text-sm text-amber-600">{user?.email}</p>
                    <p className="text-xs text-amber-400">Member since {user?.joinDate}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-amber-50/50 rounded-xl">
                    <p className="text-xs text-amber-500">Phone</p>
                    <p className="text-sm font-medium text-amber-800">{user?.phone || "Not provided"}</p>
                  </div>
                  <div className="p-3 bg-amber-50/50 rounded-xl">
                    <p className="text-xs text-amber-500">Role</p>
                    <p className="text-sm font-medium text-amber-800 capitalize">{user?.role}</p>
                  </div>
                  <div className="p-3 bg-amber-50/50 rounded-xl">
                    <p className="text-xs text-amber-500">Loyalty Tier</p>
                    <p className="text-sm font-medium text-amber-800">⭐ Gold Member</p>
                  </div>
                  <div className="p-3 bg-amber-50/50 rounded-xl">
                    <p className="text-xs text-amber-500">Reward Points</p>
                    <p className="text-sm font-medium text-amber-800">{loyaltyPoints} pts</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="flex-1 py-3 bg-amber-800 text-white rounded-xl text-sm font-medium hover:bg-amber-900 transition-colors"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="flex-1 py-3 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
          >
            <span>✓</span> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-xl font-bold text-amber-900 mb-2">Logout?</h3>
              <p className="text-sm text-amber-600 mb-4">Are you sure you want to logout?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100"
                >
                  Cancel
                </button>
                <button
                  onClick={logout}
                  className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowEditProfile(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-xl font-bold text-amber-900 mb-4">Edit Profile</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-amber-700 mb-1">Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-amber-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-amber-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    defaultValue={user?.phone}
                    className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowEditProfile(false);
                    showToast("Profile updated successfully!");
                  }}
                  className="flex-1 py-2.5 bg-amber-800 text-white rounded-xl text-sm font-medium hover:bg-amber-900"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showChangePassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowChangePassword(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-xl font-bold text-amber-900 mb-4">Change Password</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-amber-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-amber-700 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-amber-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="flex-1 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowChangePassword(false);
                    showToast("Password changed successfully!");
                  }}
                  className="flex-1 py-2.5 bg-amber-800 text-white rounded-xl text-sm font-medium hover:bg-amber-900"
                >
                  Update Password
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Tracking Modal */}
      <AnimatePresence>
        {showTracking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowTracking(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const order = mockOrders.find((o) => o.id === showTracking);
                if (!order) return null;
                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-xl font-bold text-amber-900">Order Tracking</h3>
                      <button
                        onClick={() => setShowTracking(null)}
                        className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 hover:bg-amber-100"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-amber-600">Order #{order.id}</p>
                      <p className="text-xs text-amber-500">{order.date}</p>
                    </div>
                    <div className="relative pl-6 border-l-2 border-amber-200 space-y-4">
                      {order.trackingSteps.map((step, i) => (
                        <div key={i} className="relative">
                          <div className={`absolute -left-[25px] w-4 h-4 rounded-full border-2 ${
                            step.done ? "bg-green-500 border-green-500" : "bg-white border-amber-300"
                          }`} />
                          <div className="ml-2">
                            <p className={`text-sm font-medium ${step.done ? "text-amber-900" : "text-gray-400"}`}>
                              {step.label}
                            </p>
                            <p className="text-xs text-gray-500">{step.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowTracking(null)}
                      className="w-full mt-4 py-2.5 bg-amber-800 text-white rounded-xl text-sm font-medium hover:bg-amber-900"
                    >
                      Close
                    </button>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancel Order Modal */}
      <AnimatePresence>
        {showCancelOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCancelOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-xl font-bold text-amber-900 mb-2">Cancel Order</h3>
              <p className="text-sm text-amber-600 mb-4">
                Are you sure you want to cancel order #{showCancelOrder}? This action cannot be undone.
              </p>
              <div className="mb-4">
                <label className="block text-xs font-medium text-amber-700 mb-1">Reason for cancellation (optional)</label>
                <select className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white">
                  <option>Changed my mind</option>
                  <option>Found better price elsewhere</option>
                  <option>Ordered by mistake</option>
                  <option>Delivery time too long</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCancelOrder(null)}
                  className="flex-1 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100"
                >
                  Keep Order
                </button>
                <button
                  onClick={() => {
                    setShowCancelOrder(null);
                    showToast("Order cancelled successfully. Refund will be processed in 5-7 business days.");
                  }}
                  className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600"
                >
                  Cancel Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
