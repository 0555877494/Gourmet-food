import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-amber-700 hover:text-amber-900 hover:bg-white transition-all shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 sm:p-12 flex items-center justify-center min-h-[250px] md:min-h-[400px] rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <span className="text-[100px] sm:text-[120px] md:text-[140px]">
              {product.image}
            </span>
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-8 flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                {product.category}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-900 mb-2">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "text-amber-400" : "text-amber-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-amber-600">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>

            <p className="text-amber-700 text-sm leading-relaxed mb-5">
              {product.longDescription}
            </p>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-amber-50 rounded-xl p-3">
                <p className="text-xs text-amber-500 uppercase tracking-wide">Origin</p>
                <p className="text-sm font-medium text-amber-800">{product.origin}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3">
                <p className="text-xs text-amber-500 uppercase tracking-wide">Size</p>
                <p className="text-sm font-medium text-amber-800">{product.weight}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-amber-50 text-amber-600 text-xs rounded-full border border-amber-100"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Price & Quantity */}
            <div className="mt-auto pt-4 border-t border-amber-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-amber-900">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-50 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-amber-900 w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 rounded-full font-medium text-white transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] ${
                  added
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-amber-800 hover:bg-amber-900"
                }`}
              >
                {added ? "✓ Added to Cart!" : `Add to Cart — $${(product.price * quantity).toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
