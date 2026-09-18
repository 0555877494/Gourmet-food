import { motion } from "framer-motion";
import { useStore } from "../../context/StoreContext";

export default function AdminDashboard() {
  const { products, orders, customers } = useStore();

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const processingOrders = orders.filter((o) => o.status === "processing").length;
  const completedOrders = orders.filter((o) => o.status === "delivered").length;

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      change: "+12.5%",
      positive: true,
      icon: "💰",
      bg: "bg-green-50 border-green-100",
    },
    {
      label: "Total Orders",
      value: orders.length.toString(),
      change: "+8.2%",
      positive: true,
      icon: "🛍️",
      bg: "bg-blue-50 border-blue-100",
    },
    {
      label: "Products",
      value: products.length.toString(),
      change: "+2",
      positive: true,
      icon: "📦",
      bg: "bg-amber-50 border-amber-100",
    },
    {
      label: "Customers",
      value: customers.length.toString(),
      change: "+5.1%",
      positive: true,
      icon: "👥",
      bg: "bg-purple-50 border-purple-100",
    },
  ];

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const topProducts = products.slice(0, 4).map((p, i) => ({
    ...p,
    sales: [42, 38, 35, 28][i],
    revenue: [42, 38, 35, 28][i] * p.price,
  }));

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-700 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-serif font-bold mb-1">Welcome back, Admin 👋</h3>
        <p className="text-amber-200 text-sm">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} border rounded-2xl p-5 transition-all hover:shadow-md`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.positive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts & Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Status Overview */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 p-5">
          <h4 className="font-serif font-bold text-gray-900 mb-4">Order Status</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{pendingOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-sm text-gray-600">Processing</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{processingOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-orange-400" />
                <span className="text-sm text-gray-600">Shipped</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {orders.filter((o) => o.status === "shipped").length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-sm text-gray-600">Delivered</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{completedOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <span className="text-sm text-gray-600">Cancelled</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {orders.filter((o) => o.status === "cancelled").length}
              </span>
            </div>
          </div>

          {/* Visual bar */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <div className="flex h-3 rounded-full overflow-hidden">
              <div className="bg-yellow-400" style={{ width: `${(pendingOrders / orders.length) * 100}%` }} />
              <div className="bg-blue-400" style={{ width: `${(processingOrders / orders.length) * 100}%` }} />
              <div className="bg-orange-400" style={{ width: `${(orders.filter((o) => o.status === "shipped").length / orders.length) * 100}%` }} />
              <div className="bg-green-400" style={{ width: `${(completedOrders / orders.length) * 100}%` }} />
              <div className="bg-red-400" style={{ width: `${(orders.filter((o) => o.status === "cancelled").length / orders.length) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-5">
          <h4 className="font-serif font-bold text-gray-900 mb-4">Recent Orders</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <th className="pb-3 pr-4">Order ID</th>
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Total</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="text-sm">
                    <td className="py-3 pr-4 font-mono text-xs text-gray-700">{order.id}</td>
                    <td className="py-3 pr-4 text-gray-800 font-medium">{order.customerName}</td>
                    <td className="py-3 pr-4 text-gray-700">${order.total.toFixed(2)}</td>
                    <td className="py-3">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h4 className="font-serif font-bold text-gray-900 mb-4">Top Selling Products</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-xs text-gray-500">{product.sales} sold · ${product.revenue.toFixed(0)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-serif font-bold text-gray-900">Revenue Overview</h4>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Week</button>
            <button className="px-3 py-1 text-xs bg-amber-800 text-white rounded-lg">Month</button>
            <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Year</button>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 h-48">
          {[
            { label: "Week 1", amount: 2450 },
            { label: "Week 2", amount: 3120 },
            { label: "Week 3", amount: 2890 },
            { label: "Week 4", amount: 3680 },
          ].map((week, i) => (
            <div key={week.label} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">${week.amount}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(week.amount / 4000) * 100}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg"
              />
              <span className="text-xs text-gray-400">{week.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Alerts */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h4 className="font-serif font-bold text-gray-900 mb-4">Inventory Alerts</h4>
        <div className="space-y-3">
          {[
            { product: "Persian Saffron Threads", stock: 12, status: "low", image: products[4]?.image || "" },
            { product: "Mānuka Honey UMF 20+", stock: 8, status: "critical", image: products[2]?.image || "" },
            { product: "25-Year Aged Balsamic Vinegar", stock: 15, status: "low", image: products[1]?.image || "" },
          ].map((item) => (
            <div key={item.product} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.product} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.product}</p>
                <p className="text-xs text-gray-500">{item.stock} units remaining</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.status === "critical" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {item.status === "critical" ? "⚠️ Critical" : "📉 Low Stock"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-orange-100 text-orange-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize ${styles[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}
