import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";

interface DeliveryJob {
  id: string;
  orderId: string;
  customerName: string;
  customerAddress: string;
  items: string[];
  distance: string;
  earnings: number;
  status: "available" | "accepted" | "picked_up" | "delivered";
  scheduledTime: string;
  priority: "normal" | "express";
}

const mockDeliveryJobs: DeliveryJob[] = [
  {
    id: "DJ-001",
    orderId: "SV-A8K3M2",
    customerName: "Eleanor Whitfield",
    customerAddress: "245 Park Avenue, New York, NY 10167",
    items: ["Truffle-Infused Olive Oil", "Mānuka Honey UMF 20+"],
    distance: "3.2 mi",
    earnings: 12.50,
    status: "available",
    scheduledTime: "Today, 2:00 PM",
    priority: "express",
  },
  {
    id: "DJ-002",
    orderId: "SV-B9L4N3",
    customerName: "James Harrington",
    customerAddress: "88 Colin P Kelly Jr St, San Francisco, CA 94107",
    items: ["25-Year Aged Balsamic Vinegar ×2"],
    distance: "5.8 mi",
    earnings: 18.75,
    status: "available",
    scheduledTime: "Today, 3:30 PM",
    priority: "normal",
  },
  {
    id: "DJ-003",
    orderId: "SV-C1M5P4",
    customerName: "Sophia Chen",
    customerAddress: "1000 E Pine St, Seattle, WA 98122",
    items: ["Single-Origin Dark Chocolate ×3", "Persian Saffron Threads"],
    distance: "2.1 mi",
    earnings: 9.25,
    status: "available",
    scheduledTime: "Today, 4:00 PM",
    priority: "normal",
  },
  {
    id: "DJ-004",
    orderId: "SV-E3P7R6",
    customerName: "Isabella Romano",
    customerAddress: "700 N Michigan Ave, Chicago, IL 60611",
    items: ["Truffle-Infused Olive Oil", "25-Year Aged Balsamic Vinegar", "Persian Saffron Threads"],
    distance: "4.5 mi",
    earnings: 22.00,
    status: "accepted",
    scheduledTime: "Today, 1:00 PM",
    priority: "express",
  },
  {
    id: "DJ-005",
    orderId: "SV-F5R9T8",
    customerName: "Charlotte Dubois",
    customerAddress: "12 Rue de Rivoli, Paris, France",
    items: ["Wild Lavender Honey Conserve ×2"],
    distance: "1.8 mi",
    earnings: 8.50,
    status: "picked_up",
    scheduledTime: "Today, 12:30 PM",
    priority: "normal",
  },
];

