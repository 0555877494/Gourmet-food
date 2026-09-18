import { useState } from "react";
import { useCart } from "../context/CartContext";

interface CheckoutProps {
  onClose: () => void;
}

export default function Checkout({ onClose }: CheckoutProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const shipping = totalPrice > 75 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      clearCart();
    }, 2500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (step === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 sm:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl font-bold text-amber-900 mb-3">Order Confirmed!</h2>
          <p className="text-amber-600 mb-2">
            Thank you for your order. Your specialty foods are being prepared with care.
          </p>
          <p className="text-sm text-amber-500 mb-6">
            Order #SV{Math.random().toString(36).substring(2, 8).toUpperCase()} · Confirmation sent to {formData.email || "your email"}
          </p>
          <div className="bg-amber-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-700">
              Estimated delivery: <span className="font-semibold">3-5 business days</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-amber-800 hover:bg-amber-900 text-white font-medium rounded-full transition-all shadow-md hover:shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (step === "processing") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-800 rounded-full animate-spin mx-auto mb-6" />
          <h2 className="font-serif text-xl font-bold text-amber-900 mb-2">Processing Your Order</h2>
          <p className="text-sm text-amber-500">Please wait while we confirm your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-amber-100">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-900">Checkout</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-5 gap-0">
            {/* Form Section */}
            <div className="md:col-span-3 p-5 sm:p-8 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-base font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs font-bold text-amber-700">1</span>
                  Contact Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/30 text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/30 text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-base font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs font-bold text-amber-700">2</span>
                  Shipping Address
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Street Address"
                    required
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/30 text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      required
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/30 text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      required
                      value={formData.zip}
                      onChange={(e) => handleChange("zip", e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/30 text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="text-base font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs font-bold text-amber-700">3</span>
                  Payment Details
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Card Number"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => handleChange("cardNumber", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/30 text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      required
                      value={formData.expiry}
                      onChange={(e) => handleChange("expiry", e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/30 text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      required
                      value={formData.cvv}
                      onChange={(e) => handleChange("cvv", e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/30 text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-2 bg-amber-50/50 p-5 sm:p-6 border-t md:border-t-0 md:border-l border-amber-100">
              <h3 className="text-base font-semibold text-amber-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-amber-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-amber-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-amber-800">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-amber-200 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">Subtotal</span>
                  <span className="text-amber-800">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">Shipping</span>
                  <span className="text-amber-800">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">Tax</span>
                  <span className="text-amber-800">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-amber-200">
                  <span className="font-semibold text-amber-900">Total</span>
                  <span className="text-lg font-bold text-amber-900">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-5 py-3.5 bg-amber-800 hover:bg-amber-900 text-white font-medium rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Place Order — ${grandTotal.toFixed(2)}
              </button>
              <p className="text-xs text-amber-400 text-center mt-3">
                🔒 Secure checkout · This is a simulated purchase
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
