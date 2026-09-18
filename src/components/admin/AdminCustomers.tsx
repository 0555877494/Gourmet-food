import { useState } from "react";
import { useStore } from "../../context/StoreContext";

export default function AdminCustomers() {
  const { customers } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "orders" | "spent">("spent");

  const filteredCustomers = customers
    .filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "orders") return b.orders - a.orders;
      return b.totalSpent - a.totalSpent;
    });

  const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = totalSpent / customers.reduce((sum, c) => sum + c.orders, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total Revenue from Customers</p>
          <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Avg. Order Value</p>
          <p className="text-2xl font-bold text-gray-900">${avgOrderValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "name" | "orders" | "spent")}
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-300"
        >
          <option value="spent">Sort by Spending</option>
          <option value="orders">Sort by Orders</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full flex items-center justify-center text-2xl">
                {customer.avatar}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">{customer.name}</h4>
                <p className="text-xs text-gray-500 truncate">{customer.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-lg font-bold text-gray-900">{customer.orders}</p>
                <p className="text-xs text-gray-500">Orders</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-lg font-bold text-amber-700">${customer.totalSpent.toFixed(0)}</p>
                <p className="text-xs text-gray-500">Spent</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs font-medium text-gray-700 mt-1">{customer.joinDate.split("-").slice(1).join("/")}</p>
                <p className="text-xs text-gray-500">Joined</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