export default function DeliveryDashboard() {
  const { user, logout } = useAuth();
  const { orders } = useStore();
  const [activeTab, setActiveTab] = useState<"available" | "active" | "completed" | "earnings">("available");
  const [jobs, setJobs] = useState<DeliveryJob[]>(mockDeliveryJobs);
  const [selectedJob, setSelectedJob] = useState<DeliveryJob | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  const availableJobs = jobs.filter((j) => j.status === "available");
  const activeJobs = jobs.filter((j) => j.status === "accepted" || j.status === "picked_up");
  const completedJobs = jobs.filter((j) => j.status === "delivered");
  const totalEarnings = completedJobs.reduce((sum, j) => sum + j.earnings, 0) + 156.75; // mock historical
  const todayEarnings = activeJobs.reduce((sum, j) => sum + j.earnings, 0) + 34.50;

  const acceptJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: "accepted" as const } : j))
    );
    setSelectedJob(null);
  };

  const updateJobStatus = (jobId: string, status: DeliveryJob["status"]) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status } : j))
    );
  };

  const displayJobs =
    activeTab === "available" ? availableJobs :
    activeTab === "active" ? activeJobs :
    activeTab === "completed" ? completedJobs : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white text-lg">
              🚴
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">Delivery Dashboard</h1>
              <p className="text-xs text-gray-500">Saveur & Co.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Online Toggle */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isOnline
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
              {isOnline ? "Online" : "Offline"}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-lg">{user?.avatar}</span>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Map Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-4 sm:p-6 mb-6 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                <span>🗺️</span> Live Delivery Map
              </h3>
              <p className="text-xs text-emerald-600">{activeJobs.length} active deliveries in your area</p>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${isOnline ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {isOnline ? "🟢 Receiving jobs" : "⚪ Offline"}
            </div>
          </div>
          {/* Simulated Map */}
          <div className="relative h-32 sm:h-40 bg-gradient-to-br from-emerald-100/50 to-teal-100/50 rounded-xl border border-emerald-200/50 overflow-hidden">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }} />
            {/* Route lines */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.path
                d="M 50 80 Q 100 40 180 60 T 300 50"
                stroke="rgb(16,185,129)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.path
                d="M 80 120 Q 150 80 220 100 T 350 70"
                stroke="rgb(20,184,166)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.8 }}
              />
            </svg>
            {/* Delivery pins */}
            <motion.div
              className="absolute top-[30%] left-[20%] w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📍
            </motion.div>
            <motion.div
              className="absolute top-[50%] left-[55%] w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              🚴
            </motion.div>
            <motion.div
              className="absolute top-[25%] left-[75%] w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              📦
            </motion.div>
            {/* You are here */}
            <motion.div
              className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-emerald-800">Your location</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">💰</span>
              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">+12%</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">${todayEarnings.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Today's Earnings</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">📦</span>
              <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">{activeJobs.length} active</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{availableJobs.length}</p>
            <p className="text-xs text-gray-500">Available Jobs</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">✅</span>
              <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">This week</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{completedJobs.length + 12}</p>
            <p className="text-xs text-gray-500">Deliveries Done</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">⭐</span>
              <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">4.9</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">${totalEarnings.toFixed(0)}</p>
            <p className="text-xs text-gray-500">Total Earnings</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {[
            { id: "available" as const, label: "Available", count: availableJobs.length, icon: "📋" },
            { id: "active" as const, label: "Active", count: activeJobs.length, icon: "🚀" },
            { id: "completed" as const, label: "Completed", count: completedJobs.length + 12, icon: "✅" },
            { id: "earnings" as const, label: "Earnings", count: null, icon: "💰" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-emerald-800 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.count !== null && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? "bg-white/20" : "bg-gray-100"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "earnings" ? (
          <EarningsView totalEarnings={totalEarnings} todayEarnings={todayEarnings} />
        ) : (
          <div className="space-y-3">
            {displayJobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl border border-gray-200 p-12 text-center"
              >
                <span className="text-5xl mb-3 block">
                  {activeTab === "available" ? "📭" : activeTab === "active" ? "🎉" : "📋"}
                </span>
                <p className="text-gray-500">
                  {activeTab === "available"
                    ? isOnline
                      ? "No available deliveries right now. Check back soon!"
                      : "Go online to see available deliveries"
                    : activeTab === "active"
                    ? "No active deliveries. Accept a job to get started!"
                    : "No completed deliveries yet"}
                </p>
              </motion.div>
            ) : (
              displayJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-400">{job.orderId}</span>
                        {job.priority === "express" && (
                          <span className="px-1.5 py-0.5 bg-red-50 text-red-600 text-xs font-medium rounded-full">
                            ⚡ Express
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900">{job.customerName}</h4>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">📍 {job.customerAddress}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400">🕐 {job.scheduledTime}</span>
                        <span className="text-xs text-gray-400">📏 {job.distance}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-bold text-emerald-600">${job.earnings.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">earning</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedJob(null)} />
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-5 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono opacity-80">{selectedJob.orderId}</span>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <h3 className="text-lg font-bold">{selectedJob.customerName}</h3>
                <p className="text-sm opacity-80">{selectedJob.customerAddress}</p>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Items</p>
                  <div className="space-y-1.5">
                    {selectedJob.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500">Distance</p>
                    <p className="text-sm font-bold text-gray-900">{selectedJob.distance}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-bold text-gray-900">{selectedJob.scheduledTime.split(", ")[1]}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-emerald-600">Earning</p>
                    <p className="text-sm font-bold text-emerald-700">${selectedJob.earnings.toFixed(2)}</p>
                  </div>
                </div>

                {selectedJob.status === "available" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => acceptJob(selectedJob.id)}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl shadow-lg"
                  >
                    Accept Delivery — ${selectedJob.earnings.toFixed(2)}
                  </motion.button>
                )}

                {selectedJob.status === "accepted" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      updateJobStatus(selectedJob.id, "picked_up");
                      setSelectedJob(null);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl shadow-lg"
                  >
                    Mark as Picked Up
                  </motion.button>
                )}

                {selectedJob.status === "picked_up" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      updateJobStatus(selectedJob.id, "delivered");
                      setSelectedJob(null);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl shadow-lg"
                  >
                    Mark as Delivered ✓
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EarningsView({ totalEarnings, todayEarnings }: { totalEarnings: number; todayEarnings: number }) {
  const weekData = [
    { day: "Mon", amount: 45.50 },
    { day: "Tue", amount: 62.75 },
    { day: "Wed", amount: 38.25 },
    { day: "Thu", amount: 71.00 },
    { day: "Fri", amount: 55.50 },
    { day: "Sat", amount: todayEarnings },
    { day: "Sun", amount: 0 },
  ];
  const maxAmount = Math.max(...weekData.map((d) => d.amount));

  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-80 mb-1">Total Earnings</p>
        <p className="text-3xl font-bold">${totalEarnings.toFixed(2)}</p>
        <div className="flex items-center gap-4 mt-4">
          <div>
            <p className="text-xs opacity-70">This Week</p>
            <p className="text-lg font-semibold">${weekData.reduce((s, d) => s + d.amount, 0).toFixed(2)}</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <p className="text-xs opacity-70">Today</p>
            <p className="text-lg font-semibold">${todayEarnings.toFixed(2)}</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <p className="text-xs opacity-70">Deliveries</p>
            <p className="text-lg font-semibold">47</p>
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h4 className="font-semibold text-gray-900 mb-4">This Week</h4>
        <div className="flex items-end justify-between gap-2 h-40">
          {weekData.map((d, i) => (
            <motion.div
              key={d.day}
              initial={{ height: 0 }}
              animate={{ height: `${(d.amount / maxAmount) * 100}%` }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <span className="text-xs text-gray-500 font-medium">${d.amount.toFixed(0)}</span>
              <div
                className={`w-full rounded-t-lg ${
                  d.day === "Sat" ? "bg-gradient-to-t from-emerald-500 to-teal-400" : "bg-gradient-to-t from-emerald-200 to-emerald-100"
                }`}
                style={{ minHeight: d.amount > 0 ? "8px" : "2px" }}
              />
              <span className="text-xs text-gray-400">{d.day}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Payouts */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h4 className="font-semibold text-gray-900 mb-4">Recent Payouts</h4>
        <div className="space-y-3">
          {[
            { date: "Jan 20, 2026", amount: 156.75, status: "completed" },
            { date: "Jan 13, 2026", amount: 203.50, status: "completed" },
            { date: "Jan 6, 2026", amount: 178.25, status: "completed" },
          ].map((payout) => (
            <div key={payout.date} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{payout.date}</p>
                <p className="text-xs text-gray-500">Weekly payout</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">${payout.amount.toFixed(2)}</p>
                <span className="text-xs text-green-600">✓ {payout.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
