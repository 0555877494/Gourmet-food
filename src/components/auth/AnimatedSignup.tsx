import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

interface AnimatedSignupProps {
  onSwitchToLogin: () => void;
}

const roleOptions = [
  {
    id: "customer" as const,
    label: "Customer",
    icon: "🛍️",
    description: "Order fine artisanal foods",
    gradient: "from-amber-500 to-orange-600",
    features: ["Browse specialty foods", "Track your orders", "Save favorites"],
  },
  {
    id: "delivery" as const,
    label: "Delivery Agent",
    icon: "🚴",
    description: "Deliver orders & earn",
    gradient: "from-emerald-500 to-teal-600",
    features: ["Accept deliveries", "Optimize routes", "Track earnings"],
  },
];

const foodParticles = [
  { emoji: "🫒", x: "8%", y: "12%", delay: 0, duration: 7 },
  { emoji: "🍯", x: "88%", y: "18%", delay: 1.2, duration: 6 },
  { emoji: "🍫", x: "72%", y: "78%", delay: 0.5, duration: 8 },
  { emoji: "🌸", x: "15%", y: "82%", delay: 2, duration: 5.5 },
  { emoji: "🍇", x: "45%", y: "8%", delay: 1, duration: 7.5 },
  { emoji: "✨", x: "92%", y: "45%", delay: 0.8, duration: 6.5 },
  { emoji: "💜", x: "3%", y: "50%", delay: 1.5, duration: 7 },
  { emoji: "🌿", x: "55%", y: "90%", delay: 2.5, duration: 6 },
];

export default function AnimatedSignup({ onSwitchToLogin }: AnimatedSignupProps) {
  const { signup } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"customer" | "delivery">("customer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const currentRole = roleOptions.find((r) => r.id === selectedRole)!;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleNext = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all fields");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = signup(formData.name, formData.email, formData.password, formData.phone, selectedRole);
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
            "linear-gradient(135deg, #0a1628 0%, #1a0a2e 25%, #0f2027 50%, #1a1a2e 75%, #0a1628 100%)",
            "linear-gradient(135deg, #1a1a2e 0%, #0f2027 25%, #0a1628 50%, #1a0a2e 75%, #0f2027 100%)",
            "linear-gradient(135deg, #0f2027 0%, #1a1a2e 25%, #1a0a2e 50%, #0a1628 75%, #1a1a2e 100%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Animated orbs */}
      <motion.div
        className={`absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-15 bg-gradient-to-r ${currentRole.gradient} opacity-20`}
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 80, -60, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{ top: "-15%", right: "-10%" }}
      />
      <motion.div
        className={`absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15 bg-gradient-to-r ${currentRole.gradient} opacity-15`}
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -100, 40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
        style={{ bottom: "-15%", left: "-10%" }}
      />

      {/* Floating particles */}
      {foodParticles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl sm:text-3xl opacity-25 pointer-events-none select-none"
          style={{ left: particle.x, top: particle.y }}
          animate={{
            y: [0, -25, 15, -15, 0],
            x: [0, 10, -8, 5, 0],
            rotate: [0, -8, 8, -5, 0],
            opacity: [0.15, 0.3, 0.15, 0.25, 0.15],
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

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Main Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md z-10"
      >
        {/* Glowing border */}
        <motion.div
          className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${currentRole.gradient} opacity-50 blur-sm`}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 pb-4 text-center">
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 mb-4"
            >
              <span className="text-3xl">{currentRole.icon}</span>
            </motion.div>
            <motion.h1
              className="font-serif text-2xl font-bold text-white mb-1"
            >
              Create Account
            </motion.h1>
            <p className="text-sm text-gray-400">Join our community of food lovers</p>
          </div>

          {/* Role Selection */}
          <div className="px-6 sm:px-8 mb-2">
            <div className="grid grid-cols-2 gap-3">
              {roleOptions.map((role) => (
                <motion.button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role.id);
                    setStep(1);
                    setError("");
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                    selectedRole === role.id
                      ? "border-white/20 bg-white/10"
                      : "border-white/5 bg-white/[0.02] hover:bg-white/5"
                  }`}
                >
                  {selectedRole === role.id && (
                    <motion.div
                      layoutId="roleHighlight"
                      className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-10 rounded-2xl`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative">
                    <span className="text-2xl mb-2 block">{role.icon}</span>
                    <p className="text-sm font-semibold text-white">{role.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{role.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Progress Steps */}
          <div className="px-6 sm:px-8 mt-4">
            <div className="flex items-center gap-2">
              <div className={`flex-1 h-1 rounded-full transition-all duration-300 ${step >= 1 ? `bg-gradient-to-r ${currentRole.gradient}` : "bg-white/10"}`} />
              <div className={`flex-1 h-1 rounded-full transition-all duration-300 ${step >= 2 ? `bg-gradient-to-r ${currentRole.gradient}` : "bg-white/10"}`} />
            </div>
            <div className="flex justify-between mt-2">
              <span className={`text-xs ${step >= 1 ? "text-white" : "text-gray-500"}`}>Personal Info</span>
              <span className={`text-xs ${step >= 2 ? "text-white" : "text-gray-500"}`}>Security</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 pt-4">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all placeholder:text-gray-600"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all placeholder:text-gray-600"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all placeholder:text-gray-600"
                    />
                  </div>

                  {/* Features preview */}
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-xs text-gray-400 mb-2">As a {currentRole.label}, you'll get:</p>
                    <div className="space-y-1.5">
                      {currentRole.features.map((feature, i) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 text-xs text-gray-300"
                        >
                          <span className="text-green-400">✓</span>
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-xs text-red-300"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Next Button */}
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3.5 rounded-xl font-medium text-white bg-gradient-to-r ${currentRole.gradient} shadow-lg`}
                  >
                    Continue
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  {/* Password */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all placeholder:text-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={showPassword
                            ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          } />
                        </svg>
                      </button>
                    </div>
                    {/* Password strength */}
                    {formData.password && (
                      <div className="mt-2 flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`flex-1 h-1 rounded-full transition-all ${
                              formData.password.length >= level * 3
                                ? formData.password.length >= 9
                                  ? "bg-green-400"
                                  : formData.password.length >= 6
                                  ? "bg-yellow-400"
                                  : "bg-red-400"
                                : "bg-white/10"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Confirm Password</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      placeholder="Re-enter your password"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all placeholder:text-gray-600"
                    />
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-400 mt-1">Passwords don't match</p>
                    )}
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500/20" />
                    <span className="text-xs text-gray-400">
                      I agree to the <span className="text-white underline">Terms of Service</span> and <span className="text-white underline">Privacy Policy</span>
                    </span>
                  </label>

                  {/* Error/Success */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-xs text-red-300"
                      >
                        {error}
                      </motion.div>
                    )}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5 text-xs text-green-300"
                      >
                        {success}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      type="button"
                      onClick={() => setStep(1)}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-3.5 rounded-xl font-medium text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 py-3.5 rounded-xl font-medium text-white bg-gradient-to-r ${currentRole.gradient} shadow-lg disabled:opacity-70 relative overflow-hidden`}
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
                            Creating...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-400 mt-5">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className={`font-medium bg-gradient-to-r ${currentRole.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
              >
                Sign In
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
