import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const announcements = [
  {
    id: 1,
    icon: '🔥',
    text: 'Flash Sale: 20% off with code GOLD20',
    highlight: 'GOLD20',
  },
  {
    id: 2,
    icon: '🚚',
    text: 'Free shipping on orders over $50',
    highlight: '$50',
  },
  {
    id: 3,
    icon: '🎁',
    text: 'New customers: Use WELCOME10 for 10% off',
    highlight: 'WELCOME10',
  },
];

export default function AnnouncementBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = announcements[currentIndex];

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 text-white py-2.5 px-4 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 relative">
        <span className="text-xl">{current.icon}</span>
        <p className="text-sm font-medium">
          {current.text.split(current.highlight).map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="font-bold bg-white/20 px-2 py-0.5 rounded">
                  {current.highlight}
                </span>
              )}
            </span>
          ))}
        </p>
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss announcement"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
        <motion.div
          key={currentIndex}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          className="h-full bg-white/60"
        />
      </div>
    </motion.div>
  );
}
