import { BotIcon, XIcon, SendIcon, Square } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useChatBot } from "../../../hooks";
import "highlight.js/styles/github-dark.css";

type Message = {
  id: string;
  type: "user" | "bot";
  text: string;
};

type ChatBoxProps = {
  toogleChatBox: () => void;
};

export default function ChatBox(props: ChatBoxProps) {
  const { toogleChatBox } = props;
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { generateResponse } = useChatBot();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    setIsLoading(true);

    const controller = new AbortController();
    setAbortController(controller);

    const newMessage: Message = { id: crypto.randomUUID(), type: "user", text: text.trim() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    const currentText = text;
    setText("");

    generateResponse(currentText)
      .then((response) => {
        if (controller.signal.aborted) {
          return;
        }

        const botResponse: Message = {
          id: response.responseId ?? crypto.randomUUID(),
          type: "bot",
          text: response.text ?? "",
        };
        setIsLoading(false);
        setMessages((prevMessages) => [...prevMessages, botResponse]);
        setAbortController(null);
      })
      .catch(() => {
        setIsLoading(false);
        setAbortController(null);
      });
  };

  const handleSuspend = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setIsLoading(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="z-50 flex flex-col fixed 
                 bottom-0 sm:bottom-24 right-0 sm:right-4 md:right-8 
                 h-screen sm:h-[75vh] md:h-[70%] 
                 w-full sm:w-[90vw] md:w-[500px] lg:w-[550px]
                 max-w-full sm:max-w-[600px] bg-black sm:rounded-xl border-0 sm:border border-[#27272a] shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center py-3 px-3 sm:px-4 border-b border-[#27272a] bg-black/50 backdrop-blur-sm sm:rounded-t-xl">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="bg-white p-2 mr-2 sm:mr-3 rounded-full"
        >
          <BotIcon size={20} className="sm:w-6 sm:h-6 text-black" />
        </motion.div>
        <div className="flex-1">
          <p className="font-bold text-sm sm:text-base">AI Assistant</p>
          <p className="text-[10px] sm:text-xs text-gray-400">Built By Hainam.</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={toogleChatBox}
          className="cursor-pointer hover:bg-[#27272a] p-2 rounded-lg transition-colors duration-200"
        >
          <XIcon size={20} className="text-white" />
        </motion.div>
      </div>

      {/* Messages Area */}
      {messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex flex-col w-full items-center text-sm justify-center px-4 sm:px-6"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <BotIcon size={60} className="text-[#a9a9bd] mb-4" />
          </motion.div>
          <p className="text-[#a9a9bd] text-center text-xs sm:text-sm">
            Hi! I'm Nam's personal assistant. Ask me anything about his work,
            experience, skills, or projects, or choose from the suggested
            questions!
          </p>
        </motion.div>
      ) : (
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 text-sm font-light scrollbar-thin scrollbar-thumb-[#27272a] scrollbar-track-transparent">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 ${
                    message.type === "user"
                      ? "bg-[#fafafa] text-black rounded-br-sm"
                      : "bg-[#191920] text-[#f6f7ff] rounded-bl-sm"
                  }`}
                >
                  {message.type === "bot" ? (
                    <div className="prose prose-invert prose-sm max-w-none
                                 prose-p:my-1 prose-p:leading-relaxed
                                 prose-pre:bg-[#0d1117] prose-pre:p-3 prose-pre:rounded-lg
                                 prose-code:text-[#79c0ff] prose-code:bg-[#0d1117] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                 prose-headings:text-white prose-headings:font-semibold
                                 prose-strong:text-white prose-strong:font-semibold
                                 prose-ul:my-1 prose-ol:my-1
                                 prose-li:my-0.5
                                 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap text-xs sm:text-sm">{message.text}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-[#191920] text-[#f6f7ff] rounded-bl-sm">
                <div className="flex space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-white/60 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-white/60 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-white/60 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-2 sm:p-3 border-t border-[#27272a] bg-black/50 backdrop-blur-sm sm:rounded-b-xl">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full py-3 px-4 pr-12 sm:pr-14 text-xs sm:text-sm bg-[#191920] rounded-full border border-[#27272a] 
                       focus:border-[#3f3f46] focus:outline-none transition-colors duration-200
                       text-white placeholder-gray-500"
            placeholder="Ask me anything..."
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            disabled={!text.trim() && !isLoading}
            whileHover={{ scale: text.trim() || isLoading ? 1.1 : 1 }}
            whileTap={{ scale: text.trim() || isLoading ? 0.9 : 1 }}
            className={`absolute right-1 top-1 p-2 rounded-full transition-all duration-200
                       ${text.trim() || isLoading 
                         ? "bg-white text-black hover:bg-gray-200 cursor-pointer" 
                         : "bg-[#27272a] text-gray-500 cursor-not-allowed"
                       }`}
          >
            {!isLoading ? (
              <SendIcon size={18} className="sm:w-5 sm:h-5" />
            ) : (
              <Square size={18} onClick={handleSuspend} className="sm:w-5 sm:h-5" />
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
