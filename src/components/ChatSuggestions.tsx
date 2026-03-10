const suggestionsEn = [
  "What services do you offer?",
  "What are your operating hours?",
  "How do I get to the clinic?",
  "How do I book a visit?",
];

const suggestionsLg = [
  "Mpeereza ki ze mulina?",
  "Muggula essaawa mmeka?",
  "Ntuuka ntya ku ddwaliro?",
  "Mbookingi ntya okujja?",
];

interface ChatSuggestionsProps {
  onSelect: (text: string) => void;
  language?: "en" | "lg";
}

const ChatSuggestions = ({ onSelect, language = "en" }: ChatSuggestionsProps) => {
  const suggestions = language === "lg" ? suggestionsLg : suggestionsEn;

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {suggestions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-text-secondary hover:bg-teal-primary/10 hover:border-teal-primary/30 hover:text-teal-primary cursor-pointer transition-all"
        >
          {q}
        </button>
      ))}
    </div>
  );
};

export default ChatSuggestions;
