import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";
import { Product } from "../../data/products";

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "favorites" | "profile">("overview");
  const [favorites, setFavorites] = useState<number[]>([1, 3, 5]);

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
      status: "delivered",
      total: 167.98,
      items: ["Truffle-Infused Olive Oil", "Mānuka Honey UMF 20+"],
    },
    {
      id: "SV-E3P7R6",
      date: "Jan 10, 2026",
      status: "delivered",
      total: 167.97,
      items: ["Truffle-Infused Olive Oil", "25-Year Aged Balsamic Vinegar", "Persian Saffron Threads"],
    },
    {
      id: "SV-F5R9T8",
      date: "Jan 5, 2026",
      status: "delivered",
      total: 42.99,
      items: ["Truffle-Infused Olive Oil"],
    },
  ];

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
              <span className="text-lg">{user?.avatar}</span>
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
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-800 to-amber-700 rounded-2xl p-6 text-white mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold mb-1">
                Welcome back, {user?.name?.split(" ")[0]}! 👋
              </h2>
              <p className="text-amber-200 text-sm">
                Your curated collection of fine foods awaits.
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs text-amber-300">Member since</p>
              <p className="text-sm font-medium">{user?.joinDate}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Orders", value: mockOrders.length.toString(), icon: "📦" },
            { label: "Favorites", value: favorites.length.toString(), icon: "❤️" },
            { label: "Total Spent", value: `$${mockOrders.reduce((s, o) => s + o.total, 0).toFixed(0)}`, icon: "💰" },
            { label: "Reward Points", value: "342", icon: "⭐" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl border border-amber-100 p-4 text-center"
            >
              <span className="text-xl mb-1 block">{stat.icon}</span>
              <p className="text-lg font-bold text-amber-900">{stat.value}</p>
              <p className="text-xs text-amber-500">{stat.label}</p>
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
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <h3 className="font-serif font-bold text-amber-900 mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {mockOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-amber-50/50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-amber-900">{order.id}</p>
                      <p className="text-xs text-amber-500">{order.date} · {order.items.length} items</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-amber-800">${order.total.toFixed(2)}</p>
                      <span className="text-xs text-green-600 capitalize">{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended */}
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <h3 className="font-serif font-bold text-amber-900 mb-4">Recommended for You</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {products.slice(0, 3).map((product) => (
                  <div key={product.id} className="bg-amber-50/50 rounded-xl p-3 text-center">
                    <span className="text-3xl mb-2 block">{product.image}</span>
                    <p className="text-xs font-medium text-amber-900 truncate">{product.name}</p>
                    <p className="text-xs text-amber-600 mt-1">${product.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl border border-amber-100 p-5">
            <h3 className="font-serif font-bold text-amber-900 mb-4">Order History</h3>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="border border-amber-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-amber-700">{order.id}</span>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full capitalize">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-amber-500 mb-2">{order.date}</p>
                  <div className="space-y-1 mb-3">
                    {order.items.map((item, i) => (
                      <p key={i} className="text-sm text-amber-800">• {item}</p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-amber-50">
                    <span className="text-xs text-amber-500">Total</span>
                    <span className="text-sm font-bold text-amber-900">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="bg-white rounded-2xl border border-amber-100 p-5">
            <h3 className="font-serif font-bold text-amber-900 mb-4">My Favorites</h3>
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-4xl mb-2 block">💔</span>
                <p className="text-amber-500">No favorites yet. Browse our collection!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {favoriteProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                      <span className="text-2xl">{product.image}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-amber-900 truncate">{product.name}</p>
                      <p className="text-xs text-amber-500">{product.origin}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-amber-800">${product.price.toFixed(2)}</p>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="text-xs text-red-400 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl border border-amber-100 p-5">
            <h3 className="font-serif font-bold text-amber-900 mb-4">My Profile</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-amber-50/50 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center text-3xl">
                  {user?.avatar}
                </div>
                <div>
                  <p className="text-lg font-semibold text-amber-900">{user?.name}</p>
                  <p className="text-sm text-amber-500">{user?.email}</p>
                  <p className="text-xs text-amber-400">Customer since {user?.joinDate}</p>
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
              </div>
              <button className="w-full py-3 bg-amber-100 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-200 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
