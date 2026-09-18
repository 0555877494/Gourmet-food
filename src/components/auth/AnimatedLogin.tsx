import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

interface AnimatedLoginProps {
  onSwitchToSignup: () => void;
}

// Floating food particles
const particles = [
  { emoji: "🫒", x: "10%", y: "20%", delay: 0, duration: 6 },
  { emoji: "🍯", x: "85%", y: "15%", delay: 1, duration: 7 },
  { emoji: "🍫", x: "75%", y: "75%", delay: 2, duration: 5 },
  { emoji: "🌸", x: "20%", y: "80%", delay: 0.5, duration: 8 },
  { emoji: "🍇", x: "50%", y: "10%", delay: 1.5, duration: 6.5 },
  { emoji: "🌿", x: "90%", y: "50%", delay: 3, duration: 7 },
  { emoji: "💜", x: "5%", y: "55%", delay: 2.5, duration: 5.5 },
  { emoji: "✨", x: "60%", y: "85%", delay: 0.8, duration: 6 },
  { emoji: "🧀", x: "35%", y: "5%", delay: 1.8, duration: 7.5 },
  { emoji: "🍷", x: "92%", y: "88%", delay: 2.2, duration: 6.2 },
];

export default function AnimatedLogin({ onSwitchToSignup }: AnimatedLoginProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #1a0a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 75%, #16213e 100%)",
            "linear-gradient(135deg, #16213e 0%, #0f3460 25%, #1a0a2e 50%, #1a1a2e 75%, #0f3460 100%)",
            "linear-gradient(135deg, #1a1a2e 0%, #1a0a2e 25%, #16213e 50%, #0f3460 75%, #1a0a2e 100%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Animated orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 bg-amber-500/20"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{ top: "-10%", left: "-10%" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15 bg-orange-500/15"
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 100, -40, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
        style={{ bottom: "-10%", right: "-10%" }}
      />

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl sm:text-3xl opacity-30 pointer-events-none select-none"
          style={{ left: particle.x, top: particle.y }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            rotate: [0, 10, -10, 5, 0],
            opacity: [0.2, 0.4, 0.2, 0.35, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md z-10"
      >
        {/* Glowing border effect */}
        <motion.div
          className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 blur-sm"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 pb-4 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 mb-4"
            >
              <span className="text-3xl">🏪</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-2xl font-bold text-white mb-1"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-gray-400"
            >
              Sign in to access your account
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 pt-4 space-y-5">
            {/* Email Field */}
            <div className="relative">
              <motion.label
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  focusedField === "email" || email
                    ? "top-1.5 text-xs text-gray-400"
                    : "top-3.5 text-sm text-gray-500"
                }`}
                animate={{
                  y: focusedField === "email" || email ? -4 : 0,
                }}
              >
                Email Address
              </motion.label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 pt-5 pb-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all placeholder-transparent"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <motion.label
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  focusedField === "password" || password
                    ? "top-1.5 text-xs text-gray-400"
                    : "top-3.5 text-sm text-gray-500"
                }`}
              >
                Password
              </motion.label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 pt-5 pb-2.5 pr-12 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all placeholder-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors p-1"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button type="button" className="text-xs text-gray-400 hover:text-white transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Error/Success Messages */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-300"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-sm text-green-300"
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full py-3.5 rounded-xl font-medium text-white overflow-hidden transition-all duration-300 bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg disabled:opacity-70"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                animate={isLoading ? { x: "100%" } : { x: "-100%" }}
                transition={{ duration: 1.5, repeat: isLoading ? Infinity : 0 }}
              />
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>

            {/* Demo Credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 rounded-xl p-3 border border-white/5"
            >
              <p className="text-xs text-gray-400 text-center mb-2 font-medium">Demo Credentials</p>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>🛍️ Customer:</span>
                  <span className="font-mono text-gray-400">customer@saveurco.com / customer123</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>🚴 Delivery:</span>
                  <span className="font-mono text-gray-400">delivery@saveurco.com / delivery123</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>👑 Admin:</span>
                  <span className="font-mono text-gray-400">admin@saveurco.com / admin123</span>
                </div>
              </div>
            </motion.div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="font-medium bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                Create Account
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
