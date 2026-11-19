import { MessageCircleQuestion, X } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = { onClick: () => void; open?: boolean; className?: string };

export default function FloatButton({ onClick, open = false, className = "" }: Props) {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? t("common.passport.chat.close") : t("common.passport.chat.open")}
      aria-expanded={open}
      className={`leather fixed bottom-[84px] right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-black/25 text-on-burgundy shadow-[0_12px_24px_-10px_rgb(var(--burgundy-deep)/0.8)] transition-transform duration-200 ease-out-expo hover:-translate-y-0.5 active:translate-y-px md:bottom-8 md:right-8 ${className}`}
    >
      <span className="absolute inset-1 rounded-full border border-gold/50" aria-hidden="true" />
      {open ? <X size={22} strokeWidth={1.5} /> : <MessageCircleQuestion size={24} strokeWidth={1.5} />}
    </button>
  );
}
