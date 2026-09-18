import { Product } from "../data/products";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Product Image Area */}
      <div
        className="relative h-48 sm:h-56 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <span className="text-7xl sm:text-8xl group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </span>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-medium text-amber-700 border border-amber-200">
          {product.category}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="font-serif text-lg font-semibold text-amber-900 mb-1 cursor-pointer hover:text-amber-700 transition-colors line-clamp-1"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>
        <p className="text-sm text-amber-600/80 mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating) ? "text-amber-400" : "text-amber-200"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-amber-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-amber-50">
          <div>
            <span className="text-xl font-bold text-amber-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-amber-500 ml-1">/ {product.weight}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-sm font-medium rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
