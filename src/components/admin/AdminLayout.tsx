import { useState } from "react";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  onViewStore?: () => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "products", label: "Products", icon: "📦" },
  { id: "orders", label: "Orders", icon: "🛍️" },
  { id: "customers", label: "Customers", icon: "👥" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayout({ children, currentPage, onPageChange, onLogout, onViewStore }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-amber-900 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } flex flex-col`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-amber-800">
          <div className="flex items-center gap-3">
            <img 
              src="https://image.qwenlm.ai/generated-images/0ac7ab97-8192-4258-b440-253435684dd5/_result.png" 
              alt="Saveur & Co." 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="font-serif text-lg font-bold text-white">Saveur & Co.</h1>
              <p className="text-xs text-amber-300">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onPageChange(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentPage === item.id
                  ? "bg-amber-700 text-white shadow-md"
                  : "text-amber-200 hover:bg-amber-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-amber-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-amber-700 rounded-full flex items-center justify-center text-sm font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-amber-300 truncate">admin@saveurco.com</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-amber-300 hover:bg-amber-800 hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 capitalize">
              {currentPage}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={onViewStore}
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors"
            >
              <img 
                src="https://image.qwenlm.ai/generated-images/0ac7ab97-8192-4258-b440-253435684dd5/_result.png" 
                alt="" 
                className="h-4 w-auto"
              />
              View Store
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
