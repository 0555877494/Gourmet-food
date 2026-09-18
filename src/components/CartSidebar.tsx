import { useCart } from "../context/CartContext";

interface CartSidebarProps {
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartSidebar({ onClose, onCheckout }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-amber-100">
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-900">Your Cart</h2>
            <p className="text-sm text-amber-500">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-6xl mb-4">🛒</span>
              <p className="text-lg font-medium text-amber-800 mb-1">Your cart is empty</p>
              <p className="text-sm text-amber-500">
                Discover our curated selection of fine foods
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-amber-50/50 rounded-xl border border-amber-100"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">{item.product.image}</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-amber-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-amber-500 mb-2">{item.product.weight}</p>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors text-xs"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium text-amber-900 w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-bold text-amber-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="self-start text-amber-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-amber-100 bg-amber-50/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-amber-600">Subtotal</span>
              <span className="text-sm text-amber-800">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-amber-600">Shipping</span>
              <span className="text-sm text-amber-800">{totalPrice > 75 ? "Free" : "$9.99"}</span>
            </div>
            <div className="flex items-center justify-between mb-4 pt-2 border-t border-amber-200">
              <span className="text-base font-semibold text-amber-900">Total</span>
              <span className="text-xl font-bold text-amber-900">
                ${(totalPrice + (totalPrice > 75 ? 0 : 9.99)).toFixed(2)}
              </span>
            </div>
            {totalPrice < 75 && (
              <p className="text-xs text-amber-500 mb-3 text-center">
                Add ${(75 - totalPrice).toFixed(2)} more for free shipping!
              </p>
            )}
            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-amber-800 hover:bg-amber-900 text-white font-medium rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
