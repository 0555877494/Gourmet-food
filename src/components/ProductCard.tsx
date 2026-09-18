import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [flyAnimation, setFlyAnimation] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Trigger fly animation
    setFlyAnimation(true);
    
    // Add to cart after animation starts
    setTimeout(() => {
      addToCart(product);
      setAdded(true);
      setFlyAnimation(false);
      setTimeout(() => setAdded(false), 1500);
    }, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Product Image Area */}
      <div
        className="relative h-52 sm:h-60 bg-gradient-to-br from-amber-50 to-orange-50 cursor-pointer overflow-hidden"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
        />
        {/* Zoom lens effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        {/* Magnifying glass icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
        
        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-medium text-amber-700 border border-amber-200">
          {product.category}
        </div>

        {/* Quick view button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 1.05 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-sm text-amber-800 px-4 py-2 rounded-full text-xs font-medium shadow-lg hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
        >
          Quick View
        </motion.button>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-medium text-amber-700">{product.rating}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-5">
        {/* Origin tag */}
        <div className="flex items-center gap-1.5 mb-2">
          <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs text-amber-500">{product.origin}</span>
        </div>

        <h3
          className="font-serif text-lg font-semibold text-amber-900 mb-1 cursor-pointer hover:text-amber-700 transition-colors line-clamp-1"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>
        <p className="text-sm text-amber-600/80 mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Reviews */}
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
            ({product.reviews} reviews)
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
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
              added
                ? "bg-green-600 text-white"
                : "bg-amber-800 hover:bg-amber-900 text-white"
            }`}
          >
            {added ? (
              <>
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </motion.svg>
                Added!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add
              </>
            )}
            
            {/* Flying product animation */}
            {flyAnimation && (
              <motion.div
                initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [1, 0.5, 0.3],
                  x: [0, window.innerWidth / 2, window.innerWidth - 100],
                  y: [0, -window.innerHeight / 2, -window.innerHeight + 100],
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute z-50 pointer-events-none"
                style={{ top: '50%', left: '50%' }}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-lg">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
