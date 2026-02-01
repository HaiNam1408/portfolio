import { BotIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatButton({ onClick, className = "" }: { onClick: () => void; className?: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      className={`z-50 fixed bottom-20 md:bottom-8 right-8 bg-black p-3 rounded-full cursor-pointer dark:bg-white ${className}`}
    >
      <BotIcon size={30} className="text-white dark:text-black" />
    </motion.button>
  );
}
