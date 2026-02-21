import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatSuggestions from "./ChatSuggestions";
import { getAIResponse } from "@/lib/chatService";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Welcome to Lynda Michelle Medical Centre! 👋 I'm your clinic assistant. I can help you with:\n\n• Our services and operating hours\n\n• Estimated costs for treatments\n\n• How to prepare for your visit\n\n• General health guidance\n\nHow can I help you today?",
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHover, setChatHover] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([WELCOME_MESSAGE]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;
      const userMsg: Message = { role: "user", content: text.trim() };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);

      try {
        const reply = await getAIResponse(updatedMessages);
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "I'm having trouble right now. Please try again or call us at ☎️ +256 772 590 967." },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  const hasUserMessages = messages.some((m) => m.role === "user");

  return (
    <>
      {/* AI Chat FAB - stacked above WhatsApp */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring" }}
        onClick={() => setIsOpen((o) => !o)}
        onMouseEnter={() => setChatHover(true)}
        onMouseLeave={() => setChatHover(false)}
        className="fixed bottom-24 right-6 z-50"
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
      >
        <div className="relative flex items-center">
          <AnimatePresence>
            {chatHover && !isOpen && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="absolute right-16 bg-black/70 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap"
              >
                Ask AI
              </motion.span>
            )}
          </AnimatePresence>
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-teal-primary/30 animate-ping" />
          )}
          <div className="relative w-14 h-14 rounded-full bg-teal-primary flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(45,212,168,0.3)] transition-all">
            {isOpen ? (
              <X className="w-7 h-7 text-bg-dark" />
            ) : (
              <MessageCircle className="w-7 h-7 text-bg-dark" />
            )}
          </div>
          {!isOpen && (
            <span className="absolute -top-1 -right-1 bg-amber-accent text-bg-dark w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
              AI
            </span>
          )}
        </div>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-[7.5rem] right-6 z-50 w-[380px] h-[520px] max-md:w-[calc(100vw-48px)] max-md:h-[70vh] max-md:bottom-24 max-md:right-6 rounded-2xl bg-bg-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="h-14 px-4 flex items-center justify-between bg-white/5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <div>
                  <p className="text-sm font-semibold text-text-primary leading-tight">
                    LMMC Assistant
                  </p>
                  <p className="text-xs text-text-secondary">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {messages.map((m, i) => (
                <ChatMessage key={i} role={m.role} content={m.content} />
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="mr-auto max-w-[85%] bg-white/5 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-text-secondary animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-text-secondary animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-text-secondary animate-bounce [animation-delay:300ms]" />
                </div>
              )}

              {/* Suggestions */}
              {!hasUserMessages && !isLoading && (
                <ChatSuggestions onSelect={sendMessage} />
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="h-14 px-3 flex items-center gap-2 bg-white/5 border-t border-white/10 shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask about our services..."
                className="flex-1 bg-transparent text-text-primary text-sm placeholder:text-text-secondary/50 outline-none"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-full bg-teal-primary flex items-center justify-center hover:bg-teal-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-bg-dark" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
