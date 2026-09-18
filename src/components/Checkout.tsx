import { useState } from "react";
import { useCart } from "../context/CartContext";

interface CheckoutProps {
  onClose: () => void;
}

export default function Checkout({ onClose }: CheckoutProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "momo">("card");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    momoPhone: "",
    momoNetwork: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVEUR10" || couponCode.toUpperCase() === "WELCOME15") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("Invalid coupon code");
    }
  };

  const discount = couponApplied
    ? couponCode.toUpperCase() === "SAVEUR10"
      ? totalPrice * 0.1
      : totalPrice * 0.15
    : 0;

  const shipping = totalPrice > 75 ? 0 : 9.99;
  const tax = (totalPrice - discount) * 0.08;
  const grandTotal = totalPrice - discount + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate MoMo fields if MoMo payment is selected
    if (paymentMethod === "momo") {
      if (!formData.momoNetwork) {
        alert("Please select a Mobile Money network");
        return;
      }
      if (!formData.momoPhone || formData.momoPhone.length < 9) {
        alert("Please enter a valid Mobile Money phone number");
        return;
      }
    }
    
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
          {paymentMethod === "momo" ? (
            <>
              <p className="text-amber-600 mb-2">
                Payment prompt sent to your {formData.momoNetwork} number. Please check your phone to authorize the payment.
              </p>
              <p className="text-sm text-amber-500 mb-6">
                Once authorized, your specialty foods will be prepared with care.
              </p>
            </>
          ) : (
            <p className="text-amber-600 mb-2">
              Thank you for your order. Your specialty foods are being prepared with care.
            </p>
          )}
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
          {paymentMethod === "momo" ? (
            <>
              <div className="text-6xl mb-4 animate-bounce">📱</div>
              <h2 className="font-serif text-xl font-bold text-amber-900 mb-2">
                Sending Payment Prompt
              </h2>
              <p className="text-sm text-amber-600 mb-3">
                A payment request has been sent to your <span className="font-semibold">{formData.momoNetwork}</span> number
              </p>
              <div className="bg-amber-50 rounded-xl p-3 mb-4">
                <p className="text-xs text-amber-700">
                  📞 <span className="font-mono">+233 {formData.momoPhone}</span>
                </p>
              </div>
              <p className="text-xs text-amber-500">
                Please check your phone and enter your PIN to authorize...
              </p>
              <div className="w-full bg-amber-100 rounded-full h-2 mt-4 overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-800 rounded-full animate-spin mx-auto mb-6" />
              <h2 className="font-serif text-xl font-bold text-amber-900 mb-2">Processing Your Order</h2>
              <p className="text-sm text-amber-500">Please wait while we confirm your payment...</p>
            </>
          )}
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

              {/* Payment Method Selection */}
              <div>
                <h3 className="text-base font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs font-bold text-amber-700">3</span>
                  Payment Method
                </h3>
                
                {/* Payment Method Tabs */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Ghana MoMo Badge */}
                  <div className="col-span-2 bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200 rounded-xl p-3 mb-2 flex items-center gap-3">
                    <span className="text-2xl">🇬🇭</span>
                    <div>
                      <p className="text-sm font-semibold text-green-800">Ghana Customers</p>
                      <p className="text-xs text-green-600">Pay conveniently with Mobile Money (MoMo)</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-amber-600 bg-amber-50"
                        : "border-amber-200 bg-white hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">💳</div>
                      <div className="text-left">
                        <div className="font-semibold text-amber-900">Credit/Debit Card</div>
                        <div className="text-xs text-amber-600">Visa, Mastercard, AMEX</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("momo")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "momo"
                        ? "border-amber-600 bg-amber-50"
                        : "border-amber-200 bg-white hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📱</div>
                      <div className="text-left">
                        <div className="font-semibold text-amber-900">Mobile Money</div>
                        <div className="text-xs text-amber-600">MTN, Vodafone, AirtelTigo</div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Card Payment Fields */}
                {paymentMethod === "card" && (
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
                )}

                {/* Mobile Money Fields */}
                {paymentMethod === "momo" && (
                  <div className="space-y-3">
                    {/* Network Selection */}
                    <div>
                      <label className="block text-xs font-medium text-amber-700 mb-2">Select Network</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => handleChange("momoNetwork", "MTN")}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.momoNetwork === "MTN"
                              ? "border-yellow-500 bg-yellow-50"
                              : "border-amber-200 bg-white hover:border-yellow-300"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-xl mb-1">🟡</div>
                            <div className="text-xs font-semibold text-amber-900">MTN</div>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleChange("momoNetwork", "Vodafone")}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.momoNetwork === "Vodafone"
                              ? "border-red-500 bg-red-50"
                              : "border-amber-200 bg-white hover:border-red-300"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-xl mb-1">🔴</div>
                            <div className="text-xs font-semibold text-amber-900">Vodafone</div>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleChange("momoNetwork", "AirtelTigo")}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.momoNetwork === "AirtelTigo"
                              ? "border-blue-500 bg-blue-50"
                              : "border-amber-200 bg-white hover:border-blue-300"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-xl mb-1">🔵</div>
                            <div className="text-xs font-semibold text-amber-900">AirtelTigo</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-medium text-amber-700 mb-1.5">Mobile Money Number</label>
                      <div className="flex gap-2">
                        <div className="px-3 py-2.5 rounded-l-xl border border-r-0 border-amber-200 bg-amber-100 text-sm text-amber-700 font-medium">
                          +233
                        </div>
                        <input
                          type="tel"
                          placeholder="24 XXX XXXX"
                          required
                          value={formData.momoPhone}
                          onChange={(e) => handleChange("momoPhone", e.target.value)}
                          className="flex-1 px-4 py-2.5 rounded-r-xl border border-amber-200 bg-amber-50/30 text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                        />
                      </div>
                      <p className="text-xs text-amber-500 mt-1">
                        💡 You'll receive a prompt on your phone to authorize the payment
                      </p>
                    </div>
                  </div>
                )}
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
              {/* Coupon Code */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-amber-700 mb-1.5">Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError("");
                    }}
                    placeholder="Enter code"
                    disabled={couponApplied}
                    className="flex-1 px-3 py-2 rounded-lg border border-amber-200 bg-white text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:bg-amber-50"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    disabled={couponApplied || !couponCode}
                    className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {couponApplied ? "✓ Applied" : "Apply"}
                  </button>
                </div>
                {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                {couponApplied && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ {couponCode.toUpperCase() === "SAVEUR10" ? "10%" : "15%"} discount applied!
                    <button
                      type="button"
                      onClick={() => {
                        setCouponApplied(false);
                        setCouponCode("");
                      }}
                      className="ml-2 underline"
                    >
                      Remove
                    </button>
                  </p>
                )}
                <p className="text-xs text-amber-400 mt-1">Try: SAVEUR10 or WELCOME15</p>
              </div>

              <div className="border-t border-amber-200 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">Subtotal</span>
                  <span className="text-amber-800">${totalPrice.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount</span>
                    <span className="text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                )}
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
                {paymentMethod === "momo" 
                  ? `Pay with ${formData.momoNetwork || "Mobile Money"} — GHS ${(grandTotal * 15).toFixed(2)}`
                  : `Place Order — $${grandTotal.toFixed(2)}`
                }
              </button>
              <p className="text-xs text-amber-400 text-center mt-3">
                {paymentMethod === "momo" 
                  ? "🔒 Secure MoMo payment · Powered by Ghana Interbank Payment and Settlement Systems (GhIPSS)"
                  : "🔒 Secure checkout · This is a simulated purchase"
                }
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
