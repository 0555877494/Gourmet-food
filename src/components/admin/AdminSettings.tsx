import { useState } from "react";

export default function AdminSettings() {
  const [storeName, setStoreName] = useState("Saveur & Co.");
  const [storeEmail, setStoreEmail] = useState("hello@saveurco.com");
  const [storePhone, setStorePhone] = useState("1-800-SAVEUR");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(75);
  const [taxRate, setTaxRate] = useState(8);
  const [currency, setCurrency] = useState("USD");
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    newCustomers: false,
    weeklyReport: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Store Information */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🏪</span> Store Information
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
            <input
              type="text"
              value={storePhone}
              onChange={(e) => setStorePhone(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 max-w-xs"
            />
          </div>
        </div>
      </div>

      {/* Commerce Settings */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>💳</span> Commerce Settings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Free Shipping Threshold ($)</label>
            <input
              type="number"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tax Rate (%)</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (C$)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🔔</span> Notifications
        </h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => {
            const labels: Record<string, string> = {
              newOrders: "New order alerts",
              lowStock: "Low stock warnings",
              newCustomers: "New customer signups",
              weeklyReport: "Weekly sales report",
            };
            const descriptions: Record<string, string> = {
              newOrders: "Get notified when a new order is placed",
              lowStock: "Alert when product inventory is low",
              newCustomers: "Receive alerts for new customer registrations",
              weeklyReport: "Get a summary of weekly sales performance",
            };
            return (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{labels[key]}</p>
                  <p className="text-xs text-gray-500">{descriptions[key]}</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                    value ? "bg-amber-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                      value ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-200 p-6">
        <h3 className="text-lg font-serif font-bold text-red-700 mb-4 flex items-center gap-2">
          <span>⚠️</span> Danger Zone
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-gray-900">Reset Store Data</p>
            <p className="text-xs text-gray-500">This will reset all products, orders, and settings to defaults</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
            Reset Data
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="text-sm text-green-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Settings saved successfully!
          </span>
        )}
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white text-sm font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
