import { BotIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-black p-3 rounded-full cursor-pointer dark:bg-white"
    >
      <BotIcon size={30} className="text-white dark:text-black" />
    </motion.button>
  );
}
