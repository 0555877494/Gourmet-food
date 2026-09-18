import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { coupons, Coupon } from '../data/products';

interface CouponInputProps {
  subtotal: number;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon) => void;
  onRemoveCoupon: () => void;
}

export default function CouponInput({ subtotal, appliedCoupon, onApplyCoupon, onRemoveCoupon }: CouponInputProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleApply = () => {
    setError('');
    const coupon = coupons.find(c => c.code === code.toUpperCase());

    if (!coupon) {
      setError('Invalid coupon code');
      return;
    }

    if (subtotal < coupon.minOrder) {
      setError(`Minimum order of $${coupon.minOrder} required`);
      return;
    }

    onApplyCoupon(coupon);
    setCode('');
    setShowSuggestions(false);
  };

  const calculateDiscount = (coupon: Coupon) => {
    if (coupon.type === 'percentage') {
      return subtotal * (coupon.discount / 100);
    } else if (coupon.type === 'fixed') {
      return coupon.discount;
    }
    return 0;
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🎟️</span>
        <h3 className="font-semibold text-gray-900">Apply Coupon Code</h3>
      </div>

      <AnimatePresence mode="wait">
        {appliedCoupon ? (
          <motion.div
            key="applied"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-green-50 border border-green-200 rounded-lg p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-green-900">{appliedCoupon.code}</span>
              </div>
              <button
                onClick={onRemoveCoupon}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
            <p className="text-sm text-green-700">{appliedCoupon.description}</p>
            <p className="text-lg font-bold text-green-900 mt-2">
              -${calculateDiscount(appliedCoupon).toFixed(2)}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Enter code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                onClick={handleApply}
                disabled={!code}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Apply
              </button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 mb-2"
              >
                {error}
              </motion.p>
            )}

            {/* Coupon Suggestions */}
            <AnimatePresence>
              {showSuggestions && !appliedCoupon && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-amber-200"
                >
                  <p className="text-xs font-medium text-gray-700 mb-2">Available coupons:</p>
                  <div className="space-y-2">
                    {coupons.map(coupon => (
                      <button
                        key={coupon.code}
                        onClick={() => {
                          setCode(coupon.code);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left p-2 bg-white rounded border border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-semibold text-amber-700">{coupon.code}</span>
                          <span className="text-xs text-gray-600">Min ${coupon.minOrder}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{coupon.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
