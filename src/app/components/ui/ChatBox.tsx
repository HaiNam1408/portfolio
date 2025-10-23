import { BotIcon, XIcon, SendIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useChatBot } from "../../../hooks";

type Message = {
  id: string;
  type: "user" | "bot";
  text: string;
};

export default function ChatBox() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { generateResponse } = useChatBot();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    const newMessage: Message = { id: crypto.randomUUID(), type: "user", text };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setText("");
    generateResponse(text).then((response) => {
      console.log(response);
      const botResponse: Message = {
        id: response.responseId ?? crypto.randomUUID(),
        type: "bot",
        text: response.text ?? "",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    });
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
        <div className="">
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
        </div>
      )}
      <form onSubmit={(e) => handleSend(e)} className="p-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 text-sm bg-black rounded-full border border-[#27272a]"
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className={` ${
            text ? "" : "opacity-50"
          } absolute right-4 bottom-5 bg-black p-2 mr-2 rounded-full dark:bg-white cursor-pointer`}
        >
          <SendIcon
            size={20}
            onClick={(e) => handleSend(e)}
            className="text-white dark:text-black"
          />
        </button>
      </form>
    </div>
  );
}
