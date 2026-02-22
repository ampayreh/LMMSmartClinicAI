import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatSuggestions from "./ChatSuggestions";
import { getAIResponse } from "@/lib/chatService";

type Message = { role: "user" | "assistant"; content: string };
type Language = "en" | "lg" | null;

const WELCOME_MESSAGES: Record<"en" | "lg", Message> = {
  en: {
    role: "assistant",
    content:
      "Welcome to Lynda Michelle Medical Centre! 👋 I'm your clinic assistant. I can help you with:\n\n• Our services and operating hours\n\n• Estimated costs for treatments\n\n• How to prepare for your visit\n\n• General health guidance\n\nHow can I help you today?",
  },
  lg: {
    role: "assistant",
    content:
      "Tukulabye ku Lynda Michelle Medical Centre! 👋 Nze omuyambi wo mu ddwaliro. Nsobola okukuyamba ku:\n\n• Empeereza zaffe n'essaawa ez'okukola\n\n• Ebiwereza eby'obujjanjabi\n\n• Engeri gy'weetegekera okujja\n\n• Obulezi obw'awamu\n\nNkuyambe ntya leero?",
  },
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHover, setChatHover] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasUserMessages = messages.some((m) => m.role === "user");

  // Add welcome message after language selection
  useEffect(() => {
    if (language && messages.length === 0) {
      setMessages([WELCOME_MESSAGES[language]]);
    }
  }, [language, messages.length]);

  // Auto-scroll only after user has sent a message
  useEffect(() => {
    if (hasUserMessages || isLoading) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, hasUserMessages]);

  // Focus input on language selected
  useEffect(() => {
    if (language) setTimeout(() => inputRef.current?.focus(), 300);
  }, [language]);

  const selectLanguage = (lang: "en" | "lg") => {
    setLanguage(lang);
  };

  const resetChat = () => {
    setLanguage(null);
    setMessages([]);
    setInput("");
  };

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading || !language) return;
      const userMsg: Message = { role: "user", content: text.trim() };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);

      try {
        const reply = await getAIResponse(updatedMessages, language);
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch {
        const errorMsg =
          language === "lg"
            ? "Nsonyiwa, waliwo obuzibu. Gezaako nate oba tuwandiikire ku WhatsApp ☎️ +256 741 008 049."
            : "I'm having trouble right now. Please try again or WhatsApp us at ☎️ +256 741 008 049.";
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: errorMsg },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, language]
  );


  return (
    <>
      {/* AI Chat FAB */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring" }}
        onClick={() => setIsOpen((o) => !o)}
        onMouseEnter={() => setChatHover(true)}
        onMouseLeave={() => setChatHover(false)}
        className="fixed bottom-[4.5rem] right-6 z-50"
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
          <div className="relative w-12 h-12 rounded-full bg-teal-primary flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(45,212,168,0.3)] transition-all">
            {isOpen ? (
              <X className="w-6 h-6 text-bg-dark" />
            ) : (
              <MessageCircle className="w-6 h-6 text-bg-dark" />
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
            className="fixed overflow-hidden flex flex-col bg-bg-dark/95 backdrop-blur-xl border border-white/10 shadow-2xl md:z-50 md:bottom-[7rem] md:right-6 md:w-[380px] md:h-[70vh] md:max-h-[600px] md:rounded-2xl max-md:top-0 max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:z-[70] max-md:rounded-none"
            style={{ maxWidth: '100vw', WebkitOverflowScrolling: 'touch' }}
          >
            {/* Header */}
            <div className="h-14 px-4 flex items-center justify-between bg-white/5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <div>
                  <p className="text-sm font-semibold text-text-primary leading-tight">
                    LMM Smart Assistant
                  </p>
                  <p className="text-xs text-text-secondary">
                    {language === "lg" ? "Ku mutimbagano" : "Online"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {language && (
                  <button
                    onClick={resetChat}
                    className="text-xs text-text-secondary hover:text-teal-primary transition-colors px-2 py-1 rounded border border-white/10 hover:border-teal-primary/30"
                    aria-label="Change language"
                  >
                    {language === "en" ? "🇬🇧 EN" : "🇺🇬 LG"}
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-text-secondary hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Language Selection or Chat */}
            {!language ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-teal-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-teal-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Choose your language
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Londa olulimi lw'oyagala
                  </p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-[240px]">
                  <button
                    onClick={() => selectLanguage("en")}
                    className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-teal-primary/10 hover:border-teal-primary/30 transition-all group"
                  >
                    <span className="text-2xl">🇬🇧</span>
                    <div className="text-left">
                      <p className="text-sm font-medium text-text-primary group-hover:text-teal-primary transition-colors">
                        English
                      </p>
                      <p className="text-xs text-text-secondary">
                        Continue in English
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => selectLanguage("lg")}
                    className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-teal-primary/10 hover:border-teal-primary/30 transition-all group"
                  >
                    <span className="text-2xl">🇺🇬</span>
                    <div className="text-left">
                      <p className="text-sm font-medium text-text-primary group-hover:text-teal-primary transition-colors">
                        Luganda
                      </p>
                      <p className="text-xs text-text-secondary">
                        Weyongere mu Luganda
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                    <ChatSuggestions onSelect={sendMessage} language={language} />
                  )}

                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="px-3 flex items-center gap-2 bg-white/5 border-t border-white/10 shrink-0 w-full min-w-0" style={{ minHeight: '3.5rem', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                    placeholder={
                      language === "lg"
                        ? "Buuza ku mpeereza zaffe..."
                        : "Ask about our services..."
                    }
                    className="flex-1 min-w-0 bg-transparent text-text-primary text-sm placeholder:text-text-secondary/50 outline-none"
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
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
