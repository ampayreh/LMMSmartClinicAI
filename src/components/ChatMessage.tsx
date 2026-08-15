import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  if (role === "user") {
    return (
      <div className="ml-auto max-w-[80%] bg-teal-primary text-bg-dark px-4 py-2.5 rounded-2xl rounded-br-md text-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="mr-auto max-w-[85%] bg-white/5 text-text-primary px-4 py-2.5 rounded-2xl rounded-bl-md text-sm leading-relaxed">
      <ReactMarkdown
        components={{
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
          li: ({ children }) => <li className="mb-0.5">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ChatMessage;
