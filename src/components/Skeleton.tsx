import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave";
}

export default function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
}: SkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100";
  
  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
    rounded: "rounded-xl",
  };

  const style = {
    width: width || "100%",
    height: height || "1rem",
  };

  if (animation === "wave") {
    return (
      <div
        className={`${baseClasses} ${variantClasses[variant]} ${className} overflow-hidden relative`}
        style={style}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// Pre-built skeleton components
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden">
      <Skeleton variant="rectangular" height="240px" className="rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton variant="text" width="40%" height="12px" />
        <Skeleton variant="text" width="80%" height="20px" />
        <Skeleton variant="text" width="100%" height="14px" />
        <Skeleton variant="text" width="60%" height="14px" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton variant="text" width="30%" height="24px" />
          <div className="flex-1" />
          <Skeleton variant="rounded" width="80px" height="36px" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function OrderSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-amber-100 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width="120px" height="16px" />
        <Skeleton variant="rounded" width="80px" height="24px" />
      </div>
      <Skeleton variant="text" width="60%" height="14px" />
      <div className="flex gap-2">
        <Skeleton variant="circular" width="48px" height="48px" />
        <Skeleton variant="circular" width="48px" height="48px" />
        <Skeleton variant="circular" width="48px" height="48px" />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-amber-50">
        <Skeleton variant="text" width="80px" height="20px" />
        <div className="flex gap-2">
          <Skeleton variant="rounded" width="70px" height="32px" />
          <Skeleton variant="rounded" width="70px" height="32px" />
        </div>
      </div>
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width="40px" height="40px" />
            <Skeleton variant="text" width="150px" height="24px" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton variant="rounded" width="200px" height="40px" />
            <Skeleton variant="rounded" width="100px" height="40px" />
          </div>
        </div>
      </div>
    </div>
  );
}
