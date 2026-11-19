import { SendIcon, Square, XIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useChatBot } from "../../../hooks";
import { useTranslation } from "react-i18next";
import { Crest } from "../passport";
import "highlight.js/styles/github-dark.css";

type Message = {
  id: string;
  type: "user" | "bot";
  text: string;
};

/** Reveals streamed text a few characters per frame, so network chunks read as typing
    instead of landing in blocks. Catches up within ~25 frames however far behind it is. */
function useTypewriter(target: string, enabled: boolean) {
  const [shown, setShown] = useState(enabled ? 0 : target.length);
  useEffect(() => {
    if (!enabled) {
      setShown(target.length);
      return;
    }
    if (shown >= target.length) return;
    const id = requestAnimationFrame(() => {
      setShown((s) => Math.min(target.length, s + Math.max(2, Math.ceil((target.length - s) / 25))));
    });
    return () => cancelAnimationFrame(id);
  }, [target, shown, enabled]);
  return target.slice(0, shown);
}

function BotText({ text, onGrow }: { text: string; onGrow: () => void }) {
  const reduce = useReducedMotion();
  const shown = useTypewriter(text, !reduce);
  useEffect(() => {
    if (shown.length < text.length) onGrow();
  }, [shown, text.length, onGrow]);
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{ a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" /> }}
    >
      {shown}
    </ReactMarkdown>
  );
}

type ChatBoxProps = {
  toogleChatBox: () => void;
};

export default function ChatBox({ toogleChatBox }: ChatBoxProps) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { streamResponse } = useChatBot();
  const reduce = useReducedMotion();
  const { t } = useTranslation();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    const controller = new AbortController();
    setAbortController(controller);

    const userMessage: Message = { id: crypto.randomUUID(), type: "user", text: text.trim() };
    // The bot bubble exists from the start and fills in as chunks arrive.
    const botId = crypto.randomUUID();
    setMessages((prev) => [...prev, userMessage, { id: botId, type: "bot", text: "" }]);
    const currentText = text;
    setText("");

    const setBotText = (update: (prev: string) => string) =>
      setMessages((prev) => prev.map((m) => (m.id === botId ? { ...m, text: update(m.text) } : m)));

    let received = false;
    streamResponse(
      currentText,
      (piece) => {
        received = true;
        setBotText((prev) => prev + piece);
      },
      controller.signal
    )
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error("[chat]", err);
        const error = t("common.passport.chat.error");
        // Keep whatever already streamed; only replace an empty bubble with the error.
        setBotText((prev) => (prev ? `${prev}\n\n_${error}_` : error));
        received = true;
      })
      .finally(() => {
        // Stopped before anything arrived: drop the empty bubble.
        if (!received) setMessages((prev) => prev.filter((m) => m.id !== botId || m.text));
        setIsLoading(false);
        setAbortController(null);
        inputRef.current?.focus();
      });
  };

  const scrollToEnd = useCallback(() => messagesEndRef.current?.scrollIntoView({ behavior: "auto" }), []);

  const handleSuspend = () => {
    abortController?.abort();
  };

  useEffect(() => {
    // "auto" while streaming: a smooth scroll restarted on every chunk stutters.
    messagesEndRef.current?.scrollIntoView({ behavior: reduce || isLoading ? "auto" : "smooth" });
  }, [messages, isLoading, reduce]);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") toogleChatBox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toogleChatBox]);

  return (
    <motion.div
      role="dialog"
      aria-label={t("common.passport.chat.title")}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden border-rule/25 bg-raised shadow-[0_40px_80px_-30px_rgb(0_0_0/0.45)] sm:inset-auto sm:bottom-28 sm:right-6 sm:h-[min(640px,75vh)] sm:w-[440px] sm:rounded-[10px] sm:border md:right-8"
    >
      <div className="leather flex items-center gap-3 px-4 py-3 text-on-burgundy">
        <Crest className="h-9 w-9 shrink-0 text-gold" />
        <div className="flex-1">
          <p className="font-display text-lg font-bold leading-tight">{t("common.passport.chat.title")}</p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-on-burgundy/75">{t("common.passport.chat.by")}</p>
        </div>
        <button
          type="button"
          onClick={toogleChatBox}
          aria-label={t("common.passport.chat.close")}
          className="flex h-11 w-11 items-center justify-center rounded-[4px] text-on-burgundy/90 transition-colors hover:bg-black/15"
        >
          <XIcon size={20} strokeWidth={1.5} />
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <Crest className="mb-5 h-16 w-16 text-burgundy/40 dark:text-gold/50" />
          <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-soft">
            {t("common.passport.chat.empty")}
          </p>
        </div>
      ) : (
        <div className="flex-1 space-y-3 overflow-y-auto overflow-x-hidden p-4 text-[0.9375rem]" aria-live="polite" aria-busy={isLoading}>
          <AnimatePresence initial={false}>
            {messages.filter((m) => m.text).map((message) => (
              <motion.div
                key={message.id}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-[8px] px-4 py-2.5 ${
                    message.type === "user"
                      ? "rounded-br-[2px] bg-burgundy text-on-burgundy"
                      : "rounded-bl-[2px] border border-rule/20 bg-paper text-ink"
                  }`}
                >
                  {message.type === "bot" ? (
                    <div className="prose prose-sm min-w-0 max-w-none text-ink [overflow-wrap:anywhere] prose-pre:overflow-x-auto prose-pre:[overflow-wrap:normal] dark:prose-invert prose-headings:font-display prose-headings:text-ink prose-p:my-1 prose-p:leading-relaxed prose-a:text-stamp-navy prose-strong:text-ink prose-code:rounded prose-code:px-1 prose-pre:rounded-[6px] prose-pre:bg-[#0d1117] prose-ol:my-1 prose-ul:my-1 prose-li:my-0.5">
                      <BotText text={message.text} onGrow={scrollToEnd} />
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap [overflow-wrap:anywhere]">{message.text}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing dots only until the first chunk lands. */}
          {isLoading && !messages[messages.length - 1]?.text && (
            <div className="flex justify-start" aria-label={t("common.passport.chat.typing")}>
              <div className="flex gap-1.5 rounded-[8px] rounded-bl-[2px] border border-rule/20 bg-paper px-4 py-3.5">
                {[0, 0.15, 0.3].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-soft"
                    style={{ animationDelay: `${d}s` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      <form onSubmit={handleSend} className="border-t border-rule/20 bg-raised p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="relative">
          <label htmlFor="chat-input" className="sr-only">
            {t("common.passport.chat.label")}
          </label>
          <input
            id="chat-input"
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("common.passport.chat.placeholder")}
            // Never disabled: disabling drops focus. handleSend ignores Enter while a reply streams,
            // so the next question can be typed meanwhile.
            className="doc-input !rounded-full !py-3 !pl-5 !pr-14 !text-[0.9375rem]"
          />
          {isLoading ? (
            <button
              type="button"
              onClick={handleSuspend}
              aria-label={t("common.passport.chat.stop")}
              className="absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-burgundy text-on-burgundy"
            >
              <Square size={15} fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!text.trim()}
              aria-label={t("common.passport.chat.send")}
              className="absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-burgundy text-on-burgundy transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <SendIcon size={16} strokeWidth={1.75} />
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
}
