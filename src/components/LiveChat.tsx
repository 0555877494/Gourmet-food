import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const botResponses: { [key: string]: string } = {
  shipping: '🚚 We offer free shipping on orders over $50! Standard delivery takes 3-5 business days. Express shipping is available for $9.99 (1-2 business days).',
  delivery: '📦 Once your order ships, you\'ll receive a tracking number via email. You can also track your order in your dashboard under "My Orders".',
  return: '↩️ We offer a 30-day return policy. Items must be unused and in original packaging. Contact us at returns@saveurco.com to initiate a return.',
  payment: '💳 We accept all major credit cards (Visa, Mastercard, AMEX) and Mobile Money (MTN, Vodafone, AirtelTigo) for Ghana customers.',
  momo: '📱 Mobile Money is available for Ghana customers! Select MoMo at checkout, choose your network (MTN/Vodafone/AirtelTigo), and enter your phone number. You\'ll receive a prompt to authorize payment.',
  track: '🔍 To track your order, go to your dashboard and click on "Orders" tab. You\'ll see the status and tracking information for each order.',
  coupon: '🎟️ Try these codes: WELCOME10 (10% off), GOLD20 (20% off orders over $100), SAVE5 ($5 off orders over $25), or FREESHIP (free shipping over $50).',
  default: '👋 Thanks for your message! I can help with shipping, delivery, returns, payments, MoMo, order tracking, and coupon codes. What would you like to know?'
};

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '👋 Hi there! How can I help you today? Ask me about shipping, payments, returns, or coupon codes!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('ship') || lowerMessage.includes('delivery time')) {
      return botResponses.shipping;
    }
    if (lowerMessage.includes('track') || lowerMessage.includes('where')) {
      return botResponses.track;
    }
    if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      return botResponses.return;
    }
    if (lowerMessage.includes('pay') || lowerMessage.includes('card') || lowerMessage.includes('credit')) {
      return botResponses.payment;
    }
    if (lowerMessage.includes('momo') || lowerMessage.includes('mobile money') || lowerMessage.includes('ghana')) {
      return botResponses.momo;
    }
    if (lowerMessage.includes('coupon') || lowerMessage.includes('code') || lowerMessage.includes('discount')) {
      return botResponses.coupon;
    }
    
    return botResponses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{ height: '500px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">💬</span>
              </div>
              <div>
                <h3 className="font-semibold">Saveur & Co. Support</h3>
                <p className="text-xs text-white/80">We typically reply in a few seconds</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-amber-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 bg-amber-600 text-white rounded-full hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
