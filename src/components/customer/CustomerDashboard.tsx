import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";
import { Product } from "../../data/products";

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "favorites" | "profile">("overview");
  const [favorites, setFavorites] = useState<number[]>([1, 3, 5]);
  const [showReorder, setShowReorder] = useState<string | null>(null);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
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
            <span className="text-2xl">🏪</span>
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
              onClick={logout}
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
                          onClick={() => setShowReorder(order.id)}
                          className="text-xs px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                        >
                          Reorder
                        </button>
                        <button className="text-xs px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium">
                          Track
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
                  <button className="flex-1 py-3 bg-amber-800 text-white rounded-xl text-sm font-medium hover:bg-amber-900 transition-colors">
                    Edit Profile
                  </button>
                  <button className="flex-1 py-3 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
