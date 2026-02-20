const suggestions = [
  "What services do you offer?",
  "How much does a malaria test cost?",
  "I have a headache and fever",
  "What are your operating hours?",
];

interface ChatSuggestionsProps {
  onSelect: (text: string) => void;
}

const ChatSuggestions = ({ onSelect }: ChatSuggestionsProps) => (
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

export default ChatSuggestions;
