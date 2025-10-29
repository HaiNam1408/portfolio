import { BotIcon, XIcon, SendIcon, Square } from "lucide-react";
import { useEffect, useState } from "react";
import { useChatBot } from "../../../hooks";

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
  const { generateResponse } = useChatBot();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if(!text || isLoading) return;
    setIsLoading(true);
    if (!text) return;
    
    const controller = new AbortController();
    setAbortController(controller);
    
    const newMessage: Message = { id: crypto.randomUUID(), type: "user", text };
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

  useEffect(() => {
  const chatBox = document.querySelector("#chat-box");
  if (chatBox) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}, [messages]);

  return (
    <div className="z-10 flex flex-col fixed bottom-24 right-8 h-[70%] w-[500px] bg-black rounded-xl border border-[#27272a]">
      <div className="flex items-center py-3 px-4 border-b border-[#27272a]">
        <div className="bg-black p-2 mr-2 rounded-full dark:bg-white">
          <BotIcon
            size={24}
            className="text-white dark:text-black animate-[wave_3s_infinite]"
          />
        </div>
        <div className="flex-1">
          <p className="font-bold">AI Assistant</p>
          <p className="text-[12px] text-gray-400">Built By Hainam.</p>
        </div>
        <div onClick={toogleChatBox} className="cursor-pointer hover:bg-[#27272a] p-2 rounded transition-all duration-100">
          <XIcon size={20} className="text-black dark:text-white" />
        </div>
      </div>
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col w-full items-center text-sm justify-center px-6">
          <BotIcon size={46} className="text-[#a9a9bd] mb-6" />
          <p className="text-[#a9a9bd] text-center">
            Hi! I'm Nam's personal assistant. Ask me anything about his work,
            experience, skills, or projects, or choose from the suggested
            questions!
          </p>
        </div>
      ) : (
        <div id="chat-box" className="flex-1 overflow-y-auto p-4 space-y-3 text-sm font-light">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-b-xl px-4 py-2 ${
                  message.type === "user"
                    ? "bg-[#fafafa] text-black rounded-tl-xl"
                    : "bg-[#191920] text-[#f6f7ff] rounded-tr-xl"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-b-xl px-4 py-2 bg-[#191920] text-[#f6f7ff] rounded-tr-xl">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            </div>
          )}
        </div>
      )}
      <form onSubmit={(e) => handleSend(e)} className="p-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          className="w-full p-4 text-sm bg-black rounded-full border border-[#27272a]"
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className={` ${
            text || isLoading ? "" : "opacity-50"
          } absolute right-4 bottom-5 bg-black p-2 mr-2 rounded-full dark:bg-white cursor-pointer`}
        >
          {!isLoading ? <SendIcon
            size={20}
            onClick={(e) => handleSend(e)}
            className="text-white dark:text-black"
          /> : <Square size={20} onClick={handleSuspend} className="text-white dark:text-black" />}
        </button>
      </form>
    </div>
  );
}
