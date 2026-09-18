import { motion } from "framer-motion";

interface StaticPageProps {
  page: string;
  onNavigate?: (page: string) => void;
}

export default function StaticPage({ page, onNavigate }: StaticPageProps) {
  const pages: Record<string, { title: string; icon: string; content: JSX.Element }> = {
    about: {
      title: "Our Story",
      icon: "📖",
      content: (
        <div className="prose prose-amber max-w-none">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-8">
            <p className="text-xl text-amber-900 font-serif italic leading-relaxed">
              "We believe that food is more than sustenance—it's a journey through cultures, traditions, and the hands of artisans who pour their hearts into every creation."
            </p>
            <p className="text-amber-700 mt-3 font-medium">— Elena Marchetti, Founder</p>
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">The Saveur & Co. Journey</h3>
          <p className="text-amber-800 mb-4">
            Founded in 2020 in the heart of New York City, Saveur & Co. began as a passion project by Elena Marchetti, a third-generation Italian-American with an insatiable curiosity for the world's finest foods. After years of traveling to remote villages in Italy, France, Iran, and New Zealand, Elena realized that many extraordinary artisanal products were inaccessible to food lovers outside their regions.
          </p>
          <p className="text-amber-800 mb-4">
            Today, we partner with over 50 artisan producers across 20 countries, each selected for their unwavering commitment to quality, tradition, and sustainable practices. From the rolling hills of Umbria where our truffle olive oil is crafted, to the pristine forests of New Zealand where our Mānuka honey is harvested, every product tells a story.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-white rounded-xl p-6 border border-amber-100 text-center">
              <div className="text-4xl mb-2">🌍</div>
              <h4 className="font-bold text-amber-900 mb-1">20+ Countries</h4>
              <p className="text-sm text-amber-600">Sourcing the world's finest</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-amber-100 text-center">
              <div className="text-4xl mb-2">👨‍🍳</div>
              <h4 className="font-bold text-amber-900 mb-1">50+ Artisans</h4>
              <p className="text-sm text-amber-600">Master craftspeople</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-amber-100 text-center">
              <div className="text-4xl mb-2">⭐</div>
              <h4 className="font-bold text-amber-900 mb-1">10,000+ Customers</h4>
              <p className="text-sm text-amber-600">Happy food lovers</p>
            </div>
          </div>

          <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">Our Values</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-2xl">🌱</span>
              <div>
                <h4 className="font-bold text-amber-900">Sustainability</h4>
                <p className="text-amber-700">We prioritize eco-friendly practices, from carbon-neutral shipping to recyclable packaging.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">🤝</span>
              <div>
                <h4 className="font-bold text-amber-900">Fair Trade</h4>
                <p className="text-amber-700">Our producers receive fair compensation, ensuring their craft thrives for generations.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">✨</span>
              <div>
                <h4 className="font-bold text-amber-900">Authenticity</h4>
                <p className="text-amber-700">Every product is genuine, traceable, and crafted using time-honored methods.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    contact: {
      title: "Contact Us",
      icon: "📞",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">Get in Touch</h3>
            <p className="text-amber-700 mb-6">
              We'd love to hear from you! Whether you have a question about our products, need help with an order, or just want to share your culinary adventures, our team is here to help.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <h4 className="font-bold text-amber-900">Email</h4>
                  <p className="text-amber-700">hello@saveurco.com</p>
                  <p className="text-sm text-amber-500">We respond within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <h4 className="font-bold text-amber-900">Phone</h4>
                  <p className="text-amber-700">1-800-SAVEUR (1-800-728-3878)</p>
                  <p className="text-sm text-amber-500">Mon-Fri 9am-6pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <h4 className="font-bold text-amber-900">Visit Us</h4>
                  <p className="text-amber-700">123 Gourmet Avenue</p>
                  <p className="text-amber-700">New York, NY 10001</p>
                  <p className="text-sm text-amber-500">Showroom open by appointment</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-amber-100 p-6">
            <h4 className="font-serif font-bold text-amber-900 mb-4">Send us a message</h4>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">Name</label>
                <input type="text" className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">Subject</label>
                <select className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Product Question</option>
                  <option>Wholesale</option>
                  <option>Press</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-700 mb-1">Message</label>
                <textarea rows={4} className="w-full px-3 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none" />
              </div>
              <button type="button" className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-medium transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      ),
    },
    faq: {
      title: "Frequently Asked Questions",
      icon: "❓",
      content: (
        <div className="space-y-3">
          {[
            { q: "How do you ensure product quality?", a: "We personally visit every producer, taste-test products, and only partner with artisans who meet our rigorous quality standards. Each batch is inspected before shipping." },
            { q: "What is your shipping policy?", a: "We offer free shipping on orders over $75. Standard delivery takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee." },
            { q: "How should I store specialty foods?", a: "Each product comes with specific storage instructions. Generally, olive oils and vinegars should be kept in cool, dark places. Honey doesn't require refrigeration. Chocolates are best stored at 60-70°F." },
            { q: "Do you ship internationally?", a: "Currently, we ship within the United States. International shipping is coming soon! Sign up for our newsletter to be notified when we expand." },
            { q: "What is your return policy?", a: "We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, contact us for a full refund or exchange." },
            { q: "Are your products organic?", a: "Many of our products are organic, but not all. We prioritize sustainable and ethical practices over certifications. Each product page indicates organic status when applicable." },
            { q: "Can I purchase gift sets?", a: "Yes! We offer beautifully curated gift sets for every occasion. You can also create your own custom gift box with any combination of products." },
            { q: "How do I track my order?", a: "Once your order ships, you'll receive an email with a tracking number. You can also track orders in your customer dashboard." },
          ].map((item, i) => (
            <details key={i} className="group bg-white rounded-xl border border-amber-100 overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-amber-50 transition-colors">
                <span className="font-medium text-amber-900">{item.q}</span>
                <svg className="w-5 h-5 text-amber-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-4 text-amber-700 text-sm leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      ),
    },
    shipping: {
      title: "Shipping & Returns",
      icon: "📦",
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                <div className="text-3xl mb-2">📬</div>
                <h4 className="font-bold text-amber-900 mb-1">Standard Shipping</h4>
                <p className="text-2xl font-bold text-amber-800">$9.99</p>
                <p className="text-sm text-amber-600">3-5 business days</p>
                <p className="text-xs text-green-600 mt-2">FREE on orders over $75</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-bold text-amber-900 mb-1">Express Shipping</h4>
                <p className="text-2xl font-bold text-amber-800">$19.99</p>
                <p className="text-sm text-amber-600">1-2 business days</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                <div className="text-3xl mb-2">🎁</div>
                <h4 className="font-bold text-amber-900 mb-1">Gift Wrapping</h4>
                <p className="text-2xl font-bold text-amber-800">$5.99</p>
                <p className="text-sm text-amber-600">Premium packaging</p>
              </div>
            </div>
            <p className="text-amber-700">
              All orders are carefully packaged in temperature-controlled materials to ensure your specialty foods arrive in perfect condition. We use eco-friendly, recyclable packaging whenever possible.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">Return Policy</h3>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4">
              <h4 className="font-bold text-green-900 mb-2">✨ 30-Day Satisfaction Guarantee</h4>
              <p className="text-green-800 text-sm">
                If you're not completely satisfied with your purchase, we'll make it right. Contact us within 30 days of delivery for a full refund or exchange.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-xl">1️⃣</span>
                <div>
                  <h4 className="font-bold text-amber-900">Contact Us</h4>
                  <p className="text-sm text-amber-700">Email hello@saveurco.com or call 1-800-SAVEUR</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-xl">2️⃣</span>
                <div>
                  <h4 className="font-bold text-amber-900">Receive Return Label</h4>
                  <p className="text-sm text-amber-700">We'll email you a prepaid return shipping label</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-xl">3️⃣</span>
                <div>
                  <h4 className="font-bold text-amber-900">Ship Back</h4>
                  <p className="text-sm text-amber-700">Package items securely and drop off at any carrier location</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-xl">4️⃣</span>
                <div>
                  <h4 className="font-bold text-amber-900">Get Refunded</h4>
                  <p className="text-sm text-amber-700">Refund processed within 5-7 business days of receipt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    terms: {
      title: "Terms of Service",
      icon: "📜",
      content: (
        <div className="prose prose-amber max-w-none space-y-6">
          <p className="text-sm text-amber-600 italic">Last updated: January 2026</p>
          
          <section>
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-3">1. Acceptance of Terms</h3>
            <p className="text-amber-700">
              By accessing and using Saveur & Co. ("Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-3">2. Use License</h3>
            <p className="text-amber-700">
              Permission is granted to temporarily use the materials on Saveur & Co.'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-3">3. Product Descriptions</h3>
            <p className="text-amber-700">
              We attempt to be as accurate as possible. However, we do not warrant that product descriptions, colors, prices, or availability are accurate, complete, reliable, current, or error-free.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-3">4. Orders and Payment</h3>
            <p className="text-amber-700">
              All orders are subject to acceptance and availability. We reserve the right to refuse service, modify prices, or limit quantities. Payment must be received before orders are processed.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-3">5. Limitation of Liability</h3>
            <p className="text-amber-700">
              Saveur & Co. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
            </p>
          </section>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      icon: "🔒",
      content: (
        <div className="prose prose-amber max-w-none space-y-6">
          <p className="text-sm text-amber-600 italic">Last updated: January 2026</p>
          
          <section>
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-3">Your Privacy Matters</h3>
            <p className="text-amber-700">
              At Saveur & Co., we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-3">Information We Collect</h3>
            <ul className="list-disc pl-6 text-amber-700 space-y-2">
              <li>Personal information (name, email, address, phone)</li>
              <li>Payment information (processed securely through encrypted channels)</li>
              <li>Order history and preferences</li>
              <li>Device and usage information</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-3">How We Use Your Information</h3>
            <ul className="list-disc pl-6 text-amber-700 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our services and user experience</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-3">Data Security</h3>
            <p className="text-amber-700">
              We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-3">Your Rights</h3>
            <p className="text-amber-700">
              You have the right to access, correct, or delete your personal information. Contact us at privacy@saveurco.com to exercise these rights.
            </p>
          </section>
        </div>
      ),
    },
  };

  const currentPage = pages[page] || pages.about;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate?.("home")}
                  className="text-amber-600 hover:text-amber-800 transition-colors"
                >
                  Home
                </button>
              </li>
              <li className="text-amber-400">/</li>
              <li className="text-amber-900 font-medium">{currentPage.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">{currentPage.icon}</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-amber-900">
              {currentPage.title}
            </h1>
          </div>
          {currentPage.content}
        </motion.div>
      </div>
    </div>
  );
}
